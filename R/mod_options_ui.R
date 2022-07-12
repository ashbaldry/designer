OptionsModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "px-2",
      textInput(
        ns("app_name"),
        label = "Application Title",
        value = "Shiny Application",
        width = "100%"
      ),
      CSSFileInput(
        ns("css_style"),
        label = "Apply CSS Style"
      ),
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
      ),
      tags$button(
        id = ns("preview"),
        type = "button",
        class = "btn btn-secondary btn-block",
        "Preview Full Page"
      ),
      screenshtButton(
        class = "btn-secondary btn-block",
        scale = 1.5
      )
    )
  )
}
