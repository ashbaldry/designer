COMPONENTS <- c(
  "Header" = "header",
  "Row" = "row",
  "Column" = "column",
  "Input Panel" = "input_panel",
  "Dropdown (selectInput)" = "dropdown",
  "Input" = "input",
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
      selectInput(
        ns("page_type"),
        label = "Page Type",
        c("basicPage", "bootstrapPage", "fillPage", "fluidPage")
      ),
      selectInput(
        ns("component"),
        "Component",
        COMPONENTS,
        selected = "header"
      ),
      conditionalPanel(
        id = ns("button_settings"),
        class = "component_settings",
        "input.component === 'button'",
        buttonSettings(ns("button")),
        ns = ns
      ),
      conditionalPanel(
        id = ns("column_settings"),
        class = "component_settings",
        "input.component === 'column'",
        columnSettings(ns("column")),
        ns = ns
      ),
      conditionalPanel(
        id = ns("header_settings"),
        class = "component_settings",
        "input.component === 'header'",
        headerSettings(ns("header")),
        ns = ns
      ),
      conditionalPanel(
        id = ns("dropdown_settings"),
        class = "component_settings",
        "input.component === 'dropdown'",
        dropdownSettings(ns("dropdown")),
        ns = ns
      ),
      conditionalPanel(
        id = ns("input_settings"),
        class = "component_settings",
        "input.component === 'input'",
        inputSettings(ns("input")),
        ns = ns
      ),
      conditionalPanel(
        id = ns("output_settings"),
        class = "component_settings",
        "input.component === 'output'",
        outputSettings(ns("output")),
        ns = ns
      ),
      div(
        id = ns("container"),
        class = "container component-container"
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
  )
}
