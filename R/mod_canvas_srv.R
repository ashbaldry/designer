#' Canvas Server Functions
#'
#' @noRd
CanvasModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    return(reactive(input$canvas))
  })
}
