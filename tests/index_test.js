/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

import fs from 'fs';

import tape from 'tape';
import sinon from 'sinon';

import Validator from '../index.js';

tape('Exporting function', (test) => {
  test.plan(2);

  test.equal(typeof Validator, 'function');
  test.equal(Validator.length, 1);
});

tape('Validating methods', (test) => {
  test.plan(6);

  const validatorInstance = new Validator();

  test.equal(typeof validatorInstance.errored, 'function');
  test.equal(typeof validatorInstance.validateStructure, 'function');
  test.equal(typeof validatorInstance.loadFile, 'function');
  test.equal(typeof validatorInstance.checkFile, 'function');
  test.equal(typeof validatorInstance.validate, 'function');
  test.equal(typeof validatorInstance.report, 'function');
});

tape('Default parameter values', (test) => {
  test.plan(8);

  const validatorInstance = new Validator();
  validatorInstance.validate([]);

  test.equal(validatorInstance.inValidFilesCount, 0);
  test.equal(validatorInstance.logs.length, 0);
  test.equal(validatorInstance.nonValidPaths.length, 0);
  test.equal(typeof validatorInstance.options, 'object');
  test.equal(validatorInstance.options.log, false);
  test.equal(validatorInstance.options.writeJson, false);
  test.equal(validatorInstance.options.structure, false);
  test.equal(validatorInstance.options.onWarning, null);
});

tape('Empty file contents', (test) => {
  test.plan(3);

  const validatorInstance = new Validator();
  validatorInstance.validate(['tests/fixtures/empty.yml']);

  test.equal(validatorInstance.logs.length, 0); // validateStructure does not complain hence zero
  test.equal(validatorInstance.inValidFilesCount, 1);

  const isInvalid = validatorInstance.checkFile('tests/fixtures/empty.yml');
  test.equal(isInvalid, 1);
});

tape('Wrong filepath #1', (test) => {
  test.plan(2);

  const validatorInstance = new Validator();
  validatorInstance.validate(['appveyur.yml']);

  test.equal(validatorInstance.logs.length, 1);
  test.equal(validatorInstance.inValidFilesCount, 1);
});

tape('Wrong filepath #2', (test) => {
  test.plan(2);

  const validatorInstance = new Validator();
  validatorInstance.validate(['appveyur.yml', './appveyur.yml', '/var/www/sample.yml']);

  test.equal(validatorInstance.logs.length, 3);
  test.equal(validatorInstance.inValidFilesCount, 3);
});

tape('Wrong kind of file contents', (test) => {
  test.plan(2);

  // Failed to load the Yaml file "README.md"
  const validatorInstance = new Validator();
  validatorInstance.validate(['README.md']);

  test.equal(validatorInstance.logs.length, 1);
  test.equal(validatorInstance.inValidFilesCount, 1);
});

tape('report() returns 0 if all files are valid', (test) => {
  test.plan(2);

  // Failed to load the Yaml file "README.md"
  const validatorInstance = new Validator();
  validatorInstance.validate(['appveyor.yml']);

  test.equal(validatorInstance.inValidFilesCount, 0);
  test.equal(validatorInstance.report(), 0);
});

tape('report() returns count of invalid files', (test) => {
  test.plan(2);

  // Failed to load the Yaml file "README.md"
  const validatorInstance = new Validator();
  validatorInstance.validate(['README.md']);

  test.equal(validatorInstance.inValidFilesCount, 1);
  test.equal(validatorInstance.report(), 1);
});

tape('report() increments log length by one if no invalid files', (test) => {
  test.plan(2);

  const validatorInstance = new Validator();
  validatorInstance.validate(['appveyor.yml']);

  test.equal(validatorInstance.logs.length, 0);

  validatorInstance.report();

  test.equal(validatorInstance.logs.length, 1);
});

tape('report() increments log length by two if invalid files present', (test) => {
  test.plan(2);

  const validatorInstance = new Validator();
  validatorInstance.validate(['appveyur.yml']);

  test.equal(validatorInstance.logs.length, 1);

  validatorInstance.report();

  test.equal(validatorInstance.logs.length, 3);
});

tape('Valid Structure', (test) => {
  test.plan(1);

  const options = {
    structure: {
      environment: {
        matrix: [
          {
            nodejs_version: 'string'
          }
        ]
      },
      version: 'string',
      init: ['string'],
      clone_depth: 'number',
      matrix: {
        fast_finish: 'boolean'
      },
      cache: ['string'],
      install: [
        {
          ps: 'string'
        },
        'string'
      ],
      test_script: ['string'],
      build: 'string'
    }
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['appveyor.yml']);

  test.equal(validatorInstance.inValidFilesCount, 0);
});

