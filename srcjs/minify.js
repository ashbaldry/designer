const minify = require('@node-minify/core');
const uglifyJS = require('@node-minify/uglify-js');

minify({
  compressor: uglifyJS,
  input: "tmp/**/*.js",
  output: "../inst/app/www/designer.min.js",
  callback: function(err, min) {}
});
