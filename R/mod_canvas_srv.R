#' Canvas Server Functions
#'
#' @noRd
mod_canvas_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    return(reactive(jsonToRScript(input$canvas)))
  })
}
