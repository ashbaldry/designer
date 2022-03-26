testthat::test_that("All Module UI generates with no errors", {
  module_ui_funcs <- ls(getNamespace("designer"), pattern = "ModUI")
  for (mod_ui_func in module_ui_funcs) {
    mod_ui <- get(mod_ui_func)(NULL)
    testthat::expect_type(mod_ui, "list")
  }
})
