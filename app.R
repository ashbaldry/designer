# Launch the ShinyApp (Do not remove this comment)
# Deployed to Posit Connect Cloud from GitHub using manifest.json
# After changing dependencies, regenerate it with: rsconnect::writeManifest()
# and remove the "designer" entry from its packages, as it is loaded from source here

pkgload::load_all(
  export_all = FALSE,
  helpers = FALSE,
  attach_testthat = FALSE
)

options("golem.app.prod" = TRUE)
designApp()
