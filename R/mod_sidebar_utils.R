#' Bootstrap Component Inputs
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @noRd
component <- function(id, ...) {
  div(
    class = "component-settings",
    `data-component` = id,
    ...
  )
}

componentTag <- function(ns) {
  component(
    "tag",
    selectInput(
      ns("tag"),
      inputLabel(
        "HTML Tag",
        "The size of the header will reduce as the number increases. Use sequentially for best user experience."
      ),
      NULL
    )
  )
}

componentText <- function(ns) {
  component(
    "text",
    textInput(
      ns("text"),
      "Contents",
      placeholder = "Add Text"
    )
  )
}

componentWidthNum = function(ns) {
  component(
    "width_num",
    numericInput(
      ns("width_num"),
      "Width",
      value = 3,
      min = 1,
      max = 12
    )
  )
}

componentOffset = function(ns) {
  component(
    "offset",
    numericInput(
      ns("offset"),
      "Offset",
      value = 0,
      min = 0,
      max = 11
    )
  )
}

