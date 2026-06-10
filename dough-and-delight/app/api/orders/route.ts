import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Orders API working",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customerName, phone, address, cart, total } = body;

    if (!customerName || !phone || !address) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart is empty",
        },
        { status: 400 }
      );
    }

    const db = await openDB();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT,
        phone TEXT,
        address TEXT,
        total INTEGER,
        createdAt TEXT
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderId INTEGER,
        itemName TEXT,
        price INTEGER,
        quantity INTEGER,
        size TEXT
      )
    `);

    const result = await db.run(
      `
      INSERT INTO orders (
        customerName,
        phone,
        address,
        total,
        createdAt
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        customerName,
        phone,
        address,
        total,
        new Date().toISOString(),
      ]
    );

    const orderId = result.lastID;

    for (const item of cart) {
      await db.run(
        `
        INSERT INTO order_items (
          orderId,
          itemName,
          price,
          quantity,
          size
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.itemName,
          item.price,
          item.quantity,
          item.size || "",
        ]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId,
    });
  } catch (error: any) {
    console.log("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}