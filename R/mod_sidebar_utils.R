INPUT_TYPES <- c(
  "Text" = "text",
  "Text Area" = "textArea",
  "Numeric" = "numeric",
  "Password" = "password"
)

OUTPUT_TYPES <- c(
  "Text" = "text",
  "Verbatim Text" = "verbatimText",
  "Plot" = "plot",
  "Image" = "image",
  "Table" = "table",
  "HTML" = "html"
)

BUTTON_TYPES <- c(
  "default", "primary", "secondary", "success", "danger", "warning", "info", "light", "dark"
)

#' Bootstrap Component Settings
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @rdname component_settings
column_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Column Settings"),
    numericInput(
      ns("width"),
      "Width",
      value = 3,
      min = 1,
      max = 12
    ),
    numericInput(
      ns("offset"),
      "Offset",
      value = 0,
      min = 0,
      max = 11
    )
  )
}

#' @rdname component_settings
header_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Header Settings"),
    selectInput(
      ns("tag"),
      "HTML Tag",
      c(paste0("h", 1:6), "div")
    ),
    textInput(
      ns("value"),
      "Label",
      "Header"
    )
  )
}

#' @rdname component_settings
button_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Button Settings"),
    selectInput(
      ns("class"),
      "Button Type",
      setNames(BUTTON_TYPES, tools::toTitleCase(BUTTON_TYPES))
    ),
    textInput(
      ns("label"),
      "Label",
      "Button"
    ),
    textInput(
      ns("id"),
      "Input ID",
      ""
    )
  )
}

#' @rdname component_settings
dropdown_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Dropdown Settings"),
    textInput(
      ns("label"),
      "Label",
      "Label"
    ),
    textInput(
      ns("id"),
      "Input ID",
      ""
    )
  )
}

#' @rdname component_settings
input_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Dropdown Settings"),
    selectInput(
      ns("type"),
      "Input Type",
      INPUT_TYPES
    ),
    textInput(
      ns("label"),
      "Label",
      "Label"
    ),
    textInput(
      ns("id"),
      "Input ID",
      ""
    )
  )
}

#' @rdname component_settings
output_settings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Output Settings"),
    selectInput(
      ns("type"),
      "Output Type",
      OUTPUT_TYPES
    ),
    conditionalPanel(
      "input.type !== 'verbatimText'",
      checkboxInput(
        ns("inline"),
        "Inline Output"
      ),
      ns = ns
    ),
    textInput(
      ns("id"),
      "Output ID",
      ""
    ),
    conditionalPanel(
      "['plot', 'image'].includes(input.type)",
      textInput(
        ns("height"),
        "Plot Height",
        "400px"
      ),
      textInput(
        ns("width"),
        "Plot Width",
        "100%"
      ),
      ns = ns
    )
  )
}
