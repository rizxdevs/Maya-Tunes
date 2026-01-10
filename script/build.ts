import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

const allowlist = [
  "dotenv",
  "passport-discord",

  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error"
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  // 🔹 Build frontend (Vite)
  console.log("building client...");
  await viteBuild({
    build: {
      outDir: "dist/public",
      emptyOutDir: false
    }
  });

  // 🔹 Build backend
  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {})
  ];

  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": "\"production\""
    },
    minify: true,
    external: [...externals, "dotenv/config"],
    logLevel: "info"
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
