#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// ---------------------------------------------------------------------------
// IDE definitions
// ---------------------------------------------------------------------------

const IDES = [
  {
    name: "Claude Code",
    marker: ".claude",
    rulesDir: ".claude",
    templateFile: "claude.md",
    targetFileName: "zyron-reasoning.md",
  },
  {
    name: "Cursor",
    marker: ".cursor",
    rulesDir: path.join(".cursor", "rules"),
    templateFile: "cursor.md",
    targetFileName: "zyron-reasoning.mdc",
  },
  {
    name: "Windsurf",
    marker: ".windsurf",
    rulesDir: path.join(".windsurf", "rules"),
    templateFile: "windsurf.md",
    targetFileName: "zyron-reasoning.md",
  },
  {
    name: "Antigravity",
    marker: ".agent",
    rulesDir: ".agent",
    templateFile: "antigravity.md",
    targetFileName: "zyron-reasoning.md",
  },
];

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const projectDir = process.cwd();
const packageRoot = path.resolve(__dirname, "..");
const zyronSourceDir = path.join(packageRoot, ".zyron");
const templatesDir = path.join(packageRoot, "templates");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function copyDirSync(src, dest, force) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirSync(srcPath, destPath, force);
    } else if (fs.existsSync(destPath) && !force) {
      console.log(`  ⚠ ${path.relative(projectDir, destPath)} already exists — skipped`);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function detectIDEs() {
  return IDES.filter((ide) =>
    fs.existsSync(path.join(projectDir, ide.marker))
  );
}

function installZyronFiles(force) {
  const zyronDest = path.join(projectDir, ".zyron");
  copyDirSync(zyronSourceDir, zyronDest, force);
}

function installAdapterForIDE(ide, force) {
  const rulesDir = path.resolve(projectDir, ide.rulesDir);
  const templateSrc = path.resolve(templatesDir, ide.templateFile);
  const templateDest = path.resolve(rulesDir, ide.targetFileName);

  // Validate source template exists
  if (!fs.existsSync(templateSrc)) {
    console.error(`  ✗ ${ide.name}: source template not found at ${templateSrc}`);
    return false;
  }

  // Ensure target directory exists
  fs.mkdirSync(rulesDir, { recursive: true });

  // Skip if already exists and not forcing
  if (fs.existsSync(templateDest) && !force) {
    console.log(`  ⚠ ${ide.name}: ${path.relative(projectDir, templateDest)} already exists — skipped`);
    return true;
  }

  // Copy adapter
  fs.copyFileSync(templateSrc, templateDest);

  // Verify copy succeeded
  if (!fs.existsSync(templateDest)) {
    console.error(`  ✗ ${ide.name}: copy failed — file not found after write at ${templateDest}`);
    return false;
  }

  console.log(`  ✓ ${ide.name}: adapter → ${path.relative(projectDir, templateDest)}`);
  return true;
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const installAll = args.includes("--all");
  const force = args.includes("--force");

  let targetIDEs = [];

  if (installAll) {
    targetIDEs = IDES;
  } else {
    targetIDEs = detectIDEs();

    if (targetIDEs.length === 0) {
      console.log("\nNo IDE detected in this project.");
      console.log("Available IDEs:\n");
      IDES.forEach((ide, i) => {
        console.log(`  ${i + 1}. ${ide.name}`);
      });
      console.log();

      const answer = await prompt(
        "Enter the numbers of the IDEs to install for (comma-separated): "
      );
      const indices = answer
        .split(",")
        .map((s) => parseInt(s.trim(), 10) - 1)
        .filter((i) => i >= 0 && i < IDES.length);

      if (indices.length === 0) {
        console.log("No valid selection. Aborting.");
        process.exit(1);
      }

      targetIDEs = indices.map((i) => IDES[i]);
    }
  }

  // Copy .zyron/ files once
  installZyronFiles(force);

  // Copy adapter for each target IDE
  let failures = 0;
  for (const ide of targetIDEs) {
    try {
      const ok = installAdapterForIDE(ide, force);
      if (!ok) failures++;
    } catch (err) {
      console.error(`  ✗ ${ide.name}: ${err.message}`);
      failures++;
    }
  }

  if (failures > 0) {
    console.log(`\n⚠ zyron-reasoning installed with ${failures} adapter warning(s). Check messages above.`);
  }

  console.log(
    "\n✓ zyron-reasoning installed. Open .zyron/START_HERE.md to begin.\n"
  );
}

main().catch((err) => {
  console.error("Installation failed:", err.message);
  process.exit(1);
});
