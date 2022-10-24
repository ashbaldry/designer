#' @noRd
TemplateModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    observeEvent(input$save, {})

    observeEvent(input$select, {})
  })
}
