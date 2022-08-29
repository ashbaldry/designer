#' Canvas Server Functions
#'
#' @noRd
CanvasModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(c("html", "canvas"))

    onBookmark(function(state) {
      state$values$html <- input$html
      state$values$designer_version <- packageVersion("designer")
    })
    onRestore(function(state) {
      session$sendInputMessage("html", state$values$html)
    })

    return(reactive(input$canvas))
  })
}
