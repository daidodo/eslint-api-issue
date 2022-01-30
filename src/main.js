#!/usr/bin/env node

"use strict";

const { ESLint } = require("eslint");
const path = require("path");
const fs = require("fs");

const [_node, exe, ...args] = process.argv;

async function main(exe, args) {
  if (args.length !== 1) {
    process.stderr.write(`Usage: ${path.basename(exe)} filename\n`);
    process.exit(1);
  }

  const [filename] = args;
  if (!fs.existsSync(filename)) {
    process.stderr.write(`File '${filename}' doesn't exist.\n`);
    process.exit(1);
  }

  try {
    console.log("ESLint version:", ESLint.version);
    const eslint = new ESLint();

    const ignored = await eslint.isPathIgnored(filename);
    if (ignored) {
      console.log(`File '${filename}' is ignored by ESLint.`);
      process.exit(0);
    }
    console.log("Resolved ESLint config:");

    const config = await eslint.calculateConfigForFile(filename);
    console.log(config);
  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n`);
  }
}

void main(exe, args);
