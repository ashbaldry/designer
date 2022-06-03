require("esbuild").build({
  entryPoints: ['app/index.js', 'input/canvas-page-input.js'],
  bundle: true,
  outdir: 'tmp',
  platform: 'node'
}).catch(
  () => process.exit(1)
);

