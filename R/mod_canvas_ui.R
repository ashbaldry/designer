#' Canvas UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
CanvasModUI <- function(id) {
  ns <- NS(id)

  div(
    class = "page-canvas-shell",
    span(
      class = "page-preview-button",
      shinyscreenshot::screenshotButton(
        id = "canvas-page",
        label = "Snapshot UI",
        filename = "ui_wireframe",
        class = "btn-info"
      ),
      tags$button(
        id = ns("close_preview"),
        class = "btn btn-info",
        icon("times", "aria-hidden" = "true"),
        "Close Preview"
      )
    ),
    div(
      class = "page-canvas-header",
      tags$svg(
        xmlns = "http://www.w3.org/2000/svg",
        width = "64",
        height = "14",
        viewBox = "0 0 64 14",
        tags$g(
          fill = "none",
          `fill-rule` = "evenodd",
          transform = "translate(1 1)",
          safari_circle("16", "#FF5F56", "#E0443E"),
          safari_circle("36", "#FFBD2E", "#DEA123"),
          safari_circle("56", "#27C93F", "#1AAB29")
        )
      ),
      div(
        id = ns("title"),
        class = "page-canvas-title",
        "Shiny Application"
      )
    ),
    div(
      class = "page-canvas",
      id = ns("canvas")
    )
  )
}

safari_circle <- function(cx, fill, stroke) {
  tags$circle(
    cx = cx,
    cy = "5",
    r = "6",
    fill = fill,
    stroke = stroke,
    `stroke-width` = ".5"
  )
}
