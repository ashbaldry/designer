#' Bootstrap Component Settings
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param ns Namespace of the overall module
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @rdname component_settings
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

#' @rdname component_settings
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

