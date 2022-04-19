testthat::test_that("JSON -> R: NULL returns empty string", {
  testthat::expect_equal(jsonToRScript(NULL), "")
})

testthat::test_that("JSON -> R: Invalid JSON returns NA", {
  testthat::expect_message(jsonToRScript(""))
  testthat::expect_equal(suppressMessages(jsonToRScript("")), NA_character_)
})

testthat::test_that("JSON -> R: Empty JSON object returns empty string", {
  testthat::expect_equal(jsonToRScript("{}"), "")
})

testthat::test_that("JSON -> R: JSON list returns valid R code", {
  ui_script <- jsonToRScript('{"r_function": "fluidPage"}')
  testthat::expect_true(grepl("fluidPage", ui_script))
})

testthat::test_that("JSON -> R: Arguments appear on own line", {
  ui_script <- jsonToRScript(
    '{"tagName":"div",
      "r_function":"sliderInput",
      "r_arguments":"inputId = \\"slider_twecttskbi\\", label = \\"Label\\", min = 0, max = 10, value = 5","text":"",
      "htmlclass":"designer-element form-group shiny-input-container",
      "children":[]
    }'
  )
  testthat::expect_type(ui_script, "character")
  testthat::expect_true(grepl("inputId = \"slider_twecttskbi\"", ui_script, fixed = TRUE))
})

testthat::test_that("JSON -> R: Vector appears on single line", {
  ui_script <- jsonToRScript(
    '{"r_function": "fluidPage", "r_arguments": "x = c(1, 2), y = c(3, 4)"}'
  )
  testthat::expect_true(grepl("x = c(1, 2),\n", ui_script, fixed = TRUE))
})
