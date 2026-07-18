# SEO Content Overlap and Consolidation Decisions

Updated: 18 July 2026.

## Method and limitations

The review compared titles, descriptions, headings, visible body copy, internal links, sitemap membership, supplied Search Console figures, and diagnostic bag-of-words cosine similarity. Similarity is not SERP overlap. No reliable backlink database or live top-ten result overlap dataset was available, so redirects were not recommended from text similarity alone.

## Thesis and dissertation cluster

| Page | Owned intent | Overlap risk | Decision |
|---|---|---:|---|
| `/blog/dissertation-proofreading-checklist` | Exactly 15 final dissertation checks | Medium | Keep and protect. Supplied evidence: 188 impressions, 2 clicks, average position 18.3. Updated title to align with the 15-check structure. |
| `/blog/thesis-proofreading-checklist` | Thesis-specific final review after supervisor revisions | Medium | Keep. Removed incidental dissertation targeting, updated date after substantive changes, and linked to the specialist tables/references page. |
| `/blog/how-to-proofread-a-dissertation-before-submission` | Procedural workflow: scheduling, pass order, versions, tools, rest periods, final QC | High until rewritten | Retain because it has separate supplied impressions (53). Complete the workflow rewrite; otherwise consolidate to the main dissertation checklist with one permanent redirect. |
| `/blog/thesis-tables-figures-references-checklist` | Tables, figures, captions, cross-references, citations, reference-list matching, permissions, accessibility, generated lists, final PDF | Low if linked correctly | Publish as a narrow specialist spoke. Existing checklists should summarise these topics and link here. |

Diagnostic similarity before changes:

- Dissertation checklist ↔ how-to dissertation: 0.647
- Thesis checklist ↔ how-to dissertation: 0.705
- Dissertation checklist ↔ thesis checklist: 0.592

## Manuscript and research-paper cluster

| Page | Owned intent | Overlap risk | Decision |
|---|---|---:|---|
| `/blog/editing-and-proofreading-before-manuscript-submission` | Why and when editing and proofreading are separate pre-submission stages | High before narrowing | Keep as conceptual overview, link to the new practical checklist, and reduce detailed checklist duplication in a future editorial pass. |
| `/blog/research-paper-editing-checklist-before-submission` | Section-by-section research-paper audit: journal instructions, title, abstract, introduction, methods, results, discussion, declarations, files | Low after differentiation | Publish as the procedural owner. |
| `/manuscript-editing` | Commercial manuscript-editing service | Low | Keep commercial; link to both informational guides. |

## Editing, proofreading, and pricing

| Page | Owned intent | Decision |
|---|---|---|
| `/blog/editing-vs-proofreading` | Comparison and service selection | Keep as exclusive comparison owner. |
| `/editing-services` | Commercial editing service | Explain sentence-level vs structural work and boundaries; link to comparison. |
| `/proofreading-services` | Broad final-stage proofreading service | Explain final-stage scope and exclusions; link to comparison and cost. |
| `/blog/how-much-does-proofreading-cost` | Pricing factors and how the current calculator works | Keep; rewrite unsupported industry claims to actual product rules. |
| `/pricing` | Live quote/calculator | Remains the sole authoritative source for current rates and totals. |

## Service-page differentiation

The renderer remains shared, but six priority pages now have unique scope content and boundaries:

- Editing: sentence vs structural review; when proofreading is enough; no invented facts or sources.
- Proofreading: final-stage quality control; no major reorganisation or universal fact verification.
- Academic: broad papers/essays/research; distinct from thesis editing and dissertation proofreading.
- Thesis: abstract through conclusion, supervisor revisions, author-owned research decisions.
- Dissertation: whole-document final pass, front matter through appendices, long-document scheduling.
- Manuscript: book vs journal/research manuscripts; copy editing vs proofreading vs formatting.

## Redirect decisions

No blog article redirect was implemented. The evidence supports intent differentiation first. If the dissertation how-to cannot be transformed into a genuine workflow, redirect it permanently to `/blog/dissertation-proofreading-checklist`, update all internal links, and remove it from the sitemap in the same release.

Legacy service and legal redirects are enumerated in `SEO_AUDIT_EDIT_AND_PROOFREAD.md` and remain permanent.

