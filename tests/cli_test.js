/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

import fs from 'fs';
import {
  execFile
} from 'child_process';

import tape from 'tape';

/* import pkg from '../package.json' assert { type: 'json' };*/
const packageFile = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(2);

  execFile('node', [pkg.bin], null, (error, stdout) => {
    if (error) {
      test.ok('Exists with non-zero code');
    }
    test.ok(stdout.trim().indexOf('yaml-validator [options] <files>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (error, stdout) => {
    if (error) {
      test.fail(error);
    }
    test.ok(stdout.trim().indexOf('yaml-validator [options] <files>') !== -1, 'Help appeared');
  });

});

tape('cli should complain when non existing option used', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-g'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Invalid option ') !== -1, 'Complaint seen');
  });

});

tape('cli should require a file to be given', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('File(s) not specified') !== -1, 'Message seen');
  });

});

tape('cli realises that file does not exist', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, 'not-here'], null, (err, stdout, stderr) => {
    test.ok(stderr.indexOf('not-here" does not exis') !== -1);
  });

});

tape('cli realises when of multiple files the first does not exist', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, 'not-here-1', 'appveyor.yml'], null, (err, stdout, stderr) => {
    test.ok(stderr.indexOf('not-here-1" does not exis') !== -1);
  });

});

tape('cli executes when file exists', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, 'appveyor.yml'], null, (err, stdout) => {
    test.equal(stdout.trim(), '', 'No output expected');
  });

});

tape('cli writes json when requested', (test) => {
  test.plan(3);

  const jsonFile = 'appveyor.json';

  try {
    fs.accessSync(jsonFile);
    test.fail('JSON counterpart existed before');
  }
  catch (error) {
    test.pass('JSON counterpart does not exists before');
  }

  execFile('node', [pkg.bin, 'appveyor.yml', '-w'], null, (err, stdout) => {
    test.equal(stdout.trim(), '', 'No output expected');

    try {
      fs.accessSync(jsonFile);
      test.pass('JSON counterpart exists');
      fs.unlinkSync(jsonFile); // clean up
    }
    catch (error) {
      test.fail('JSON counterpart does not exists after');
    }

  });

});

tape('cli writes log file when requested', (test) => {
  test.plan(3);

  const logFile = 'hoplaa.log';

  try {
    fs.accessSync(logFile);
    test.fail('JSON counterpart existed before');
  }
  catch (error) {
    test.pass('JSON counterpart does not exists before');
  }

  execFile('node', [pkg.bin, 'appveyor.yml', '-l', logFile], null, (err, stdout) => {
    test.equal(stdout.trim(), '', 'No output expected');

    try {
      fs.accessSync(logFile);
      test.pass('JSON counterpart exists');
      fs.unlinkSync(logFile); // clean up
    }
    catch (error) {
      test.fail('JSON counterpart does not exists after');
    }

  });

});
