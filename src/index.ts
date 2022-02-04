import { ESLint } from 'eslint';
import fs from 'fs';

export async function printESLintConfig(filename: string) {
  if (!fs.existsSync(filename)) {
    process.stderr.write(`File '${filename}' doesn't exist.\n`);
    process.exit(1);
  }

  try {
    console.log("ESLint version:", ESLint.version);
    const eslint = new ESLint();
    console.log("eslint object:", eslint);

    const ignored = await eslint.isPathIgnored(filename);
    if (ignored) {
      console.log(`File '${filename}' is ignored by ESLint.`);
      process.exit(0);
    }
    console.log("Resolving ESLint config:");

    const config = await eslint.calculateConfigForFile(filename);
    console.log(config);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : `${err}`;
    process.stderr.write(`\nError: ${msg}\n`);
  }
}
