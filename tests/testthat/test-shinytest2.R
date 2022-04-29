testthat::test_that("designer app works", {
  # Don't run these tests on the CRAN build servers
  testthat::skip_on_cran()

  shiny_app <- designApp()
  app <- shinytest2::AppDriver$new(shiny_app, name = "designapp")

  # Checking page is loaded
  app$expect_unique_names()

  # Checking title and matches app title
  title <- app$get_value(input = "app_name")
  app_title <- app$get_text("#canvas-title")
  testthat::expect_equal(title, app_title)

  # Expecting app title changes on title change
  app$set_inputs("app_name" = "Test Name")

  title <- app$get_value(input = "app_name")
  app_title <- app$get_text("#canvas-title")
  testthat::expect_equal(title, app_title)

  # Expecting page to change on click change
  app$click(selector = '#settings-page_type .form-check [value="fluidPage"]')
  ui <- app$get_value(input = "canvas-canvas")
  testthat::expect_true(grepl("fluidPage(", jsonToRScript(ui), fixed = TRUE))
})
