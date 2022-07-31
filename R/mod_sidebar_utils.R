COMPONENTS <- c(
  "Tab" = "tab_panel",
  "Header" = "header",
  "Row" = "row",
  "Column" = "column",
  "Box/Card" = "box",
  "Text" = "text",
  "Input Panel" = "input_panel",
  "Dropdown (selectInput)" = "dropdown",
  "Input" = "input",
  "Slider" = "slider",
  "File Input" = "file",
  "Calendar (dateInput)" = "date",
  "Checkbox" = "checkbox",
  "Radio Buttons" = "radio",
  "Button" = "button",
  "Output" = "output",
  "Value Box" = "value_box"
)
NAVBAR_COMPONENTS <- "tab_panel"
BS4_COMPONENTS <- c("box", "value_box")

#' Component Accordion Item
#'
#' @description
#' An item to add to the sidebar that opens up the settings for the selected component
sidebarItem <- function(id, name, element, parent_id, ..., notes = NULL, active = FALSE) {
  ns <- NS(id)

  if (element %in% BS4_COMPONENTS) {
    extra_class <- "bs4-item"
  } else if (element %in% NAVBAR_COMPONENTS) {
    extra_class <- "navbar-tab-item"
  } else {
    extra_class <- ""
  }

  div(
    class = paste("card", extra_class),
    div(
      id = ns("header"),
      class = "card-header",

      h2(
        class = "m-0",

        tags$button(
          class = paste("btn btn-link btn-block text-left", if (!active) "collapsed"),
          type = "button",
          `data-shinyelement` = element,
          `data-toggle` = "collapse",
          `data-target` = paste0("#", ns("body")),
          `aria-expanded` = tolower(active),
          `aria-controls` = ns("body"),
          name
        )
      )
    ),
    div(
      id = ns("body"),
      class = paste("collapse", if (active) "show"),
      `aria-labelledby` = ns("header"),
      `data-parent` = paste0("#", parent_id),

      div(
        class = "card-body",
        tags$form(
          id = ns("form"),
          ...
        ),
        if (!is.null(notes)) {
          tagList(
            h3("Notes"),
            tags$ul(
              lapply(notes, tags$li)
            )
          )
        }
      )
    )
  )
}
