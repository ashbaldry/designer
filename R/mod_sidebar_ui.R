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
        selected = "Header"
      ),
      conditionalPanel(
        id = ns("column_settings"),
        "input.component === 'Column'",
        column_settings(ns),
        ns = ns
      ),
      conditionalPanel(
        id = ns("header_settings"),
        "input.component === 'Header'",
        header_settings(ns),
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

COMPONENTS <- c(
  # "Button",
  "Column",
  "Header",
  # "Image",
  # "Input",
  # "Output",
  "Row"
)
