# Version history for yaml-validator

This changelog covers the version history and possible upcoming changes.
It follows the guidance from https://keepachangelog.com/en/1.0.0/.

## Unreleased

## `v4.0.0` (2022-02-05)

- Minimum supported Node.js version lifted from `10.13.0` to `14.15.0`

## `v3.0.1` (2021-02-16)
- Dependency update of the yaml parser used underneath, called `js-yaml`

## `v3.0.0` (2020-05-30)
- Minimum Node.js version lifted from `8.11.1` to `10.13.0`
- Test code smells at Sonarcloud.io

## `v2.2.0` (2019-05-29)
- Internally written as ES2015 Class, instead of ES5 way which polluted `prototype`
- Allows now more than just one input file via command line

## `v2.1.0` (2019-04-27)
- Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies
- Define `files` property in `package.json` to minify files in the published package

## `v2.0.0` (2019-01-17)
- Minimum supported and tested Node.js version is now `v8.11.1`
- The command line tool now exists with the number of failed files, previously always exiting with zero (0) #21

## `v1.3.0` (2018-03-16)
- Contents of the Yaml file were overwritten, in the case when saving to JSON and the Yaml file suffix was not `.yml` #14
- TypeScript types are available #13
- Dependencies up to :tophat:

## `v1.2.0` (2018-01-17)
- Separated parsing method from file reading method, hence one method more available to use

## `v1.1.0` (2018-01-15)
- Providing a command line version

## `v1.0.0` (2017-07-13)
- Time to go major
- Optional keys are now possible #9

## `v0.4.0` (2017-06-28)
- Provide file name, error message and line number when failing #7
- Keep dependencies up to date and test against Node.js major version `8`
- Minimum supported Node.js version lifted from `4.2.0` to `6.9.5`

## `v0.3.0` (2016-10-10)
- Proper unit tests #6
- `options.yaml.onWarning` is now `options.onWarning`

## `v0.2.1` (2016-08-25)
- Define the minimum Node.js version in `package.json`, as `4.2.0`

## `v0.2.0` (2016-07-06)
- Using shared ESLint configuration #2
- Possible JSON file written now replaces extension properly

## `v0.1.0` (2016-02-22)
- Initial release to the World with code originating from [`grunt-yaml-validator` version `0.8.0`](https://github.com/paazmaya/grunt-yaml-validator/)
