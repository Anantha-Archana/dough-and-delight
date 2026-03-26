import sqlite3 from "sqlite3";
import { open } from "sqlite";

const run = async () => {
    const db = await open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });

    await db.run("DELETE FROM sqlite_sequence WHERE name='menu'");

    console.log("Sequence reset done");

    await db.close();
};

run();