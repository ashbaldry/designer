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
