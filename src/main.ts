#!/usr/bin/env node

import * as path from 'path';

const [_node, exe, ...args] = process.argv;

async function main() {
  if (args.length !== 1) {
    process.stderr.write(`Usage: ${path.basename(exe)} filename\n`);
    process.exit(1);
  }

  const [filename] = args;

  import("./").then(({ printESLintConfig }) => {
    printESLintConfig(filename);
  });
}

void main();
