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

    const element = await page.waitForSelector("#list-selector", {
      visible: true,
    });

    if (!element) {
      console.error("Element with id #list-selector not found");
      await browser.close();
      return;
    }

    // Get bounding box of the element
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
