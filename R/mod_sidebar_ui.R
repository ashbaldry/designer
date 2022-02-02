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
#' @rdname create_bscomp_module
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
      # conditionalPanel(
      #   id = ns("header_settings"),
      #   "input.component === 'Header'",
      #   header_settings(ns),
      #   ns = ns
      # ),
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
  # "Header",
  # "Image",
  # "Input",
  # "Output",
  "Row"
)
