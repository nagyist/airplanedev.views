# Views

[![NPM](https://img.shields.io/npm/l/@airplane/views)](https://github.com/airplanedev/views/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/@airplane/views)](https://www.npmjs.com/package/@airplane/views)

A React library for building Airplane Views. Views components are optimized in style and functionality to produce internal apps that are easy to build and maintain.

## Links

- [Documentation](https://docs.airplane.dev/views/overview)
- [Contributing](https://github.com/airplanedev/views/blob/main/CONTRIBUTING.md)
- [Help and support](https://app.airplane.dev/library#support)
- [Release notes](https://github.com/airplanedev/views/releases)

## Getting help

For help with using Airplane Views, to report a bug, or to send us feedback, you can click "Help and support" from [any page within the app](https://app.airplane.dev/library#support). You can also email support@airplane.dev.

You can also create a new [issue in the repository](https://github.com/airplanedev/views/issues). Our team responds to new issues in a timely manner.

## Contributing

See [Contributing](https://github.com/airplanedev/views/blob/main/CONTRIBUTING.md) for the contribution guide.

## Development

Before completing any of the following steps, ensure you are running the correct version of Node.js by running `nvm use` or by checking the [`.nvmrc`](https://github.com/airplanedev/views/blob/main/.nvmrc) file at the root of the repository.

### Install dependencies

Run `yarn` from the repository root to install dependencies.

### Develop

#### Storybook

The easiest way to develop is to through the Views [Storybook](https://storybook.js.org/).

From the `lib/` directory, run `yarn storybook` to spin up a local version of Storybook. Find the story that corresponds to the change you are making, or create a new story if one does not exist. Your story should hot reload to reflect code changes.

#### Examples

To test more complex changes involving multiple components or interfacing with the Airplane API, you can run an example view which includes your changes.

From an `examples/*` directory, install dependencies `yarn` and then run `yarn dev` to spin up a local Vite development server. The example should hot reload to reflect code changes.

If you are testing changes against the Airplane API, create a file `.env` at the root of the example and add the following key/value pairs:

```
AIRPLANE_TOKEN=<your Airplane token>
AIRPLANE_ENV_SLUG=<environment against which you want to execute>
```

Your Airplane token can be found in `$HOME/.airplane/config`.

You can also set a custom `AIRPLANE_API_HOST` in your `.env` file if you don't want to use the default Airplane API host.

Note any tasks that you're using in your view since tasks are executed against the host and environment specified in your `.env` file, so make sure that the tasks are deployed.

Note that while code changes are hot loaded, type changes won't be automatically reflected unless you run `airplane build` from the `lib/` directory.

### Run tests

We use [eslint](https://eslint.org/) as our code linter and formatter. Run `yarn lint` from the `lib/` directory to run the linter or `yarn lint:fix` to run the linter and auto-fix any problems.

To run all unit tests, run `yarn test` from the `lib/` directory. You can also run individual tests using `yarn test path/to/file` or `yarn test:watch path/to/file` to automatically re-run tests when code changes.

We use [cypress](https://www.cypress.io/) to run integration tests. Run `yarn test:integration` from the `lib/` directory. This will automatically open up the cypress UI from which you can pick a browser and a test to run.
