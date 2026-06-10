import sqlite3 from "sqlite3";
import { open } from "sqlite";

const run = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  try {
    // Adds the missing 'total' column to the orders table
    await db.run(`ALTER TABLE orders ADD COLUMN total INTEGER`);
    console.log("Successfully added 'total' column to 'orders' table.");
  } catch (error: any) {
    console.error("Error altering table:", error.message);
  }

  await db.close();
};

run();