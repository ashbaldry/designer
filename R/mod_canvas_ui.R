#' Canvas UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
mod_canvas_ui <- function(id) {
  ns <- NS(id)

  div(
    class = "canvas",
    id = ns("canvas")
  )
}
