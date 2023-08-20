test_that("create_random_id creates valid random ID", {
  expect_match(create_random_id(), "^[a-z]{10}$")
})
