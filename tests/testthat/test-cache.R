test_that("finding the cache directory creates one if necessary", {
  cache_dir <- find_cache_dir()
  expect_true(dir.exists(cache_dir))
})

test_that("cache dir can use custom directory", {
  temp_dir <- tempdir()
  good_dir <- file.path(temp_dir, "good_dir")
  dir.create(good_dir)
  Sys.setenv(R_DESIGNER_CACHE = good_dir)

  on.exit({
    Sys.setenv(R_DESIGNER_CACHE = "")
    unlink(temp_dir, recursive = TRUE, force = TRUE)
  })

  cache_dir <- find_cache_dir()
  expect_identical(cache_dir, good_dir)
})
