#' Input Label
#'
#' @description
#' Standard label that is used for inputs, but with the added inclusion of a help tooltip icon
#'
#' @param label String to see in the UI
#' @param ... HTML to include in the tooltip
#'
#' @return HTML of the label
#'
#' @noRd
widthInput <- function(id, value = "", placeholder = "Optional") {}

#' Bootstrap Component Settings
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @noRd
tabSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Tab Panel Settings"),
    textInput(
      ns("name"),
      label = "Name",
      value = "Tab 1"
    ),
    textInput(
      ns("value"),
      label = inputLabel(
        "Value",
        "Used to reference switching the tab, or changing visibility of the tab on the server"
      ),
      placeholder = "Keep blank to copy name"
    ),
    tags$button(
      id = ns("add"),
      type = "button",
      class = "btn btn-success action-button",
      "Add Tab"
    ),
    tags$button(
      id = ns("delete"),
      type = "button",
      class = "btn btn-danger action-button",
      "Delete Tab"
    )
  )
}

boxSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Box Settings"),
    labelInput(ns("label")),
    selectInput(
      ns("colour"),
      "Colour",
      bs4Dash::getAdminLTEColors(),
      "white"
    ),
    selectInput(
      ns("background"),
      "Background Colour",
      bs4Dash::getAdminLTEColors(),
      "white"
    ),
    numericInput(
      ns("width"),
      "Width",
      value = 6,
      min = 0,
      max = 12
    ),

    tags$br(),
    h3("Notes"),
    tags$ul(
      tags$li("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows")),
      tags$li(
        "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line"
      )
    )
  )
}

valueBoxSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Value Box Settings"),
    textInput(
      ns("value"),
      label = "Value",
      value = "-"
    ),
    textInput(
      ns("subtitle"),
      label = "Subtitle"
    ),
    selectInput(
      ns("colour"),
      "Background Colour",
      bs4Dash::getAdminLTEColors(),
      "white"
    ),
    numericInput(
      ns("width"),
      "Width",
      value = 3,
      min = 0,
      max = 12
    ),

    tags$br(),
    h3("Notes"),
    tags$ul(
      tags$li("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows")),
      tags$li(
        "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line"
      )
    )
  )
}