tape('Invalid Structure', (test) => {
  test.plan(1);

  const options = {
    structure: {
      environment: {
        matrix: [
          {
            nodejs_version: 'string'
          }
        ]
      },
      init: ['string'],
      version: 'string',
      clone_depth: 'number',
      matrix: {
        fast_finish: 'number'
      },
      cache: ['string'],
      install: [
        {
          ps: 'string'
        },
        'string'
      ],
      test_script: ['string'],
      notUsedKey: [],
      build: 'string'
    }
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['appveyor.yml']);
  test.equal(validatorInstance.inValidFilesCount, 1);
});


tape('Optional Structure', (test) => {
  test.plan(1);

  const options = {
    structure: {
      environment: {
        matrix: [
          {
            nodejs_version: 'string'
          }
        ]
      },
      init: ['string'],
      'version?': 'string',
      clone_depth: 'number',
      matrix: {
        fast_finish: 'boolean',
        'option field?': 'string'
      },
      'cache?': ['string'],
      'install?': [
        {
          ps: 'string',
          'ps2?': 'string'
        },
        'string'
      ],
      test_script: ['string'],
      'build?': 'string',

      'optionalKey?': ['string'],
      'optionalField?': 'string',
      'optionalProperty?': {
        'field1?': 'string'
      }
    }
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['appveyor.yml']);
  console.log(validatorInstance);
  test.equal(validatorInstance.inValidFilesCount, 0);
});

tape('Test creation of JSON file from YAML structure', (test) => {
  test.plan(1);

  const options = {
    writeJson: true
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['appveyor.yml']);

  fs.unlink('appveyor.json', function (err) {
    if (err) {
      test.fail('Json file does not exist...');
    }
    else {
      test.pass('Json file exists...');
    }
  });
});

tape('Test creation of Log reports from YAML structure', (test) => {
  test.plan(1);

  const options = {
    log: 'yaml_validator.log'
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['appveyor.yml']);
  validatorInstance.report();
  fs.unlink('yaml_validator.log', function (err) {
    if (err) {
      test.fail('Log does not exist...');
    }
    else {
      test.pass('Log exists...');
    }
  });
});

tape('checkFile creates JSON when requested', (test) => {
  test.plan(1);

  const name = 'tests/fixtures/just-checking-json-file-appears';
  const validatorInstance = new Validator({
    writeJson: true
  });
  validatorInstance.checkFile(`${name}.YAML`);

  test.ok(fs.existsSync(`${name}.json`));
});

/*
tape('Wrong kind of file contents trigger onWarning callback', {timeout: 1200}, test => {

  const testfile = 'README.md';

  // Failed to load the Yaml file "README.md"
  const validatorInstance = new Validator({
    onWarning: (error, filepath) => {
      test.equal(filepath, testfile);
      test.end();
    }
  });
  validatorInstance.validate([testfile]);

  test.equal(validatorInstance.inValidFilesCount, 1);
});
*/


tape('The case of #70 - Structure validation', (test) => {
  test.plan(1);
  const structure = {
    globals: {
      consumer: [
        {
          event: 'string'
        }
      ],
      producer: [
        {
          event: 'string'
        }
      ]
    },
    apps: [
      {
        name: 'string',
        consumer: [
          {
            event: 'string'
          }
        ],
        producer: [
          {
            event: 'string'
          }
        ]
      }
    ],
    definitions: [
      {
        event: 'string',
        name: 'string',
        description: 'string',
        'payload?': [
          {
            name: 'string',
            type: 'string'
          }
        ]
      }
    ]
  };

  const options = {
    log: false,
    structure: structure,
    onWarning: (error, filepath) => {
      console.warn(filepath + ' has error: ' + error);
    },
    writeJson: false
  };

  const validatorInstance = new Validator(options);
  validatorInstance.validate(['tests/fixtures/api.yml']);
  test.equal(validatorInstance.inValidFilesCount, 1);

});

tape('Calls onWarning if invalid yaml', (test) => {
  test.plan(2);

  const onWarning = sinon.spy();

  const validatorInstance = new Validator({
    onWarning
  });
  validatorInstance.validate(['tests/fixtures/invalid.yml']);

  test.true(onWarning.calledOnce);
  test.true(onWarning.calledOnceWithExactly(
    'Failed to load the Yaml file "tests/fixtures/invalid.yml:4"\n' +
    'bad indentation of a sequence entry (4:5)\n' +
      '\n' +
      ' 1 | globals:\n' +
      ' 2 |   consumer:\n' +
      ' 3 |   - event: "#/definitions/Register"\n' +
      ' 4 |     - event: "#/definitions/Next"\n' +
      '---------^\n' +
      ' 5 |     - event: "#/definitions/Previous"\n' +
      ' 6 |     - event: "#/definitions/Destroy"',
    'tests/fixtures/invalid.yml'
  ));

});

tape('Calls onWarning if empty yaml', (test) => {
  test.plan(1);

  const onWarning = sinon.spy();

  const validatorInstance = new Validator({
    onWarning
  });
  validatorInstance.validate(['tests/fixtures/empty.yml']);

  test.true(onWarning.calledOnceWithExactly(
    'File is empty', 'tests/fixtures/empty.yml'
  ));
});
