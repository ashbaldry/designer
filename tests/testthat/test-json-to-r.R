testthat::test_that("NULL returns empty string", {
  testthat::expect_equal(jsonToRScript(NULL), "")
})

testthat::test_that("Invalid JSON returns NA", {
  testthat::expect_message(jsonToRScript(""))
  testthat::expect_equal(suppressMessages(jsonToRScript("")), NA_character_)
})

testthat::test_that("Empty JSON object returns empty string", {
  testthat::expect_equal(jsonToRScript("{}"), "")
})

testthat::test_that("JSON list returns valid R code", {
  ui_script <- jsonToRScript('{"r_function": "fluidPage"}')
  testthat::expect_true(grepl("fluidPage", ui_script))
})
