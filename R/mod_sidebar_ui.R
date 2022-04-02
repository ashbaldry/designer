COMPONENTS <- c(
  "Header" = "header",
  "Row" = "row",
  "Column" = "column",
  "Text" = "text",
  "Input Panel" = "input_panel",
  "Dropdown (selectInput)" = "dropdown",
  "Input" = "input",
  "Checkbox" = "checkbox",
  "Radio Buttons" = "radio",
  "Button" = "button",
  "Output" = "output"
)

#' Bootstrap Component Creation Module
#'
#' @description
#' A shiny module that creates Bootstrap components to drag into the App UI canvas for the wire-framing
#' of shiny applications.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI and server code to display options to create
#'
#' @rdname sidebar_module
SidebarModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      div(
        id = ns("container"),
        class = "container component-container"
      ),
      div(
        class = "component_settings",
        `data-component` = "header",
        headerSettings(ns("header"))
      ),
      div(
        class = "component_settings",
        `data-component` = "row",
        rowSettings()
      ),
      div(
        class = "component_settings",
        `data-component` = "column",
        columnSettings(ns("column"))
      ),
      div(
        class = "component_settings",
        `data-component` = "text",
        textSettings(ns("text"))
      ),
      div(
        class = "component_settings",
        `data-component` = "dropdown",
        dropdownSettings(ns("dropdown"))
      ),
      div(
        class = "component_settings",
        `data-component` = "input",
        inputSettings(ns("input"))
      ),
      div(
        class = "component_settings",
        `data-component` = "checkbox",
        checkboxSettings(ns("checkbox"))
      ),
      div(
        class = "component_settings",
        `data-component` = "radio",
        radioSettings(ns("radio"))
      ),
      div(
        class = "component_settings",
        `data-component` = "button",
        buttonSettings(ns("button"))
      ),
      div(
        class = "component_settings",
        `data-component` = "output",
        outputSettings(ns("output"))
      )
    ),
    div(
      class = "container bin-container",
      h6(class = "bin-header", icon("trash"), "Drag Here to Delete Item"),
      div(
        class = "sortable-bin",
        id = ns("bin")
      )
    )
  )
}
