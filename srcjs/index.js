require("esbuild").build({
  entryPoints: ["input/canvas-page-input.js"],
  bundle: true,
  outfile: "tmp"
}).catch(
  () => process.exit(1)
);
