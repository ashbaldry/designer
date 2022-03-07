#' @param ui_code Reactive object containing JSON string of the UI in the "App UI" tab
#'
#' @rdname code_module
CodeModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    r_code <- reactive({
      jsonToRScript(ui_code())
    })

    # observeEvent(input$save, {
    #   sink(file = "ui.R")
    #   cat(r_code())
    #   sink()
    # })

    output$code <- renderPrint(cat(r_code()))
  })
}
