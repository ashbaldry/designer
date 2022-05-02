#' Canvas Server Functions
#'
#' @noRd
CanvasModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    return(reactive(input$canvas))
  })
}

previewScreenshotSettings <- function(id, canvas_id) {
  ns <- NS(id)
  tagList(
    shinyscreenshot::screenshotButton(
      id = canvas_id,
      label = "PNG",
      scale = 1.0,
      filename = "ui",
      class = "btn btn-info"
    )
  )
}

