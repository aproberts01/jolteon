import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") || "https://example.com";

  let browser;

  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    await page.goto(url, { waitUntil: "networkidle2" });

    const containerSelector = "#list-selector";

    await page.waitForSelector(containerSelector);

    // Inject watermark inside the container
    await page.evaluate((selector) => {
      const container = document.querySelector(selector);
      if (container) {
        const watermark = document.createElement("div");
        watermark.textContent = "© list generated by Jolty.io";
        watermark.style.position = "absolute";
        watermark.style.bottom = "10px";
        watermark.style.right = "10px";
        watermark.style.fontSize = "14px";
        watermark.style.opacity = "0.5";
        watermark.style.color = "white";
        watermark.style.background = "rgba(0, 0, 0, 0.5)";
        watermark.style.padding = "4px 8px";
        watermark.style.pointerEvents = "none";
        watermark.style.zIndex = "9999";
        (container as HTMLElement).style.position = "relative"; // Ensure container is positioning context
        container.appendChild(watermark);
      }
    }, containerSelector);

  // Get bounding box of the element
  const element = await page.$(containerSelector);
  if (!element) {
    console.error("Element not found!");
    await browser.close();
    return NextResponse.json(
      { error: "Failed to capture screenshot: element not found" },
      { status: 500 }
    );
  }

  const box = await element.boundingBox();

    if (!box) {
      console.error("Bounding box is null!");
      await browser.close();
      return NextResponse.json(
        { error: "Failed to capture screenshot: bounding box is null" },
        { status: 500 }
      );
    }

    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    await browser.close();

    return new NextResponse(screenshotBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    if (browser) await browser.close();
    console.error("Puppeteer error:", error);
    return NextResponse.json(
      { error: "Failed to capture screenshot" },
      { status: 500 }
    );
  }
}
