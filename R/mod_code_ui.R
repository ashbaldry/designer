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
#' @rdname code_module
mod_code_ui <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      # actionButton(
      #   ns("save"),
      #   "Save Page"
      # )
    ),
    verbatimTextOutput(ns("code"), placeholder = TRUE)
  )
}
