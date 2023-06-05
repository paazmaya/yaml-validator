#!/usr/bin/env node

/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

import fs from 'fs';
import path from 'path';

import optionator from 'optionator';

import YamlValidator from '../index.js';

/* import pkg from '../package.json' assert { type: 'json' };*/
const packageFile = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

const optsParser = optionator({
  prepend: `${pkg.name} [options] <files>`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Help and usage instructions'
    },
    {
      option: 'version',
      alias: 'V',
      type: 'Boolean',
      description: 'Version number',
      example: '-V'
    },
    {
      option: 'write-json',
      alias: 'w',
      type: 'Boolean',
      description: 'Write the contents of the Yaml file to a JSON file next to it'
    },
    {
      option: 'log-file',
      alias: 'l',
      type: 'String',
      description: 'Log file where errors are written'
    }
  ]
});

let opts;

try {
  opts = optsParser.parse(process.argv);
}
catch (error) {
  console.error(error.message);
  console.log(optsParser.generateHelp());
  process.exit(1);
}

if (opts.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (opts.help) {
  console.log(optsParser.generateHelp());
  process.exit(0);
}

if (opts._.length === 0) {
  console.error('File(s) not specified');
  console.log(optsParser.generateHelp());
  process.exit(1);
}

const resolveFilepath = (input) => {
  const output = path.resolve(input);

  try {
    fs.accessSync(output);
  }
  catch (error) {
    console.error(`The file "${output}" does not exist`);
    process.exit(1);
  }

  return output;
};

const files = opts._.map(resolveFilepath);

const options = {
  writeJson: typeof opts.writeJson === 'boolean' ?
    opts.writeJson :
    false,
  log: typeof opts.logFile === 'string' ?
    opts.logFile :
    false
};

const validator = new YamlValidator(options);
validator.validate(files);
process.exitCode = validator.report();
