testthat::test_that("Empty list returns nothing", {
  testthat::expect_equal(htmlToRScript(NULL), "")
  testthat::expect_equal(htmlToRScript(list()), "")
})
