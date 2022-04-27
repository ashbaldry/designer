#' Template Code Module
#'
#' @description
#' Module showing the user the R code required to create the UI on the "App UI" tab.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI and server code to display selected HTML elements
#'
#' @noRd
CodeModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "code-ui-form",
      tags$button(
        class = "copy-ui-button btn btn-default",
        icon("copy"),
        "Copy"
      ),
      if (interactive()) {
        actionButton(
          ns("save"),
          "Save To ui.R",
          icon("save")
        )
      } else {
        downloadButton(
          ns("download")
        )
      }
    ),
    tagAppendAttributes(
      verbatimTextOutput(ns("code"), placeholder = TRUE),
      class = "code-output"
    )
  )
}
