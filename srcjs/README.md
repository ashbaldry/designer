# Desinger JS

Turning into a module for much easier addition of new components/pages

## First-time setup
The JavaScript component of designer uses Node.js build tools, along with [yarn](https://yarnpkg.com/) v2 to manage the JavaScript packages.

Installation of Node.js differs across platforms, see [the official Node.js website](https://nodejs.org/) for instructions on downloading and installing. We presume that you have Node.js installed on your machine before continuing.

Install yarn using the [official instructions](https://yarnpkg.com/en/docs/install).

You can test that Node.js and yarn are installed properly by running the following commands:

```bash
node --version
yarn --version
```

Once both are installed, run the following in the `srcjs` repo directory to install the packages :

```bash
# Sitting in `designer/srcjs` directory
yarn install
```

## Contributing

If any JS is changed, run `yarn build` to add the minified JS to the application.
