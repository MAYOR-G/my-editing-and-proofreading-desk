const baseUrl = (process.env.SEO_TEST_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const productionOrigin = "https://www.editandproofread.com";
const requiredNewPaths = [
  "/blog/research-paper-editing-checklist-before-submission",
  "/blog/thesis-tables-figures-references-checklist",
];
const forbiddenSitemapPrefixes = ["/admin", "/api", "/auth", "/dashboard", "/login", "/signup", "/indexnow-key"];
const errors = [];

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function fetchText(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual", ...options });
  return { response, text: await response.text() };
}

const robots = await fetchText("/robots.txt");
if (robots.response.status !== 200) errors.push(`robots.txt returned ${robots.response.status}`);
if (!robots.text.includes(`${productionOrigin}/sitemap.xml`)) errors.push("robots.txt does not advertise the canonical sitemap URL");

const sitemap = await fetchText("/sitemap.xml");
if (sitemap.response.status !== 200) errors.push(`sitemap.xml returned ${sitemap.response.status}`);
const sitemapUrls = extractSitemapUrls(sitemap.text);
if (sitemapUrls.length === 0) errors.push("sitemap.xml contains no URLs");
if (sitemap.text.includes("<priority>") || sitemap.text.includes("<changefreq>")) errors.push("sitemap contains priority/changefreq values that should be omitted");

for (const path of requiredNewPaths) {
  if (!sitemapUrls.includes(`${productionOrigin}${path}`)) errors.push(`${path} is missing from sitemap.xml`);
}

for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl);
  if (url.origin !== productionOrigin) errors.push(`non-canonical sitemap origin: ${sitemapUrl}`);
  if (forbiddenSitemapPrefixes.some((prefix) => url.pathname.startsWith(prefix))) errors.push(`private route in sitemap: ${url.pathname}`);

  const page = await fetchText(`${url.pathname}${url.search}`);
  if (page.response.status !== 200) {
    errors.push(`${url.pathname} returned ${page.response.status} instead of 200`);
    continue;
  }

  const titleCount = countMatches(page.text, /<title(?:\s[^>]*)?>[\s\S]*?<\/title>/gi);
  const h1Count = countMatches(page.text, /<h1(?:\s[^>]*)?>/gi);
  const canonicalMatches = [...page.text.matchAll(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/gi)];
  const descriptionCount = countMatches(page.text, /<meta[^>]+name=["']description["'][^>]*>/gi);

  if (titleCount !== 1) errors.push(`${url.pathname} has ${titleCount} title elements`);
  if (h1Count !== 1) errors.push(`${url.pathname} has ${h1Count} H1 elements`);
  if (canonicalMatches.length !== 1) errors.push(`${url.pathname} has ${canonicalMatches.length} canonical links`);
  if (descriptionCount !== 1) errors.push(`${url.pathname} has ${descriptionCount} meta descriptions`);
  if (canonicalMatches[0]?.[1] !== sitemapUrl) errors.push(`${url.pathname} canonical ${canonicalMatches[0]?.[1] || "missing"} does not match sitemap URL ${sitemapUrl}`);

  for (const match of page.text.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1].replace(/&quot;/g, '"'));
    } catch {
      errors.push(`${url.pathname} contains invalid JSON-LD`);
    }
  }
}

const blog = await fetchText("/blog");
for (const path of requiredNewPaths) {
  if (!blog.text.includes(`href=\"${path}\"`)) errors.push(`blog index does not contain a crawlable link to ${path}`);
}

for (const [legacy, destination] of [
  ["/services/manuscript-formatting", "/manuscript-editing"],
  ["/privacy-policy", "/privacy"],
]) {
  const result = await fetchText(legacy);
  if (![301, 308].includes(result.response.status)) errors.push(`${legacy} returned ${result.response.status}, expected permanent redirect`);
  const location = result.response.headers.get("location");
  if (!location || !location.endsWith(destination)) errors.push(`${legacy} has missing or incorrect Location header: ${location}`);
}

if (errors.length > 0) {
  console.error(`SEO regression checks failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO regression checks passed for ${sitemapUrls.length} sitemap URLs, two new articles, robots.txt, JSON-LD, and permanent redirects.`);
