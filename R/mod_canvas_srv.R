#' Canvas Server Functions
#'
#' @noRd
CanvasModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    return(reactive(input$canvas))
  })
}
