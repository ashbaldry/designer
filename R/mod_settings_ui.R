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
    settingsDropdownButton(
      id = ns("page_type_button"),
      label = "Page Type",
      contents = pageChoices(ns)
    ),
    settingsDropdownButton(
      id = ns("component_button"),
      label = "Component",
      contents = componentChoices(ns)
    ),
    settingsDropdownButton(
      id = ns("code_button"),
      label = "Code",
      contents = div(
        id = ns("code_dropdown"),
        `aria-labelledby` = ns("code_button"),
        class = "dropdown-menu dropdown-menu-wide clickable-dropdown",
        CodeModUI(ns("code"))
      )
    ),
    settingsDropdownButton(
      id = ns("options_button"),
      label = "Settings",
      contents = div(
        id = ns("options_dropdown"),
        `aria-labelledby` = ns("options_button"),
        class = "dropdown-menu dropdown-menu-wide page-type-dropdown clickable-dropdown",
        OptionsModUI(NULL)
      )
    )
  )
}
