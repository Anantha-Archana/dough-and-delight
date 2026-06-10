import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function resetSequence() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  try {
    //  Delete all orders
    await db.run("DELETE FROM orders");

    //  Reset auto increment
    await db.run("DELETE FROM sqlite_sequence WHERE name='orders'");

    console.log("Orders table reset successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await db.close();
  }
}

resetSequence();