test_that("TemplateModuleServer loads successfully", {
  shiny::testServer(
    TemplateModuleServer,
    args = list(
      html = reactiveVal(),
      page = reactive("fluidPage")
    ),
    expr = {
      expect_error(session$setInputs(save_button = 1L), NA)
    }
  )
})
