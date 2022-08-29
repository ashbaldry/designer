const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app/index.js'],
  bundle: true,
  sourcemap: true,
  outfile: '../inst/app/www/designer.min.js',
  platform: 'node',
  minify: true
}).catch(
  () => process.exit(1)
)
