import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const dbPath = path.join(process.cwd(), "database.sqlite");

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        itemName TEXT,
        category TEXT,
        pricingType TEXT,
        price TEXT,
        description TEXT,
        bestSeller TEXT,
        image TEXT
      )
    `);

    let priceValue = "";
    if (body.pricingType === "single") {
      priceValue = body.price ? body.price.toString() : "";
    } else {
      priceValue = JSON.stringify(body.variants || []);
    }

    let imageName = "";
    if (body.image && Array.isArray(body.image) && body.image.length > 0) {
      imageName = body.image[0]?.name || "";
    }

    await db.run(
      `INSERT INTO menu 
      (itemName, category, pricingType, price, description, bestSeller, image)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        body.itemName || "",
        body.category || "",
        body.pricingType || "",
        priceValue,
        body.description || "",
        body.bestSeller || "no",
        imageName,
      ]
    );

    await db.close();

    return NextResponse.json({
      success: true,
      message: "Menu item added successfully",
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}