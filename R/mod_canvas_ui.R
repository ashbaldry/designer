#' Canvas UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
CanvasModUI <- function(id) {
  ns <- NS(id)

  tags$section(
    class = "page-canvas-shell",
    id = ns("html"),
    span(
      class = "page-preview-button",
      screenshtButton(class = "btn-outline-dark"),
      tags$button(
        id = ns("close_preview"),
        class = "btn btn-outline-dark",
        shiny::icon("xmark", "aria-hidden" = "true"),
        "Close Preview"
      )
    ),
    tags$section(
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
      ),
      tags$style(id = ns("style"), type = "text/css")
    ),
    tags$section(
      class = "page-canvas",
      id = ns("canvas")
    ),

    div(
      id = ns("menu"),
      class = "right-click-menu",
      # div(
      #   class = "item",
      #   id = ns("edit"),
      #   shiny::icon("edit"),
      #   "Edit"
      # ),
      div(
        class = "item",
        id = ns("delete"),
        shiny::icon("xmark"),
        "Delete"
      )
    ),

    div(
      class = "canvas-modal",
      id = ns("modal"),
      h3(
        class = "canvas-modal-title",
        "Select Page Type"
      ),
      div(
        class = "canvas-page-choices",
        lapply(seq_along(PAGE_TYPES), createPageItem)
      )
    )
  )
}
