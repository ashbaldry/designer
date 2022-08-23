COMPONENTS <- c(
  "Tab" = "tab_panel",
  "Header" = "header",
  "Tabset Panel" = "tabset",
  "Row" = "row",
  "Column" = "column",
  "Box/Card" = "box",
  "Text" = "text",
  "Callout" = "callout",
  "Blockquote" = "quote",
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
  "User Box" = "user_box",
  "Value Box" = "value_box",
  "Info Box" = "info_box"
)
NAVBAR_COMPONENTS <- "tab_panel"
BS4_COMPONENTS <- c(
  "box", "user_box", "value_box", "info_box",
  "callout", "quote"
)

#' Component Accordion Item
#'
#' @description
#' An item to add to the sidebar that opens up the settings for the selected component
#'
#' @param id HTML ID to namespace on
#' @param name Label to show on the closed accordion
#' @param element Character string to let JS know what component has been chosen
#' @param parent_id HTML ID of the accordion
#' @param ... Option inputs to add when expanding the accordion item
#' @param notes A list of optional notes to include at the bottom of the settings
#' @param active Logical, should the accordion item be open on start? Default set to `FALSE`
#'
#' @return
#' A `shiny.tag` element containing the component accordion item with all input settings
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
          class = "component-form",
          ...
        ),
        if (!is.null(notes)) {
          tagList(
            h3(class = "notes-header", "Notes"),
            tags$ul(
              class = "notes-list",
              lapply(notes, tags$li)
            )
          )
        }
      )
    )
  )
}
