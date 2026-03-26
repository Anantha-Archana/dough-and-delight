import sqlite3 from "sqlite3";
import { open } from "sqlite";

const run = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  const tables = await db.all(`
    SELECT name FROM sqlite_master WHERE type='table'
  `);
  console.log("Tables:", tables);

  await db.run(`DELETE FROM menu WHERE id IN (6)`);

  console.log("Deleted successfully");

  await db.close();
};

run();



// import sqlite3 from "sqlite3";
// import { open } from "sqlite";

// const run = async () => {
//   const db = await open({
//     filename: "./database.sqlite",
//     driver: sqlite3.Database,
//   });

//   // delete the row with id = 3
//   // await db.run("DELETE FROM menu WHERE id = 1");
//   // Multiple ways to delete multiple rows:
//   await db.run("DELETE FROM order WHERE id IN (1)");

//   console.log("Deleted successfully");

//   await db.close();
// };

// run();