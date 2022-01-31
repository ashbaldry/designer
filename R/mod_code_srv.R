#' sidebar Server Functions
#'
#' @noRd
mod_code_server <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    r_code <- reactive({
      jsonToRScript(ui_code())
    })

    observeEvent(input$save, {
      sink(file = "ui.R")
      cat(r_code())
      sink()
    })

    output$code <- renderPrint(cat(r_code()))
  })
}
