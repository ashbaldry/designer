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
    div(
      class = "btn-group",
      tags$button(
        id = ns("page_type_button"),
        type = "button",
        class = "btn btn-secondary dropdown-toggle",
        `data-toggle` = "dropdown",
        `aria-expanded` = "false",
        "Page Type"
      ),
      pageSettings(ns)
    ),

    div(
      class = "btn-group",
      tags$button(
        id = ns("page_type_button"),
        type = "button",
        class = "btn btn-secondary dropdown-toggle",
        `data-toggle` = "dropdown",
        `aria-expanded` = "false",
        "Component"
      )
    )
  )
}
