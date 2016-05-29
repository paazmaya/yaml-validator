/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license.
 */

'use strict';

const tape = require('tape'),
  validator = require('../index');

tape('function is exported', (test) => {
  test.plan(2);

  test.equal(typeof validator, 'function');
  test.equal(validator.length, 1);
});

