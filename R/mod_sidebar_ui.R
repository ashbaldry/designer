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
        COMPONENTS
      ),
      actionButton(
        ns("create"),
        class = "create-button",
        "Create Item"
      ),
      div(
        class = "container component-container"
      ),
      actionButton(
        ns("save"),
        "Save Page"
      )
    )
  )
}

COMPONENTS <- c(
  "Button",
  "Column",
  "Header",
  "Image",
  "Input",
  "Output",
  "Row"
)
