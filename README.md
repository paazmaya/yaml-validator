# yaml-validator

> Validate Yaml files and enforce a given structure


[Yaml](http://yaml.org/) files are parsed via [`js-yaml`](https://github.com/nodeca/js-yaml)
and the structure defined in the configuration options is enforced with
[`check-type`](https://github.com/alistairjcbrown/check-type).

## Getting Started

Please note that this library requires the minimum [Node.js](https://nodejs.org/en/)
version to be `4.2.0`, which is the Long Term Support (LTS) version.

```sh
npm install yaml-validator --save-dev
```


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


### options.yaml

Type: `object`

Default value: `false`

Options passed to [`safeload` method of `js-yaml`](https://github.com/nodeca/js-yaml#safeload-string---options-).

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

Using the `options.yaml.onWarning` callback, the possible parsing errors can be retrieved.

```js
const options = {
  yaml: {
    onWarning: function (error, filepath) {
      console.log(filepath + ' has error: ' + error);
    }
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

[Please refer to a GitHub blog post on how to create somewhat perfect pull request.](https://github.com/blog/1943-how-to-write-the-perfect-pull-request "How to write the perfect pull request")

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint with [ESLint](http://eslint.org) and test your code using unit tests.

Please note that any features or changed will not be merged without working unit tests.

## Release History

* `v0.1.0` (2016-02-22)
  - Initial release to the World with code originating from [`grunt-yaml-validator` version `0.8.0`](https://github.com/paazmaya/grunt-yaml-validator/)

## License

Copyright (c) [Juga Paazmaya](http://www.paazmaya.fi) <paazmaya@yahoo.com>

Licensed under [the MIT license](LICENSE).
