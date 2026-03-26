import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), "database.sqlite");

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    const data = await db.all("SELECT * FROM menu ORDER BY id DESC");

    await db.close();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}