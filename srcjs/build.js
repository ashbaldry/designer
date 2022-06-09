var esbuild = require("esbuild");
const fs = require('fs');

esbuild.build({
  entryPoints: ['app/index.js'],
  bundle: true,
  sourcemap: true,
  outfile: '../inst/app/www/designer.min.js',
  platform: 'node',
  minify: true
}).catch(
  () => process.exit(1)
);

esbuild.build({
  entryPoints: ['input/canvas-page-input.js'],
  bundle: true,
  outfile: '../inst/app/www/canvas-page-input.js',
  platform: 'node'
}).catch(
  () => process.exit(1)
);