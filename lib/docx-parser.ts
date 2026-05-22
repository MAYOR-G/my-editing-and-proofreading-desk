import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import { WorkExamplePage, WorkExampleBlock, WorkExampleComment } from './work-example-data';

export type ParsedDocxResult = {
  pages: WorkExamplePage[];
  blockCount: number;
  hasTrackedChanges: boolean;
  warning?: string;
};

export async function parseDocx(buffer: Buffer | ArrayBuffer): Promise<WorkExamplePage[]> {
  const result = await parseDocxDocument(buffer);
  return result.pages;
}

export async function parseDocxDocument(buffer: Buffer | ArrayBuffer): Promise<ParsedDocxResult> {
  const zip = new JSZip();
  await zip.loadAsync(buffer);

  const documentXmlContent = await zip.file('word/document.xml')?.async('text');
  const commentsXmlContent = await zip.file('word/comments.xml')?.async('text');

  if (!documentXmlContent) {
    throw new Error("Invalid DOCX: missing word/document.xml");
  }

  const hasTrackedChanges = /<w:(ins|del)\b/.test(documentXmlContent);

  const parser = new XMLParser({
    ignoreAttributes: false,
    preserveOrder: true,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
    trimValues: false,
    parseTagValue: false
  });

  const parsedDoc = parser.parse(documentXmlContent);
  let parsedComments = [];
  if (commentsXmlContent) {
    parsedComments = parser.parse(commentsXmlContent);
  }

  // Extract Comments Map
  const commentsMap = new Map<string, WorkExampleComment>();
  
  if (parsedComments.length > 0) {
    // Traverse the parsed comments to build the map
    const findComments = (nodes: any[]) => {
      for (const node of nodes) {
        if (node['w:comment']) {
          const commentAttrs = node[':@'];
          const id = commentAttrs?.['@_w:id'];
          const author = commentAttrs?.['@_w:author'];
          const date = commentAttrs?.['@_w:date'];
          
          let text = '';
          const extractText = (cNodes: any[]) => {
            for (const cNode of cNodes) {
              if (cNode['w:t']) {
                const tNode = cNode['w:t'][0];
                if (tNode && tNode['#text'] !== undefined) {
                  text += String(tNode['#text']);
                }
              } else if (typeof cNode === 'object') {
                const keys = Object.keys(cNode).filter(k => k !== ':@');
                for (const k of keys) {
                  if (Array.isArray(cNode[k])) extractText(cNode[k]);
                }
              }
            }
          };
          extractText(node['w:comment']);
          
          if (id) {
            commentsMap.set(id, { label: id, note: text });
          }
        } else if (typeof node === 'object') {
           const keys = Object.keys(node).filter(k => k !== ':@');
           for (const k of keys) {
             if (Array.isArray(node[k])) findComments(node[k]);
           }
        }
      }
    };
    findComments(parsedComments);
  }

  // Process Document XML
  const blocks: WorkExampleBlock[] = [];
  
  const processParagraph = (pNodes: any[]): string => {
    let html = '';
    
    const traverse = (nodes: any[], insideIns = false, insideDel = false) => {
      for (const node of nodes) {
        if (node['w:ins']) {
          html += '<ins>';
          traverse(node['w:ins'], true, false);
          html += '</ins>';
        } else if (node['w:del']) {
          html += '<del>';
          traverse(node['w:del'], false, true);
          html += '</del>';
        } else if (node['w:r']) {
          traverse(node['w:r'], insideIns, insideDel);
        } else if (node['w:t']) {
          const tNode = node['w:t'][0];
          let text = tNode && tNode['#text'] !== undefined ? String(tNode['#text']) : '';
          
          // Escape HTML safely
          text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          html += text;
        } else if (node['w:delText']) {
          const tNode = node['w:delText'][0];
          let text = tNode && tNode['#text'] !== undefined ? String(tNode['#text']) : '';
          text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          html += text;
        } else if (node['w:commentReference']) {
          const id = node[':@']?.['@_w:id'];
          if (id) {
             html += `<span class="comment-marker" data-comment-id="${id}"></span>`;
          }
        } else if (typeof node === 'object') {
          const keys = Object.keys(node).filter(k => k !== ':@');
          for (const k of keys) {
            if (Array.isArray(node[k])) traverse(node[k], insideIns, insideDel);
          }
        }
      }
    };
    
    traverse(pNodes);
    return html;
  };

  const textFromNodes = (nodes: any[]): string => {
    let text = '';

    const walk = (childNodes: any[]) => {
      for (const node of childNodes) {
        if (node['w:t'] || node['w:delText']) {
          const textNode = (node['w:t'] || node['w:delText'])[0];
          if (textNode && textNode['#text'] !== undefined) text += String(textNode['#text']);
        } else if (typeof node === 'object') {
          const keys = Object.keys(node).filter(k => k !== ':@');
          for (const k of keys) {
            if (Array.isArray(node[k])) walk(node[k]);
          }
        }
      }
    };

    walk(nodes);
    return text;
  };

  const processTable = (tblNodes: any[]): WorkExampleBlock | null => {
    const rows: string[][] = [];

    const extractRows = (nodes: any[]) => {
      for (const node of nodes) {
        if (node['w:tr']) {
          const cells: string[] = [];
          const extractCells = (rowNodes: any[]) => {
            for (const rowNode of rowNodes) {
              if (rowNode['w:tc']) {
                cells.push(textFromNodes(rowNode['w:tc']).trim());
              } else if (typeof rowNode === 'object') {
                const keys = Object.keys(rowNode).filter(k => k !== ':@');
                for (const k of keys) {
                  if (Array.isArray(rowNode[k])) extractCells(rowNode[k]);
                }
              }
            }
          };
          extractCells(node['w:tr']);
          if (cells.some(Boolean)) rows.push(cells);
        } else if (typeof node === 'object') {
          const keys = Object.keys(node).filter(k => k !== ':@');
          for (const k of keys) {
            if (Array.isArray(node[k])) extractRows(node[k]);
          }
        }
      }
    };

    extractRows(tblNodes);
    if (rows.length === 0) return null;

    const headers = rows[0].map((cell, index) => cell || `Column ${index + 1}`);
    return {
      type: 'table',
      headers,
      rows: rows.slice(1)
    };
  };

  const traverseBody = (nodes: any[]) => {
    for (const node of nodes) {
      if (node['w:p']) {
        const text = processParagraph(node['w:p']);
        if (text.trim() || text.includes('comment-marker')) {
          blocks.push({ type: 'paragraph', text, role: 'body' });
        }
      } else if (node['w:tbl']) {
        const table = processTable(node['w:tbl']);
        if (table) blocks.push(table);
      } else if (typeof node === 'object') {
        const keys = Object.keys(node).filter(k => k !== ':@');
        for (const k of keys) {
          if (Array.isArray(node[k])) traverseBody(node[k]);
        }
      }
    }
  };

  traverseBody(parsedDoc);

  // Filter out any empty blocks that don't have comments
  const validBlocks = blocks.filter(b => b.type === 'table' || ((b as any).text || '').trim().length > 0);

  // Convert map to array
  const commentsArray = Array.from(commentsMap.values());

  const page: WorkExamplePage = {
    eyebrow: "Document Overview",
    heading: "Parsed Document Content",
    body: [], // Legacy field
    blocks: validBlocks,
    comments: commentsArray
  };

  return {
    pages: [page],
    blockCount: validBlocks.length,
    hasTrackedChanges,
    warning: hasTrackedChanges
      ? undefined
      : "This document does not appear to contain real tracked-change data. Preview accuracy may be limited.",
  };
}
