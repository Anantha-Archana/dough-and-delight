import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });

    await db.run(
      `UPDATE menu 
       SET itemName=?, category=?, description=?, image=?, price=? 
       WHERE id=?`,
      [
        body.itemName,
        body.category,
        body.description,
        body.image,
        JSON.stringify(body.price),
        body.id,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}