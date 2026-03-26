import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";
import { sendOrderNotifications } from "@/lib/sms";

interface OrderRequest {
  item: {
    itemName: string;
  };
  customerName: string;
  phone: string;
  orderDate: string;
  address?: string;
  size?: string;
  flavour?: string;
  colour?: string;
  message?: string;
  instructions?: string;
}

export async function POST(req: Request) {
  try {
    const body: OrderRequest = await req.json();

    const db = await openDB();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        itemName TEXT,
        customerName TEXT,
        phone TEXT,
        orderDate TEXT,
        address TEXT,
        size TEXT,
        flavour TEXT,
        colour TEXT,
        message TEXT,
        instructions TEXT
      )
    `);

    const {
      item,
      customerName,
      phone,
      orderDate,
      address = "",
      size = "",
      flavour = "",
      colour = "",
      message = "",
      instructions = "",
    } = body;

    if (!item?.itemName) {
      return NextResponse.json({ error: "Item name required" }, { status: 400 });
    }

    if (!customerName?.trim()) {
      return NextResponse.json({ error: "Customer name required" }, { status: 400 });
    }

    if (!phone?.trim()) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    }

    if (!orderDate) {
      return NextResponse.json({ error: "Order date required" }, { status: 400 });
    }

    const result = await db.run(
      `INSERT INTO orders 
      (itemName, customerName, phone, orderDate, address, size, flavour, colour, message, instructions) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.itemName,
        customerName,
        phone,
        orderDate,
        address,
        size,
        flavour,
        colour,
        message,
        instructions,
      ]
    );

    console.log("Order saved. Sending SMS...");

    await sendOrderNotifications({
      customerName,
      phone,
      itemName: item.itemName,
      orderDate,
    });

    console.log("SMS sent successfully");

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        orderId: result.lastID,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("ORDER API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}