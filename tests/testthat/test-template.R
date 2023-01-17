test_that("saving a template works", {
  # Don't run these tests on the CRAN build servers
  testthat::skip_on_cran()

  temp_dir <- tempdir()
  Sys.setenv(R_DESIGNER_CACHE = temp_dir)

  shiny_app <- designApp()
  app <- shinytest2::AppDriver$new(shiny_app, name = "designapp")

  on.exit({
    Sys.setenv(R_DESIGNER_CACHE = "")
    app$stop()
  })

  app$click(selector = ".canvas-page-choice[data-page='fixedPage']")
  app$wait_for_idle()
  app$click(selector = "#settings-template_button")
  app$wait_for_idle()
  app$click(selector = "#settings-template-save_button")
  app$wait_for_idle()

  # Checking that the modal has been generated
  expect_identical(app$get_text("#settings-template-title-label"), "Title")

  app$set_inputs(
    `settings-template-title` = "Test App",
    `settings-template-author` = "Ashley",
    `settings-template-description` = "Test description"
  )

  # Checking template is correctly saved
  app$click(selector = "#settings-template-save")
  app$wait_for_idle(1000L)
  expect_true(file.exists(file.path(temp_dir, "index.csv")))

  template <- read.csv(file.path(temp_dir, "index.csv"))
  expect_length(template, 5L)
  expect_named(template, c("id", "page", "title", "user", "description"))

  on.exit(add = TRUE, {
    file.remove(file.path(temp_dir, "index.csv"))
    unlink(file.path(temp_dir, template$id), recursive = TRUE)
  })

  # Changing page type to make sure updates correctly
  app$click(selector = "#settings-page_type_button")
  app$click(selector = "#settings-page_type input[value='navbarPage']")
  app$wait_for_idle()
  expect_true(grepl("data-shinyfunction=\"navbarPage\"", app$get_html("#canvas-page")))

  # Checking the template has been added to the UI
  template_id <- template$id
  app$click(selector = "#settings-template_button")
  app$wait_for_idle()

  cm <- app$get_chromote_session()
  doc_nodeId <- cm$DOM$getDocument()$root$nodeId

  template_parent_id <- cm$DOM$querySelector(doc_nodeId, "#settings-template-select")
  template_parent_info <- cm$DOM$describeNode(unlist(template_parent_id))
  expect_equal(template_parent_info$node$childNodeCount, 1L)

  template_ui_id <- cm$DOM$querySelector(unlist(template_parent_id), "article")
  template_ui_info <- cm$DOM$getAttributes(unlist(template_ui_id))

  page_id <- which(unlist(template_ui_info$attributes) == "data-page") + 1
  expect_identical(template_ui_info$attributes[[page_id]], template$page)

  id_id <- which(unlist(template_ui_info$attributes) == "data-value") + 1
  expect_identical(template_ui_info$attributes[[id_id]], template_id)

  # Checking when selected the template is updated
  app$click(selector = paste0("#settings-template-select article[data-value='", template_id, "'] article"))
  app$wait_for_idle()
  browser()
  expect_true(grepl("data-shinyfunction=\"fixedPage\"", app$get_html("#canvas-page")))
})
