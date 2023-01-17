test_that("Package is lint free", {
  if (grepl(".Rcheck", getwd())) {
    path <- sub(".Rcheck", "", getwd())
  } else {
    path <- getwd()
  }

  lintr::expect_lint_free(path)
})
