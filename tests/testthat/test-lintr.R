test_that("Package is lint free", {
  lintr::expect_lint_free(
    linters = lintr::linters_with_defaults(
      absolute_path_linter = lintr::absolute_path_linter(),
      any_duplicated_linter = lintr::any_duplicated_linter(),
      any_is_na_linter = lintr::any_is_na_linter(),
      assignment_linter = lintr::assignment_linter(allow_right_assign = FALSE),
      brace_linter = lintr::brace_linter(allow_single_line = TRUE),
      class_equals_linter = lintr::class_equals_linter(),
      condition_message_linter = lintr::condition_message_linter(),
      conjunct_test_linter = lintr::conjunct_test_linter(),
      line_length_linter = lintr::line_length_linter(length = 120L),
      object_name_linter = NULL
    )
  )
})
