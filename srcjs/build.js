require("esbuild").build({
  entryPoints: ['input/canvas-page-input.js'],
  bundle: true,
  external: ['./node_modules/*', 'rstudio-shiny'],
  outdir: 'tmp',
  platform: 'node'
}).catch(
  () => process.exit(1)
);

