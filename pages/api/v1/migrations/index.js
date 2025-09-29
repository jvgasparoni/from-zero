import controller from "infra/controller.js";
import database from "infra/database.js";
import { createRouter } from "next-connect";
import { resolve } from "node:path";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

// Carrega o runner via import dinâmico (ESM) e lida com variações de export
async function loadMigrationRunner() {
  const mod = await import("node-pg-migrate");
  const fn =
    typeof mod === "function"
      ? mod
      : typeof mod?.default === "function"
        ? mod.default
        : typeof mod?.runner === "function"
          ? mod.runner
          : null;

  if (!fn) {
    throw new Error(
      "node-pg-migrate: não foi possível resolver a função runner a partir dos exports do módulo.",
    );
  }
  return fn;
}

async function getHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationRunner = await loadMigrationRunner();
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });
    return response.status(200).json(pendingMigrations);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationRunner = await loadMigrationRunner();
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient.end();
  }
}
