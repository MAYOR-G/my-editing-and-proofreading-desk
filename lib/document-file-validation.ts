type ValidationOptions = {
  maxEntries?: number;
  maxExpandedBytes?: number;
  maxCompressionRatio?: number;
};

function inspectZip(buffer: Buffer, options: ValidationOptions) {
  const maxEntries = options.maxEntries ?? 2_000;
  const maxExpandedBytes = options.maxExpandedBytes ?? 100 * 1024 * 1024;
  const maxCompressionRatio = options.maxCompressionRatio ?? 200;
  let eocdOffset = -1;
  const searchStart = Math.max(0, buffer.length - 0xffff - 22);

  for (let offset = buffer.length - 22; offset >= searchStart; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) {
      eocdOffset = offset;
      break;
    }
  }

  if (eocdOffset < 0) return { valid: false, reason: "The DOCX archive directory is missing." };
  const entries = buffer.readUInt16LE(eocdOffset + 10);
  let centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  if (entries <= 0 || entries > maxEntries) return { valid: false, reason: "The DOCX archive contains an unsafe number of entries." };

  let totalExpandedBytes = 0;
  let hasContentTypes = false;
  let hasDocumentXml = false;

  for (let index = 0; index < entries; index += 1) {
    if (centralOffset + 46 > buffer.length || buffer.readUInt32LE(centralOffset) !== 0x02014b50) {
      return { valid: false, reason: "The DOCX archive directory is invalid." };
    }

    const compressedSize = buffer.readUInt32LE(centralOffset + 20);
    const expandedSize = buffer.readUInt32LE(centralOffset + 24);
    const filenameLength = buffer.readUInt16LE(centralOffset + 28);
    const extraLength = buffer.readUInt16LE(centralOffset + 30);
    const commentLength = buffer.readUInt16LE(centralOffset + 32);
    const nextOffset = centralOffset + 46 + filenameLength + extraLength + commentLength;
    if (nextOffset > buffer.length) return { valid: false, reason: "The DOCX archive entry is truncated." };

    const filename = buffer.toString("utf8", centralOffset + 46, centralOffset + 46 + filenameLength);
    hasContentTypes ||= filename === "[Content_Types].xml";
    hasDocumentXml ||= filename === "word/document.xml";
    totalExpandedBytes += expandedSize;

    if (totalExpandedBytes > maxExpandedBytes || (compressedSize > 0 && expandedSize / compressedSize > maxCompressionRatio)) {
      return { valid: false, reason: "The DOCX expanded content exceeds the safe processing limit." };
    }

    centralOffset = nextOffset;
  }

  return hasContentTypes && hasDocumentXml
    ? { valid: true as const }
    : { valid: false as const, reason: "The archive is not a valid Word DOCX document." };
}

export function validateDocumentFile(extension: string, buffer: Buffer, options: ValidationOptions = {}) {
  if (extension === ".docx") {
    if (buffer.length < 4 || buffer.readUInt32LE(0) !== 0x04034b50) {
      return { valid: false as const, reason: "The file does not have a valid DOCX signature." };
    }
    return inspectZip(buffer, options);
  }

  if (extension === ".doc") {
    const ole = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    return buffer.length >= ole.length && buffer.subarray(0, ole.length).equals(ole)
      ? { valid: true as const }
      : { valid: false as const, reason: "The file does not have a valid legacy Word signature." };
  }

  if (extension === ".txt") {
    return buffer.includes(0)
      ? { valid: false as const, reason: "The file contains binary data and is not plain text." }
      : { valid: true as const };
  }

  return { valid: false as const, reason: "Unsupported document type." };
}
