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

componentType <- function(ns) {
  component(
    "type",
    selectInput(
      ns("type"),
      "Input Type",
      NULL
    )
  )
}

componentLabel <- function(ns) {
  component(
    "label",
    textInput(
      ns("label"),
      label = "Label",
      value = "Label"
    )
  )

}

componentID <- function(ns) {
  component(
    "id",
    textInput(
      inputId = ns("id"),
      label = inputLabel(
        "Input ID",
        "<p>ID attribute given to the component, used to get the input value on the server side</p>",
        "<p>Leave blank for a randomly generated ID</p>"
      ),
      value = "",
      placeholder = "Optional"
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

componentTextArea <- function(ns) {
  component(
    "textarea",
    textAreaInput(
      ns("textarea"),
      label = inputLabel(
        "Contents",
        "Add individual list items on separate lines"
      ),
      value = "",
      height = "5rem"
    )
  )
}

componentChoices <- function(ns) {
  component(
    "choices",
    textAreaInput(
      ns("choices"),
      label = "Choices (One Per Line)",
      value = "Choice 1\nChoice 2",
      height = "5rem"
    )
  )
}

componentRange <- function(ns) {
  component(
    "range",
    checkboxInput(
      ns("range"),
      "Ranged Input"
    )
  )
}

componentInline <- function(ns) {
  component(
    "inline",
    checkboxInput(
      ns("inline"),
      "In-Line"
    )
  )
}

componentWidth <- function(ns) {
  component(
    "width",
    textInput(
      inputId = ns("width"),
      label = inputLabel(
        "Width",
        "<p>Either use a specific width (e.g. 400px) or a percentage (e.g. 100%).</p>",
        "<p>If just a number is used, then it will be treated as pixels (px)</p>"
      ),
      value = "",
      placeholder = "Optional"
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
      inputLabel(
        "Offset",
        "The gap between the window/previous column and this column"
      ),
      value = 0,
      min = 0,
      max = 11
    )
  )
}

component <- function(id, ...) {
  div(
    class = "component-settings",
    `data-component` = id,
    ...
  )
}

inputLabel <- function(label, ...) {
  tagList(
    label,
    a(
      class = "help-icon",
      href = "#",
      "data-toggle" = "tooltip",
      "data-html" = "true",
      "?",
      title = paste(...)
    )
  )
}
