const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

// carrega as variáveis do dev
const env = dotenv.config({ path: ".env.development", quiet: true });
dotenvExpand.expand(env);

// garante que DATABASE_URL acompanha as variáveis carregadas
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = "localhost",
  POSTGRES_PORT = "5432",
  POSTGRES_DB,
} = process.env;

if (
  POSTGRES_USER &&
  POSTGRES_PASSWORD &&
  POSTGRES_HOST &&
  POSTGRES_PORT &&
  POSTGRES_DB
) {
  process.env.DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
}
