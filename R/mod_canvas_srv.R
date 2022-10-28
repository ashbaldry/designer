#' Canvas Server Functions
#'
#' @importFrom utils packageVersion
#' @noRd
CanvasModuleServer <- function(id, selected_template) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(c("html", "canvas"))

    onBookmark(function(state) {
      state$values$html <- input$html
      state$values$designer_version <- packageVersion("designer")
    })
    onRestore(function(state) {
      session$sendInputMessage("html", state$values$html)
    })

    observeEvent(selected_template(), {
      session$sendInputMessage("html", selected_template())
    })

    return(list(
      ui_code = reactive(input$canvas),
      html = reactive(input$html)
    ))
  })
}
