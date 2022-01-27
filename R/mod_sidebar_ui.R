#' sidebar UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
mod_sidebar_ui <- function(id) {
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
        selected = "Row"
      ),
      conditionalPanel(
        id = ns("column_settings"),
        "input.component === 'Column'",
        h5("Column Settings"),
        numericInput(
          ns("column_width"),
          "Width",
          value = 3,
          min = 1,
          max = 12
        ),
        numericInput(
          ns("column_offset"),
          "Offset",
          value = 0,
          min = 0,
          max = 11
        ),
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
      ),
      actionButton(
        ns("save"),
        "Save Page"
      )
    )
  )
}

COMPONENTS <- c(
  # "Button",
  "Column",
  # "Header",
  # "Image",
  # "Input",
  # "Output",
  "Row"
)
