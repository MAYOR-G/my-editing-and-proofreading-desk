import http from "node:http";
import fs from "node:fs";

const PORT = 3000;
const BASE_HOST = `http://localhost:${PORT}`;
const CANONICAL_ORIGIN = "https://www.editandproofread.com";

async function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(BASE_HOST + path, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, html: data }));
    }).on("error", reject);
  });
}

const BANNED_STRINGS = [
  "Edit and Proofread",
  "Edit & Proofread",
  "Flawless",
  "Absolute confidence",
  "&amp;amp;",
];

const BANNED_SCHEMA_STATS = ["30,000", "110+", "15+"];

const ZERO_16 = [
  "/services",
  "/pricing",
  "/proofreading-services",
  "/academic-proofreading",
  "/manuscript-editing",
  "/business-proofreading",
  "/blog/what-thesis-editing-service-includes",
  "/blog/how-to-choose-a-thesis-editor",
  "/blog/document-formatting-services-what-to-prepare",
  "/blog/regulatory-document-formatting-checklist",
  "/blog/edit-my-paper-online-guide",
  "/blog/canadian-academic-proofreading-and-thesis-guide",
  "/blog/dubai-uae-business-report-and-proposal-editing-guide",
  "/blog/uk-dissertation-and-phd-thesis-proofreading-guide",
  "/blog/sci-journal-manuscript-editing-guide-esl-researchers",
  "/blog/editing-and-proofreading-before-manuscript-submission",
];

const SERVICE_PAGES = [
  "/services",
  "/proofreading-services",
  "/editing-services",
  "/academic-proofreading",
  "/dissertation-proofreading",
  "/thesis-editing",
  "/manuscript-editing",
  "/business-proofreading",
  "/cv-resume-editing",
  "/document-formatting",
  "/translation-review",
];

