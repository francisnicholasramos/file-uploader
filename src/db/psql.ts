import {Pool} from "pg";
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const sql = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
    `);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sid TEXT UNIQUE NOT NULL,
        data TEXT NOT NULL, 
        "expiresAt" TIMESTAMP NOT NULL
    );`);

    await pool.query(`
    CREATE TABLE IF NOT EXISTS entities (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        type entity_type NOT NULL,
        size INTEGER,
        "mimeType" TEXT, 
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "parentId" INTEGER,
        "userId" INTEGER NOT NULL,

        CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_parent FOREIGN KEY("parentId") REFERENCES entities(id) ON DELETE CASCADE
    );`);
};

// const sqlQuery = (params:string) => pool.query(params);
//
// sqlQuery("select * from sessions;").then(data => console.log(data.rows))

// sql().then(data => console.log(data))
