import { build } from 'esbuild'

build({
  entryPoints: ['app/index.js'],
  bundle: true,
  sourcemap: true,
  outfile: '../inst/app/www/designer.min.js',
  platform: 'node',
  minify: false
}).catch(
  () => process.exit(1)
)
