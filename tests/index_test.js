/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

'use strict';

const tape = require('tape'),
  validator = require('../index');

tape('Exporting function', test => {
  test.plan(2);

  test.equal(typeof validator, 'function');
  test.equal(validator.length, 1);
});

tape('Validating methods', test => {
  test.plan(6);

  const validatorInstance = new validator();

  test.equal(typeof validatorInstance.errored, 'function');
  test.equal(typeof validatorInstance.validateStructure, 'function');
  test.equal(typeof validatorInstance.loadFile, 'function');
  test.equal(typeof validatorInstance.checkFile, 'function');
  test.equal(typeof validatorInstance.validate, 'function');
  test.equal(typeof validatorInstance.report, 'function');
});

tape('Default paramters\' values', test => {
  test.plan(4);

  const validatorInstance = new validator();
  validatorInstance.validate([]);

  test.equal(validatorInstance.inValidFilesCount, 0);
  test.equal(validatorInstance.logs.length, 0);
  test.equal(validatorInstance.nonValidPaths.length, 0);
  test.equal(typeof validatorInstance.options, 'object');
});

tape('Wrong filepath #1', test => {
  test.plan(2);

  const validatorInstance = new validator();
  validatorInstance.validate(['appveyur.yml']);

  test.equal(validatorInstance.logs.length, 1);
  test.equal(validatorInstance.inValidFilesCount, 1);
})

tape('Wrong filepath #2', test => {
  test.plan(2);

  const validatorInstance = new validator();
  validatorInstance.validate(['appveyur.yml', './appveyur.yml', '/var/www/sample.yml']);

  test.equal(validatorInstance.logs.length, 3);
  test.equal(validatorInstance.inValidFilesCount, 3);
})
