testthat::test_that("app ui", {
  ui <- appUI()
  golem::expect_shinytaglist(ui)
  # Check that formals have not been removed
  fmls <- formals(appUI)
  for (i in "request") {
    testthat::expect_true(i %in% names(fmls))
  }
})

testthat::test_that("app server", {
  server <- appServer
  testthat::expect_type(server, "closure")
  # Check that formals have not been removed
  fmls <- formals(appServer)
  for (i in c("input", "output", "session")) {
    testthat::expect_true(i %in% names(fmls))
  }
})

# Configure this test to fit your need
# testthat::test_that("app launches", {
#   golem::expect_running(sleep = 5)
# })
