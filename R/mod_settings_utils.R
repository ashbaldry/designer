#' Settings Button
#'
#' @param id HTML id selector of the button
#' @param label Label to show on the button
#' @param contents \code{\link[shiny]{tagList}} to show when clicking the button
#'
#' @noRd
settingsDropdownButton <- function(id, label, contents) {
  div(
    class = "col px-2",
    div(
      tags$button(
        id = id,
        type = "button",
        class = "btn btn-block btn-secondary dropdown-toggle",
        `data-toggle` = "dropdown",
        `aria-expanded` = "false",
       label
      ),
      contents
    )
  )
}

PAGE_TYPES <- c(
  "Basic Page" = "basicPage",
  "Standard Page" = "bootstrapPage",
  "Fill Page" = "fillPage",
  "Fluid Page" = "fluidPage",
  "Navigation Bar Page" = "navbarPage",
  "Dashboard Page" = "dashboardPage"
)

pageChoices <- function(ns) {
  div(
    `aria-labelledby` = ns("page_type_button"),
    class = "dropdown-menu dropdown-menu-right dropdown-menu-wide page-type-dropdown clickable-dropdown",
    tags$form(
      class = "px-2",
      div(
        class = "form-group",
        id = ns("page_type"),
        lapply(names(PAGE_TYPES), function(page) {
          x <- PAGE_TYPES[[page]]
          div(
            class = "form-check",
            tags$input(
              class = "form-check-input",
              type = "radio",
              id = ns(x),
              name = "page_types",
              value = x,
              checked = if (x == "fluidPage") NA else NULL
            ),
            tags$label(
              class = "form-check-label",
              `for` = ns(x),
              page
            )
          )
        })
      )
    )
  )
}

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

componentChoices <- function(ns) {
  div(
    id = ns("component"),
    `aria-labelledby` = ns("component_button"),
    class = "dropdown-menu dropdown-menu-right dropdown-menu-wide component-type-dropdown",
    lapply(names(COMPONENTS), function(component) {
      first_item <- COMPONENTS[[component]] == "header"
      comp <- COMPONENTS[[component]]

      if (comp %in% BS4_COMPONENTS) {
        extra_class <- "bs4-item"
      } else if (comp %in% NAVBAR_COMPONENTS) {
        extra_class <- "component-item navbar-tab-item"
      } else {
        extra_class <- "component-item"
      }

      tags$a(
        class = paste("dropdown-item", extra_class, if (first_item) "active" else ""),
        `data-shinyelement` = comp,
        name = comp,
        component
      )
    })
  )
}
