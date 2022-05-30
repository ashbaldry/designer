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
#' @noRd
SidebarModUI <- function(id) {
  ns <- NS(id)

  tagList(
    div(
      id = "component_settings",
      div(
        id = ns("container"),
        class = "container component-container"
      ),
      tags$form(
        class = "component-form",
        componentSettings("tab_panel", tabSettings, ns),
        componentSettings("header", headerSettings, ns),
        componentSettings("row", rowSettings, ns),
        componentSettings("column", columnSettings, ns),
        componentSettings("text", textSettings, ns),
        componentSettings("input_panel", inputPanelSettings, ns),
        componentSettings("dropdown", dropdownSettings, ns),
        componentSettings("input", inputSettings, ns),
        componentSettings("file", fileSettings, ns),
        componentSettings("slider", sliderSettings, ns),
        componentSettings("date", dateSettings, ns),
        componentSettings("checkbox", checkboxSettings, ns),
        componentSettings("radio", radioSettings, ns),
        componentSettings("button", buttonSettings, ns),
        componentSettings("box", boxSettings, ns),
        componentSettings("output", outputSettings, ns),
        br(),
        div(
          class = "component_comments",
          textAreaInput(
            ns("comments"),
            label = inputLabel(
              "Add Code Comment",
              "In this application, this will be available as a tooltip,",
              "however this will also be included in the R script as a comment for reference."
            ),
            placeholder = "Comment included in R script",
            rows = 2
          )
        )
      )
    ),
    div(
      id = "component_delete",
      class = "container bin-container",
      h3(class = "bin-header", icon("trash", "aria-hidden" = "true"), "Drag Here to Delete Item"),
      div(
        class = "sortable-bin",
        id = ns("bin")
      )
    )
  )
}
