#' code UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd
mod_code_ui <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      # actionButton(
      #   ns("save"),
      #   "Save Page"
      # )
    ),
    verbatimTextOutput(ns("code"))
  )
}
