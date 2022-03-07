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
    class = "page-canvas",
    id = ns("canvas")
  )
}
