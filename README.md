# yaml-validator

> Validate Yaml files and enforce a given structure

[![Ubuntu Build Status](https://semaphoreci.com/api/v1/paazmaya/yaml-validator/branches/master/shields_badge.svg)](https://semaphoreci.com/paazmaya/yaml-validator)
[![Windows build status](https://ci.appveyor.com/api/projects/status/rxt9kv7geq8vyny7/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/yaml-validator)
[![code coverage](https://codecov.io/gh/paazmaya/yaml-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/yaml-validator)

[Yaml](http://yaml.org/) files are parsed via [`js-yaml`](https://github.com/nodeca/js-yaml)
and the structure defined in the configuration options is enforced with
[`check-type`](https://github.com/alistairjcbrown/check-type).

## Getting Started

Please note that this library requires the minimum [Node.js](https://nodejs.org/en/)
version to be `4.2.0`, which is the Long Term Support (LTS) version.

Installation:

```sh
npm install yaml-validator --save-dev
```

Usage:

```js
const YamlValidator = require('yaml-validator');

// Default options
const options = this.options({
  log: false,
  structure: false,
  yaml: false,
  writeJson: false
});

const files = [];

const validator = new YamlValidator(options);
validator.validate(files);
validator.report();
```

## Configuration options

All options are `false` by default which disables their use.

### options.log

Type: `string`

Default value: `false`

In case the value is not `false`, the given string will be used as log file where all the
task output is written.


### options.structure

Type: `object`

Default value: `false`

The most complex style of checking validity.


### options.onWarning

Type: `function`

Default value: `null`

One of the options passed to [`safeload` method of `js-yaml`](https://github.com/nodeca/js-yaml#safeload-string---options-).

Please note that the `onWarning` callback is being used by this library and any method written for it,
will be run after the one implemented in this library.
The callback get called with two parameters, of which the first is the error in question,
while the second is the file path of the given Yaml file.


### options.writeJson

Type: `boolean`

Default: `false`

Write the given Yaml file as pretty printed JSON in the same path, just by changing the file extension to `json`.

Please note that any existing JSON files will be cruelly overwritten.

## Examples

### Structure validation options

In case an array is found, all its members are assumed to have the given structure.
This can be seen in the `classRooms` property, which according to the configuration below,
should be an array, for which all items are objects, which all should have a `name` and `id`
properties, with the given types.

The `teachers` array is made of strings, thus all items in that array must be a string.

```js
const options = {
  structure: {
    school: {
      description: 'string',
      code: 'number',
      principal: {
        name: 'string'
      },
      classRooms: [
        {
          name: 'string',
          id: 'number'
        }
      ],
      teachers: [
        'string'
      ]
    }
  }
};
```

### Warning callback in Yaml parsing options

Using the `options.onWarning` callback, the possible parsing errors can be retrieved.

```js
const options = {
  onWarning: function (error, filepath) {
    console.log(filepath + ' has error: ' + error);
  }
};
```

### Write a JSON file option

It is possible to use the `options.writeJson` to have all the files processed,
to be saved in JSON format, in the same file path as the original Yaml files.

```js
const options = {
  writeJson: true
};
```

## Contributing

["A Beginner's Guide to Open Source: The Best Advice for Making your First Contribution"](http://hf.heidilabs.com/blog/a-beginners-guide-to-open-source-making-your-first-contribution).

[Also there is a blog post about "45 Github Issues Dos and Don’ts"](https://davidwalsh.name/45-github-issues-dos-donts).

Linting is done with [ESLint](http://eslint.org) and can be executed with `npm run lint`.
There should be no errors appearing after any JavaScript file changes.

Please note that any features or changed will not be merged without working unit tests.

Unit tests are written with [`tape`](https://github.com/substack/tape) and can be executed with `npm test`.
Code coverage is inspected with [`nyc`](https://github.com/istanbuljs/nyc) and
can be executed with `npm run coverage` after running `npm test`.
Please make sure it is over 90% at all times.

## Release History

* `v0.3.0` (2016-10-10)
  - Proper unit tests #6
  - `options.yaml.onWarning` is now `options.onWarning`
* `v0.2.1` (2016-08-25)
  - Define the minimum Node.js version in `package.json`, as `4.2.0`
* `v0.2.0` (2016-07-06)
  - Using shared ESLint configuration #2
  - Possible JSON file written now replaces extension properly
* `v0.1.0` (2016-02-22)
  - Initial release to the World with code originating from [`grunt-yaml-validator` version `0.8.0`](https://github.com/paazmaya/grunt-yaml-validator/)

## License

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](LICENSE).
