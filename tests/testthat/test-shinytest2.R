test_that("designer app functionality works as expected", {
  # Don't run these tests on the CRAN build servers
  skip_on_cran()

  shiny_app <- designApp()
  app <- shinytest2::AppDriver$new(shiny_app, name = "designapp")
  on.exit(app$stop())

  # Checking for ID uniqueness
  app$expect_unique_names()

  # Checking title and matches app title
  title <- app$get_value(input = "app_name")
  app_title <- app$get_text("#canvas-title")
  expect_equal(title, app_title)

  # Expecting app title changes on title change
  app$set_inputs("app_name" = "Test Name")

  title <- app$get_value(input = "app_name")
  app_title <- app$get_text("#canvas-title")
  expect_equal(title, app_title)

  # Expecting page to change on click change
  app$click(selector = '#settings-page_type input[value="fluidPage"]')
  app$wait_for_idle()
  ui <- app$get_value(input = "canvas-canvas")
  expect_true(grepl("fluidPage(", jsonToRScript(ui), fixed = TRUE))

  # Expect dashboard page to populate, and generate sample R code
  app$click(selector = '#settings-page_type input[value="dashboardPage"]')
  app$wait_for_idle()
  ui <- app$get_value(input = "canvas-canvas")

  app$click(selector = "#settings-code_button")
  r_code <- app$get_value(output = "settings-code-code")
  expect_equal(r_code, jsonToRScript(ui))
  app$click(selector = "#settings-code_button")

  # Check all components can be selected
  app$click(selector = "#sidebar-tab-add")

  stored_component_shell <- ""
  for (component in COMPONENTS[-1L]) {
    app$click(selector = paste("#sidebar", component, "header button", sep = "-"))
    clicked_component <- app$get_html(selector = ".component-accordion .card.active")
    expect_true(grepl(paste0("sidebar-", component, "-header"), clicked_component))

    # Ensuring that the new component changes the preview, and is non-empty
    component_shell <- app$get_html(selector = "#sidebar-container")
    expect_true(grepl("designer-element", component_shell))
    expect_true(component_shell != stored_component_shell)
    stored_component_shell <- component_shell
  }

  # Choose all different outputs that create IDs
  app$click(selector = "#sidebar-output-header button")
  original_outputs <- app$get_values()$output
  app$set_inputs("sidebar-output-type" = "plot")
  app$set_inputs("sidebar-output-type" = "table")
  app$set_inputs("sidebar-output-type" = "image")

  new_outputs <- app$get_values()$output
  expect_length(new_outputs, 3L + length(original_outputs))

  # Check that UI gets added to code module
  app$click(selector = "#settings-code_button")
  expect_true(grepl("dashboardPage", app$get_value(output = "settings-code-code")))
})
