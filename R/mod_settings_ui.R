#' Canvas UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
SettingsModUI <- function(id) {
  ns <- NS(id)

  div(
    class = "row settings-row row-cols-4",
    div(
      class = "col",
      div(
        tags$button(
          id = ns("page_type_button"),
          type = "button",
          class = "btn btn-block btn-secondary dropdown-toggle",
          `data-toggle` = "dropdown",
          `aria-expanded` = "false",
          "Page Type"
        ),
        pageChoices(ns)
      )
    ),

    div(
      class = "col",
      div(
        tags$button(
          id = ns("component_button"),
          type = "button",
          class = "btn btn-block btn-secondary dropdown-toggle",
          `data-toggle` = "dropdown",
          `aria-expanded` = "false",
          "Component"
        ),
        componentChoices(ns)
      )
    )
  )
}