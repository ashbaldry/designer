TEXT_TAGS <- c(
  "Paragraph <p>" = "p",
  "Ordered List <ol>" = "ol",
  "Unordered List <ul>" = "ul"
)

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
columnSettings <- function(id) {
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
    ),

    tags$br(),
    h6("Notes"),
    tags$ul(
      tags$li("Columns can only be included in rows")
    )
  )
}

#' @rdname component_settings
rowSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h6("Notes:"),
    tags$ul(
      tags$li("The only component that can be a direct child of a row are columns")
    )
  )
}

#' @rdname component_settings
headerSettings <- function(id) {
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
textSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Text Settings"),
    selectInput(
      ns("type"),
      label = "HTML Tag",
      choices = TEXT_TAGS
    ),
    textAreaInput(
      ns("contents"),
      label = "Contents",
      value = "",
      width = "100%",
      height = "5rem"
    )
  )
}

#' @rdname component_settings
inputSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Dropdown Settings"),
    selectInput(
      ns("type"),
      label = "Input Type",
      choices = INPUT_TYPES
    ),
    textInput(
      ns("label"),
      label = "Label",
      value = "Label"
    ),
    textInput(
      ns("id"),
      label = "Input ID",
      value = ""
    ),

    tags$br(),
    h6("Notes:"),
    tags$ul(
      tags$li("To position several inputs horizontally, they must be put within an input panel")
    )
  )
}

#' @rdname component_settings
dropdownSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Dropdown Settings"),
    textInput(
      ns("label"),
      label = "Label",
      value = "Label"
    ),
    textInput(
      ns("id"),
      label = "Input ID",
      value = ""
    ),
    textInput(
      ns("width"),
      label = "Width",
      value = "",
      placeholder = "Optional"
    ),

    tags$br(),
    h6("Notes:"),
    tags$ul(
      tags$li("To position several inputs horizontally, they must be put within an input panel")
    )
  )
}

#' @rdname component_settings
buttonSettings <- function(id) {
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
      label = "Label",
      value = "Button"
    ),
    textInput(
      ns("id"),
      label = "Input ID",
      value = ""
    ),
    textInput(
      ns("width"),
      label = "Width",
      value = "",
      placeholder = "Optional"
    )
  )
}

#' @rdname component_settings
outputSettings <- function(id) {
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
      ns = ns,
      checkboxInput(
        ns("inline"),
        "Inline Output"
      )
    ),
    textInput(
      ns("id"),
      "Output ID",
      ""
    ),
    conditionalPanel(
      "['plot', 'image'].includes(input.type)",
      ns = ns,
      textInput(
        ns("height"),
        "Plot Height",
        "400px"
      ),
      textInput(
        ns("width"),
        "Plot Width",
        "100%"
      )
    )
  )
}
