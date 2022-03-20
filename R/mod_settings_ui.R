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
    ),

    div(
      class = "col",
      div(
        tags$button(
          id = ns("code_button"),
          type = "button",
          class = "btn btn-block btn-secondary dropdown-toggle",
          `data-toggle` = "dropdown",
          `aria-expanded` = "false",
          "Code"
        ),
        div(
          id = ns("code_dropdown"),
          `aria-labelledby` = ns("code_button"),
          class = "dropdown-menu dropdown-menu-wide",
          CodeModUI(ns("code"))
        )
      )
    ),

    div(
      class = "col",
      div(
        tags$button(
          id = ns("about_button"),
          type = "button",
          class = "btn btn-block btn-secondary",
          `aria-expanded` = "false",
          "About"
        )
      )
    )
  )
}
