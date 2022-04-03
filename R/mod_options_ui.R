OptionsModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "px-2",
      checkboxInput(
        ns("remove_label"),
        label = "Show Component Labels",
        value = TRUE
      ),
      checkboxInput(
        ns("remove_colour"),
        label = "Show Colour Background",
        value = TRUE
      ),
      checkboxInput(
        ns("remove_border"),
        label = "Show Borders",
        value = TRUE
      )
    )
  )
}
