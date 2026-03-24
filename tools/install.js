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
// Language definitions
// ---------------------------------------------------------------------------

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt-br", label: "Português (BR)" },
  { code: "es", label: "Español" },
];

const I18N = {
  en: {
    prompt:
`Read all files inside .zyron/ in this order: personas.md, context.md, decisions.md, thinking.md, review.md.

From now on, for every task I give you:
- Run the 5-gate thinking protocol from thinking.md before generating anything
- Apply the quality checklist from review.md before delivering
- Log any technical decision in decisions.md
- Adapt your behavior to the level defined in personas.md

Confirm you read all files, state my current persona level, and tell me if context.md needs to be filled before we start.`,
    success: "zyron-reasoning installed. Open .zyron/START_HERE.md to begin.",
    warnings: (n) => `zyron-reasoning installed with ${n} adapter warning(s). Check messages above.`,
    nextStep: "Next step: copy the prompt below and paste it as your first message in the IDE.",
    promptFileNote: "This prompt was also saved to PROMPT.md in your project root.",
    selectLang: "Select your language:",
  },
  "pt-br": {
    prompt:
`Leia todos os arquivos dentro de .zyron/ nesta ordem: personas.md, context.md, decisions.md, thinking.md, review.md.

A partir de agora, para cada tarefa que eu der:
- Rode o protocolo de 5 gates do thinking.md antes de gerar qualquer coisa
- Aplique o checklist de qualidade do review.md antes de entregar
- Registre qualquer decisão técnica no decisions.md
- Adapte seu comportamento ao nível definido no personas.md

Confirme que leu todos os arquivos, informe meu nível de persona atual e me diga se o context.md precisa ser preenchido antes de começarmos.`,
    success: "zyron-reasoning instalado. Abra .zyron/START_HERE.md para começar.",
    warnings: (n) => `zyron-reasoning instalado com ${n} aviso(s) de adapter. Verifique as mensagens acima.`,
    nextStep: "Próximo passo: copie o prompt abaixo e cole como sua primeira mensagem na IDE.",
    promptFileNote: "Este prompt também foi salvo em PROMPT.md na raiz do projeto.",
    selectLang: "Selecione seu idioma:",
  },
  es: {
    prompt:
`Lee todos los archivos dentro de .zyron/ en este orden: personas.md, context.md, decisions.md, thinking.md, review.md.

De ahora en adelante, para cada tarea que te dé:
- Ejecuta el protocolo de 5 gates de thinking.md antes de generar cualquier cosa
- Aplica el checklist de calidad de review.md antes de entregar
- Registra cualquier decisión técnica en decisions.md
- Adapta tu comportamiento al nivel definido en personas.md

Confirma que leíste todos los archivos, indica mi nivel de persona actual y dime si context.md necesita ser completado antes de empezar.`,
    success: "zyron-reasoning instalado. Abre .zyron/START_HERE.md para comenzar.",
    warnings: (n) => `zyron-reasoning instalado con ${n} aviso(s) de adapter. Revisa los mensajes anteriores.`,
    nextStep: "Siguiente paso: copia el prompt de abajo y pégalo como tu primer mensaje en la IDE.",
    promptFileNote: "Este prompt también se guardó en PROMPT.md en la raíz del proyecto.",
    selectLang: "Selecciona tu idioma:",
  },
};

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

async function selectLanguage() {
  console.log("\nSelect your language:");
  LANGUAGES.forEach((lang, i) => {
    console.log(`  ${i + 1}. ${lang.label}`);
  });
  console.log();

  const answer = await prompt("→ ");
  const idx = parseInt(answer, 10) - 1;

  if (idx >= 0 && idx < LANGUAGES.length) {
    return LANGUAGES[idx].code;
  }
  return "en";
}

function generatePromptFile(lang) {
  const strings = I18N[lang];
  const content = `# zyron-reasoning — First Prompt\n\nCopy and paste this as your first message in the IDE:\n\n---\n\n${strings.prompt}\n`;
  const dest = path.join(projectDir, "PROMPT.md");
  fs.writeFileSync(dest, content, "utf-8");
}

function printPostInstallBlock(lang) {
  const strings = I18N[lang];
  const separator = "─".repeat(50);

  console.log();
  console.log(separator);
  console.log(`  ${strings.nextStep}`);
  console.log();
  console.log(`  "${strings.prompt}"`);
  console.log();
  console.log(`  ${strings.promptFileNote}`);
  console.log(separator);
  console.log();
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

  // Language selection
  const lang = await selectLanguage();
  const strings = I18N[lang];

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

  // Generate PROMPT.md in user's project root
  generatePromptFile(lang);

  if (failures > 0) {
    console.log(`\n⚠ ${strings.warnings(failures)}`);
  }

  console.log(`\n✓ ${strings.success}\n`);

  // Post-install block with prompt to copy
  printPostInstallBlock(lang);
}

main().catch((err) => {
  console.error("Installation failed:", err.message);
  process.exit(1);
});
