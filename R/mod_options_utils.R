screenshotSettings <- function(id, canvas_id) {
  ns <- NS(id)
  tagList(
    h6(icon("save", "aria-hidden" =  "true"), "Screenshot options"),
    shinyscreenshot::screenshotButton(
      id = canvas_id,
      label = "PNG",
      timer = 0,
      scale = 1.5,
      filename = "ui",
      class = "btn btn-secondary btn-block"
    )
  )
}