async function run() {
  console.log("=== PHASE 2 CRAWLER VERIFICATION ===\n");
  let totalErrors = 0;

  // 1. Fetch Sitemap
  console.log("1. Fetching /sitemap.xml...");
  const sitemapRes = await fetchUrl("/sitemap.xml");
  if (sitemapRes.status !== 200) {
    console.error("FAIL: /sitemap.xml returned status", sitemapRes.status);
    process.exit(1);
  }

  const sitemapUrls = [
    ...sitemapRes.html.matchAll(/<loc>https:\/\/(?:www\.)?editandproofread\.com([^<]*)<\/loc>/g),
  ].map((m) => m[1] || "/");

  console.log(`PASS: /sitemap.xml found ${sitemapUrls.length} indexable URLs.\n`);

  // Link graph tracking
  const linkGraph = {};
  sitemapUrls.forEach((u) => (linkGraph[u] = new Set()));

  // 2. Crawl every URL in sitemap
  console.log("2. Auditing every indexable page...");
  const pageAudits = [];

  for (const urlPath of sitemapUrls) {
    const res = await fetchUrl(urlPath);
    const html = res.html;
    const errors = [];

    // Check status
    if (res.status !== 200) {
      errors.push(`HTTP status ${res.status} (expected 200)`);
    }

    // Check hreflang
    if (html.includes("hreflang")) {
      errors.push("Contains forbidden hreflang tag");
    }

    // Check banned strings in visible content
    // Note: brand name "My Editing and Proofreading Desk" is allowed, but variants are banned
    for (const banned of BANNED_STRINGS) {
      if (html.includes(banned)) {
        errors.push(`Contains banned string "${banned}"`);
      }
    }

    // Canonical check
    const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ||
                           html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
    const expectedCanonical = `${CANONICAL_ORIGIN}${urlPath === "/" ? "" : urlPath}`;
    if (!canonicalMatch) {
      errors.push("Missing canonical link tag");
    } else if (canonicalMatch[1] !== expectedCanonical) {
      errors.push(`Canonical mismatch: got "${canonicalMatch[1]}", expected "${expectedCanonical}"`);
    }

    // Title check (30-60 chars)
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch) {
      errors.push("Missing <title> tag");
    } else {
      const decodedTitle = titleMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"');
      const titleLen = decodedTitle.length;
      if (titleLen < 30 || titleLen > 60) {
        errors.push(`Title length ${titleLen} out of 30-60 bounds ("${decodedTitle}")`);
      }
    }

    // Meta description check (70-155 chars)
    const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) ||
                      html.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
    if (!descMatch) {
      errors.push("Missing <meta name=\"description\">");
    } else {
      const decodedDesc = descMatch[1]
        .replace(/&amp;/g, "&")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"');
      const descLen = decodedDesc.length;
      if (descLen < 70 || descLen > 155) {
        errors.push(`Description length ${descLen} out of 70-155 bounds ("${decodedDesc}")`);
      }
    }

    // Single H1 check
    const h1Matches = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gis)];
    if (h1Matches.length !== 1) {
      errors.push(`Expected exactly 1 <h1>, found ${h1Matches.length}`);
    }

    // Sequential headings check
    const headingTags = [...html.matchAll(/<(h[1-6])\b[^>]*>/gi)].map((m) => parseInt(m[1][1], 10));
    let lastLevel = 1;
    for (let i = 0; i < headingTags.length; i++) {
      const level = headingTags[i];
      if (i === 0 && level !== 1) {
        errors.push(`First heading is h${level}, expected h1`);
      }
      if (level > lastLevel + 1) {
        errors.push(`Heading level skipped: h${lastLevel} directly to h${level}`);
        break;
      }
      lastLevel = level;
    }

    // JSON-LD validation
    const jsonLdScripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis)];
    if (jsonLdScripts.length === 0) {
      errors.push("Missing JSON-LD structured data script");
    } else {
      for (const script of jsonLdScripts) {
        try {
          const parsed = JSON.parse(script[1]);
          const scriptText = script[1];
          for (const stat of BANNED_SCHEMA_STATS) {
            if (scriptText.includes(stat)) {
              errors.push(`JSON-LD contains banned claim "${stat}"`);
            }
          }
        } catch (e) {
          errors.push(`Invalid JSON-LD JSON: ${e.message}`);
        }
      }
    }

    // Image alt attributes check
    const imgTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
    for (const img of imgTags) {
      if (!img[1].includes("alt=")) {
        errors.push(`<img> missing alt attribute: ${img[0]}`);
      }
    }

    // Internal links collection for R35
    const hrefs = [...html.matchAll(/href="([^"#?]+)"/g)].map((m) => m[1]);
    for (let href of hrefs) {
      let clean = href.replace(/https:\/\/(?:www\.)?editandproofread\.com/, "");
      if (clean === "") clean = "/";
      if (linkGraph[clean]) {
        linkGraph[clean].add(urlPath);
      }
    }

    if (errors.length > 0) {
      console.log(`[FAIL] ${urlPath}:`);
      errors.forEach((e) => console.log(`   - ${e}`));
      totalErrors += errors.length;
    } else {
      // quiet pass
    }
  }

  console.log(`Finished auditing ${sitemapUrls.length} pages. Page errors: ${totalErrors}`);

  // 3. HTTP 404 & Noindex test
  console.log("\n3. Testing 404 handling on /nonexistent-test-page-404...");
  const res404 = await fetchUrl("/nonexistent-test-page-404");
  if (res404.status !== 404) {
    console.log(`[FAIL] 404 status is ${res404.status}`);
    totalErrors++;
  } else {
    console.log("[PASS] Status is 404.");
  }
  if (!res404.html.includes('content="noindex')) {
    console.log('[FAIL] 404 page does not contain noindex tag');
    totalErrors++;
  } else {
    console.log('[PASS] 404 page contains noindex tag.');
  }

  // 4. Internal Link Structure (R35)
  console.log("\n4. Checking incoming internal link counts (R35)...");
  let lowLinkCount = 0;
  for (const [target, sources] of Object.entries(linkGraph)) {
    if (sources.size < 3) {
      console.log(`[FAIL] ${target} has only ${sources.size} incoming links (minimum 3 required)`);
      lowLinkCount++;
      totalErrors++;
    }
  }
  if (lowLinkCount === 0) {
    console.log(`[PASS] Every indexable page has >= 3 distinct incoming internal links.`);
  }

  console.log("\n5. Checking 16 zero-impression URLs linking (R35)...");
  let zero16Fail = 0;
  for (const target of ZERO_16) {
    const sources = Array.from(linkGraph[target] || []);
    const fromService = sources.some((s) => SERVICE_PAGES.includes(s));
    const fromBlog = sources.some((s) => s.startsWith("/blog/") && !s.includes("/page/"));
    const fromBlogIndex = sources.includes("/blog");

    if (!fromService || !fromBlog || !fromBlogIndex || sources.length < 3) {
      console.log(`[FAIL] ${target}: total=${sources.length}, fromService=${fromService}, fromBlog=${fromBlog}, fromBlogIndex=${fromBlogIndex}`);
      zero16Fail++;
      totalErrors++;
    } else {
      console.log(`[PASS] ${target}: total=${sources.length}, fromService=true, fromBlog=true, fromBlogIndex=true`);
    }
  }

  // 6. Home page guard check
  console.log("\n6. Checking Home Page Guard (R2-R5)...");
  const homeRes = await fetchUrl("/");
  const homeHtml = homeRes.html;

  const bannedHomeHeadings = [
    "Editing support for every serious draft.",
    "Editing and Proofreading Guides",
  ];
  let homeGuardFail = false;
  for (const h of bannedHomeHeadings) {
    if (homeHtml.includes(h)) {
      console.log(`[FAIL] Home page contains removed heading "${h}"`);
      homeGuardFail = true;
      totalErrors++;
    }
  }
  if (!homeGuardFail) {
    console.log("[PASS] Home page does not contain any removed sections or headings.");
  }

  // Extract home headings
  const homeHeadings = [...homeHtml.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gis)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  );
  console.log("\nCurrent Home Page Ordered Heading List:");
  homeHeadings.forEach((h, idx) => console.log(`  ${idx + 1}. ${h}`));

  console.log("\n=================================");
  if (totalErrors === 0) {
    console.log("ALL PHASE 2 CRAWLER VERIFICATION CHECKS PASSED WITH 0 ERRORS!");
  } else {
    console.log(`FAILED WITH ${totalErrors} TOTAL ERRORS.`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
