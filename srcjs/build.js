const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

require("esbuild").build({
  entryPoints: ['input/canvas-page-input.js'],
  bundle: true,
  platform: "node",
  external: ["./node_modules/*"],
  outdir: "tmp"
}).catch(
  () => process.exit(1)
);

