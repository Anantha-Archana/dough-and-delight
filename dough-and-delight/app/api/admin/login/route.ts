import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const ADMIN_EMAIL = "arun@doughdelight.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: true,
          user: { role: "admin", email },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}