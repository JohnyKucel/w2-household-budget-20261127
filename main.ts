import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const appDir = join(repoRoot, "app");
const shotsDir = join(repoRoot, "screenshots");

function copyTree(source, target) {
  mkdirSync(target, { recursive: true });
  cpSync(source, target, { recursive: true });
}

function handIn() {
  if (!existsSync(appDir)) throw new Error("app/ is missing from the repository");
  mkdirSync(outputDir, { recursive: true });
  copyTree(appDir, join(outputDir, "app"));
  if (existsSync(shotsDir)) copyTree(shotsDir, join(outputDir, "screenshots"));
  const dossier = buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  });
  writeFileSync(join(outputDir, "dossier.json"), dossier);
}

handIn();
