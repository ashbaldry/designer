test_that("designer app works", {
  # Don't run these tests on the CRAN build servers
  testthat::skip_on_cran()

  shiny_app <- designApp()
  app <- shinytest2::AppDriver$new(shiny_app, name = "designapp")
  on.exit(app$stop())

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
  app$click(selector = '#settings-page_type input[value="fluidPage"]')
  app$wait_for_idle()
  ui <- app$get_value(input = "canvas-canvas")
  testthat::expect_true(grepl("fluidPage(", jsonToRScript(ui), fixed = TRUE))

  # Expect all components create a component that can be dragged
  app$click(selector = '#settings-page_type input[value="dashboardPage"]')
  app$wait_for_idle()
  ui <- app$get_value(input = "canvas-canvas")
  testthat::expect_true(grepl("dashboardPage(", jsonToRScript(ui), fixed = TRUE))

  app$click(selector = "#sidebar-tab-add")

  for (component in COMPONENTS[-1L]) {
    app$click(selector = paste("#sidebar", component, "header button", sep = "-"))
    clicked_component <- app$get_html(selector = ".component-accordion .card.active")
    testthat::expect_true(grepl(paste0("sidebar-", component, "-header"), clicked_component))
  }

  # Choose all different outputs that create IDs
  app$click(selector = "#sidebar-output-header button")
  original_outputs <- app$get_values()$output
  app$set_inputs("sidebar-output-type" = "plot")
  app$set_inputs("sidebar-output-type" = "table")
  app$set_inputs("sidebar-output-type" = "image")

  new_outputs <- app$get_values()$output
  testthat::expect_length(new_outputs, 3L + length(original_outputs))

  # Check that UI gets added to code module
  app$click(selector = "#settings-code_button")
  testthat::expect_true(grepl("dashboardPage", app$get_value(output = "settings-code-code")))
})
