var esbuild = require("esbuild");

esbuild.build({
  entryPoints: ['index.js'],
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
  outfile: '../inst/app/www/canvas-page.min.js',
  platform: 'node',
  minify: true
}).catch(
  () => process.exit(1)
);