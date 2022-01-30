#' sidebar Server Functions
#'
#' @noRd
mod_sidebar_server <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    observeEvent(input$save, {
      sink(file = "ui.R")
      cat(ui_code())
      sink()
    })

  })
}
