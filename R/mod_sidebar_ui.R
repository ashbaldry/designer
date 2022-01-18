#' sidebar UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
mod_sidebar_ui <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      selectInput(
        ns("page_type"),
        label = "Page Type",
        c("basicPage", "bootstrapPage", "fillPage", "fluidPage")
      ),
      selectInput(
        ns("component"),
        "Component",
        c("")
      )
    )
  )
}
