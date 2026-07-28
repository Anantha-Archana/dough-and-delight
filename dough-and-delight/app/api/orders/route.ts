import { NextResponse } from "next/server";
import { openDB } from "@/lib/db";

async function ensureTableColumns(
  db: any,
  tableName: string,
  columns: Array<{ name: string; definition: string }>
) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columns.map((column) => `${column.name} ${column.definition}`).join(", ")}
    )
  `);

  const tableInfo = await db.all(`PRAGMA table_info(${tableName})`);
  const existingColumns = new Set(tableInfo.map((column: any) => column.name));

  for (const column of columns) {
    if (!existingColumns.has(column.name)) {
      await db.exec(
        `ALTER TABLE ${tableName} ADD COLUMN ${column.name} ${column.definition}`
      );
    }
  }
}

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
    const cleanName = typeof customerName === "string" ? customerName.trim() : "";
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanAddress = typeof address === "string" ? address.trim() : "";

    if (!cleanName || !cleanPhone || !cleanAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Cart is empty",
        },
        { status: 400 }
      );
    }

    const db = await openDB();

    try {
      await ensureTableColumns(db, "orders", [
        { name: "id", definition: "INTEGER PRIMARY KEY AUTOINCREMENT" },
        { name: "customerName", definition: "TEXT" },
        { name: "phone", definition: "TEXT" },
        { name: "address", definition: "TEXT" },
        { name: "total", definition: "INTEGER" },
        { name: "createdAt", definition: "TEXT" },
      ]);

      await ensureTableColumns(db, "order_items", [
        { name: "id", definition: "INTEGER PRIMARY KEY AUTOINCREMENT" },
        { name: "orderId", definition: "INTEGER" },
        { name: "itemName", definition: "TEXT" },
        { name: "price", definition: "INTEGER" },
        { name: "quantity", definition: "INTEGER" },
        { name: "size", definition: "TEXT" },
      ]);

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
        [cleanName, cleanPhone, cleanAddress, total, new Date().toISOString()]
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
          [orderId, item.itemName, item.price, item.quantity, item.size || ""]
        );
      }

      return NextResponse.json({
        success: true,
        message: "Order placed successfully",
        orderId,
      });
    } finally {
      await db.close();
    }
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