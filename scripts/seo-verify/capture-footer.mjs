import { spawn } from "node:child_process";
import fs from "node:fs";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9222;

async function run() {
  const chromeProc = spawn(chromePath, [
    "--headless",
    `--remote-debugging-port=${port}`,
    "--user-data-dir=/tmp/chrome-test-footer",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1440,1080"
  ]);

  let versionData = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 300));
    try {
      const versionRes = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (versionRes.ok) {
        versionData = await versionRes.json();
        break;
      }
    } catch {}
  }

  if (!versionData) {
    chromeProc.kill();
    throw new Error("Failed to connect to Chrome remote debugging port.");
  }

  try {
    const wsUrl = versionData.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    await new Promise((r) => (ws.onopen = r));

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        callbacks.set(curId, resolve);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    // Create a new target/page
    const target = await send("Target.createTarget", { url: "http://localhost:3000/" });
    const targetWsRes = await fetch(`http://localhost:${port}/json`);
    const targetList = await targetWsRes.json();
    const pageTarget = targetList.find((t) => t.id === target.result.targetId);

    const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((r) => (pageWs.onopen = r));

    let pageId = 1;
    const pageCallbacks = new Map();
    pageWs.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pageCallbacks.has(msg.id)) {
        pageCallbacks.get(msg.id)(msg);
        pageCallbacks.delete(msg.id);
      }
    };

    function sendPage(method, params = {}) {
      return new Promise((resolve) => {
        const curId = pageId++;
        pageCallbacks.set(curId, resolve);
        pageWs.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await sendPage("Page.enable");
    await sendPage("DOM.enable");
    await sendPage("CSS.enable");

    // Wait 5s for Next.js dev server to compile and inject Tailwind stylesheets
    await new Promise((r) => setTimeout(r, 6000));

    // 1. Desktop Screenshot of Footer
    await sendPage("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    // Scroll to bottom
    await sendPage("Runtime.evaluate", {
      expression: `window.scrollTo(0, document.body.scrollHeight);`
    });

    await new Promise((r) => setTimeout(r, 1000));

    const screenshotDesktop = await sendPage("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    fs.writeFileSync(
      "/Users/mayorg/.gemini/antigravity-ide/brain/aac48ccf-14b7-4832-ace1-e178cc07aa3b/footer-desktop-view.png",
      Buffer.from(screenshotDesktop.result.data, "base64")
    );
    console.log("Saved footer-desktop-view.png");

    // 2. Mobile Screenshot of Footer (390px)
    await sendPage("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await sendPage("Runtime.evaluate", {
      expression: `window.scrollTo(0, document.body.scrollHeight);`
    });

    await new Promise((r) => setTimeout(r, 1000));



    const screenshotMobile = await sendPage("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });

    fs.writeFileSync(
      "/Users/mayorg/.gemini/antigravity-ide/brain/aac48ccf-14b7-4832-ace1-e178cc07aa3b/footer-mobile-view.png",
      Buffer.from(screenshotMobile.result.data, "base64")
    );
    console.log("Saved footer-mobile-view.png");

    pageWs.close();
    ws.close();
  } finally {
    chromeProc.kill();
  }
}

run().catch(console.error);
