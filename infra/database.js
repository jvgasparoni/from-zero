import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl:
      process.env.NODE_ENV === "development"
        ? false
        : {
            rejectUnauthorized: true,
            ca: process.env.POSTGRES_SSL_CA,
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
