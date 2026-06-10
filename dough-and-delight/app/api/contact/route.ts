import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      name,
      email,
      phone,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {

      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Database Connection
    const dbPath = path.join(process.cwd(), "database.sqlite");

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create Table
    await db.exec(`
      CREATE TABLE IF NOT EXISTS contact (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        phone TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert Data
    await db.run(
      `
      INSERT INTO contact
      (name, email, phone, message)
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        email,
        phone,
        message,
      ]
    );
 
    // Close DB
    await db.close();

    const canSendEmail =
      Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);
    let emailErrorMessage = "";

    if (canSendEmail) {
      try {
        const transporter =
          nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

        await transporter.verify();
        console.log("SMTP Server Connected");

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New Contact Form Submission",
          html: `
            <div style="font-family:sans-serif;">
              <h2>New Contact Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
          `,
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject:
            "Thank You For Contacting Dough & Delight",
          html: `
            <div style="font-family:sans-serif;">
              <h2>Hello ${name},</h2>
              <p>Thank you for contacting Dough & Delight 🍰</p>
              <p>We received your message successfully.</p>
              <p>Our team will contact you soon.</p>
              <br />
              <p><strong>Your Message:</strong></p>
              <p>${message}</p>
              <br />
              <p>Regards,<br />Dough & Delight Team</p>
            </div>
          `,
        });
      } catch (emailError: any) {
        emailErrorMessage =
          emailError?.message ||
          "Email sending failed.";
        console.error(
          "Contact API email failure:",
          emailError
        );
      }
    } else {
      console.warn(
        "Contact API: EMAIL_USER or EMAIL_PASS not configured. Skipping email send."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message Sent Successfully",
      emailSent: canSendEmail && !emailErrorMessage,
      emailError: emailErrorMessage,
    });

  } catch (error: any) {

    console.error(
      "FULL CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}