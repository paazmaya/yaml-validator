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

tape('Exporting function', (test) => {
  test.plan(2);

  test.equal(typeof validator, 'function');
  test.equal(validator.length, 1);
});

tape('Validating methods', (test) => {
  test.plan(6);

  const validatorInstance = new validator()

  test.equal(typeof validatorInstance.errored, 'function');
  test.equal(typeof validatorInstance.validateStructure, 'function');
  test.equal(typeof validatorInstance.loadFile, 'function');
  test.equal(typeof validatorInstance.checkFile, 'function');
  test.equal(typeof validatorInstance.validate, 'function');
  test.equal(typeof validatorInstance.report, 'function');
});
