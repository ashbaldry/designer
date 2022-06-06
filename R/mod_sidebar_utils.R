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
      inputId = ns("tag"),
      label = inputLabel(
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
      inputId = ns("type"),
      label = "Type",
      NULL
    )
  )
}

componentPlot <- function(ns) {
  component(
    "plot",
    selectInput(
      inputId = ns("plot"),
      label = "Plot Type",
      c("random", "point", "bar", "boxplot", "col", "tile", "line", "bin2d", "contour", "density",
        "density_2d", "dotplot", "hex", "freqpoly", "histogram", "ribbon", "raster", "tile", "violin")
    )
  )
}

componentLabel <- function(ns) {
  component(
    "label",
    textInput(
      inputId = ns("label"),
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
      inputId = ns("text"),
      label = "Contents",
      placeholder = "Add Text"
    )
  )
}

componentTextArea <- function(ns) {
  component(
    "textarea",
    textAreaInput(
      inputId = ns("textarea"),
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
      inputId = ns("choices"),
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
      inputId = ns("range"),
      label = "Ranged Input"
    )
  )
}

componentInline <- function(ns) {
  component(
    "inline",
    checkboxInput(
      inputId = ns("inline"),
      label = "In-Line"
    )
  )
}

componentDownload <- function(ns) {
  component(
    "download",
    checkboxInput(
      inputId = ns("download"),
      label = "Downloadable"
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

componentHeight <- function(ns) {
  component(
    "height",
    textInput(
      inputId = ns("height"),
      label = inputLabel(
        "Height",
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
      inputId = ns("width_num"),
      label = "Width",
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
      inputId = ns("offset"),
      label = inputLabel(
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
