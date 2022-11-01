#' Canvas Server Functions
#'
#' @importFrom utils packageVersion
#' @noRd
CanvasModuleServer <- function(id, selected_template) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(c("html", "canvas", "screenshot"))

    observeEvent(selected_template(), {
      session$sendInputMessage("html", selected_template())
    })

    return(list(
      ui_code = reactive(input$canvas),
      html = reactive(input$html)
    ))
  })
}
