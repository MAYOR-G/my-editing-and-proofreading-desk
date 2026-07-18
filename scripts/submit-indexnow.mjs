const host = "www.editandproofread.com";
const siteOrigin = `https://${host}`;
const key = process.env.INDEXNOW_KEY?.trim();
const rawUrls = process.argv.slice(2);

if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) {
  console.error("Set a valid INDEXNOW_KEY before submitting URLs.");
  process.exit(1);
}

if (rawUrls.length === 0) {
  console.error("Pass one or more changed production URLs explicitly. This script does not submit the entire sitemap by default.");
  process.exit(1);
}

const urlList = [...new Set(rawUrls.map((value) => new URL(value, siteOrigin)).filter((url) => url.protocol === "https:" && url.hostname === host).map((url) => url.href))];
if (urlList.length !== rawUrls.length) {
  console.error(`Every URL must use the canonical origin ${siteOrigin}.`);
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${siteOrigin}/indexnow-key`,
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  console.error(`IndexNow submission failed with HTTP ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}

console.log(`IndexNow accepted ${urlList.length} explicit URL${urlList.length === 1 ? "" : "s"} with HTTP ${response.status}.`);
