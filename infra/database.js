import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST || process.env.PGHOST,
    port: Number(process.env.POSTGRES_PORT || process.env.PGPORT || 5432),
    user: process.env.POSTGRES_USER || process.env.PGUSER,
    database: process.env.POSTGRES_DB || process.env.PGDATABASE,
    password: process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.POSTGRES_SSL_CA, // já criada na Vercel
    },
  });

  // log seguro para ver qual host está indo:
  console.log("DB host:", client.host, "port:", client.port);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
