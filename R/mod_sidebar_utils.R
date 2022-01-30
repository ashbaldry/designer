column_settings <- function(ns) {
  tagList(
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
    )
  )
}

header_settings <- function(ns) {
  tagList(
    h5("Header Settings"),
    selectInput(
      ns("header_tag"),
      "HTML Tag",
      c(paste0("h", 1:6), "div")
    ),
    textInput(
      ns("header_value"),
      "Label",
      "Header"
    )
  )
}

