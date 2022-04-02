OptionsModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "px-2",
      checkboxInput(
        ns("remove_label"),
        label = "Remove Component Labels"
      ),
      checkboxInput(
        ns("remove_colour"),
        label = "Remove Colour Background"
      ),
      checkboxInput(
        ns("remove_border"),
        label = "Remove Borders"
      )
    )
  )
}
