import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const db = await open({
      filename: "./database.sqlite",
      driver: sqlite3.Database,
    });

    const user = await db.get(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}