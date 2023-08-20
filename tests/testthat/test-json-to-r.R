test_that("HTML -> R: Empty list returns nothing", {
  expect_equal(htmlToRScript(NULL), "")
  expect_equal(htmlToRScript(list()), "")
})

test_that("HTML -> R: Works with valid list", {
  ui_script <- htmlToRScript(
    list(
      r_function = "basicPage",
      children = list(
        list(
          r_function = "sliderInput",
          r_arguments = "inputId = \"slider_twecttskbi\", label = \"Label\", min = 0, max = 10, value = 5"
        )
      )
    )
  )

  expect_type(ui_script, "character")
  expect_true(grepl("inputId = \"slider_twecttskbi\",\n", ui_script))
})

test_that("HTML -> R: Works with module", {
  ui_script <- htmlToRScript(
    module_name = "Test",
    list(
      r_function = "basicPage",
      children = list(
        list(
          r_function = "sliderInput",
          r_arguments = "inputId = \"slider_twecttskbi\", label = \"Label\", min = 0, max = 10, value = 5"
        )
      )
    )
  )

  expect_type(ui_script, "character")
  expect_true(grepl("#' Test Module", ui_script))
  expect_true(grepl("TestUI <-", ui_script))
})

test_that("JSON -> R: NULL returns empty string", {
  expect_equal(jsonToRScript(NULL), "")
})

test_that("JSON -> R: Invalid JSON returns NA", {
  expect_message(jsonToRScript(""))
  expect_equal(suppressMessages(jsonToRScript("")), NA_character_)
})

test_that("JSON -> R: Empty JSON object returns empty string", {
  expect_equal(jsonToRScript("{}"), "")
})

test_that("JSON -> R: JSON list returns valid R code", {
  ui_script <- jsonToRScript('{"r_function": "fluidPage"}')
  expect_true(grepl("fluidPage", ui_script))
})

test_that("JSON -> R: Arguments appear on own line", {
  ui_script <- jsonToRScript(
    '{"tagName":"div",
      "r_function":"sliderInput",
      "r_arguments":"inputId = \\"slider_twecttskbi\\", label = \\"Label\\", min = 0, max = 10, value = 5",
      "text":"",
      "htmlclass":"designer-element form-group shiny-input-container",
      "children":[]
    }'
  )
  expect_type(ui_script, "character")
  expect_true(grepl("inputId = \"slider_twecttskbi\"", ui_script, fixed = TRUE))
})

test_that("JSON -> R: Text is included correctly", {
  ui_script <- jsonToRScript(
    '{"tagName":"p",
      "r_function":"p",
      "text":"Sample text",
      "htmlclass":"",
      "children":[]
    }'
  )
  expect_type(ui_script, "character")
  expect_identical(ui_script, "p(\n  \"Sample text\"\n)")
})

test_that("JSON -> R: Vector appears on single line", {
  ui_script <- jsonToRScript(
    '{"r_function": "fluidPage", "r_arguments": "x = c(1, 2), y = c(3, 4)"}'
  )
  expect_true(grepl("x = c(1, 2),\n", ui_script, fixed = TRUE))
})

test_that("JSON -> R: Comment appears first", {
  ui_script <- jsonToRScript(
    '{"r_function": "fluidPage", "r_arguments": "x = c(1, 2), y = c(3, 4)", "r_comments": "Test"}'
  )
  expect_true(grepl("^# Test", ui_script))
})

test_that("JSON -> R: Multi-line comment works", {
  ui_script <- jsonToRScript(
    '{"r_function": "fluidPage", "r_comments": "Test\\nTest"}'
  )
  expect_true(grepl("^# Test\n# Test", ui_script))
})

test_that("JSON -> R: Results match HTML -> R", {
  ui_script <- '
    {"tagName":"div",
      "r_function":"sliderInput",
      "r_arguments":"inputId = \\"slider_twecttskbi\\", label = \\"Label\\", min = 0, max = 10, value = 5","text":"",
      "htmlclass":"designer-element form-group shiny-input-container",
      "children":[]
    }
  '

  ui_list <- list(
    r_function = "sliderInput",
    r_arguments = "inputId = \"slider_twecttskbi\", label = \"Label\", min = 0, max = 10, value = 5"
  )

  expect_identical(jsonToRScript(ui_script), htmlToRScript(ui_list))
})
