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

SLIDER_TYPES <- c(
  "Numeric" = "number",
  "Date" = "date",
  "Timestamp" = "datetime"
)

RADIO_BUTTON_TYPES <- c(
  "Radio" = "radio",
  "Checkbox" = "checkbox"
)

OUTPUT_TYPES <- c(
  "Text" = "text",
  "Verbatim Text" = "verbatimText",
  "Plot" = "plot",
  "Image" = "image",
  "Table" = "table",
  "HTML" = "html"
)

PLOT_TYPES <- c(
  "random", "point", "bar", "boxplot", "col", "tile", "line",
  "bin2d", "contour", "density", "density_2d", "dotplot", "hex", "freqpoly", "histogram",
  "ribbon", "raster", "tile", "violin"
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
#' @noRd
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

rowSettings <- function() {
  tagList(
    h6("Notes:"),
    tags$ul(
      tags$li("The only component that can be a direct child of a row are columns"),
      tags$li(
        "By default, a row will have no height and is determined by the contents inside.",
        "To easily drop elements into the rows, they have a minimum height of 50px in this app"
      )
    )
  )
}

tabSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Tab Panel Settings"),
    textInput(
      ns("name"),
      label = "Name",
      value = "Tab 1"
    ),
    textInput(
      ns("value"),
      label = "Value",
      placeholder = "Keep blank to copy name"
    ),
    actionButton(
      ns("add"),
      label = "Add Tab",
      class = "btn-success"
    ),
    actionButton(
      ns("delete"),
      label = "Delete Tab",
      class = "btn-error"
    ),
    div(
      id = ns("alert"),
      class = "tab-alert"
    )
  )
}

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
    ),

    tags$br(),
    h6("Notes"),
    tags$ul(
      tags$li("Add individual list items on separate lines")
    )
  )
}

inputSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Input Settings"),
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

fileSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("File Input Settings"),
    textInput(
      ns("label"),
      label = "Label",
      value = "File Input"
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

sliderSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Slider Settings"),
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
    selectInput(
      ns("type"),
      label = "Input Type",
      choices = SLIDER_TYPES,
      selected = "number"
    ),
    checkboxInput(
      ns("range"),
      "Ranged Slider"
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

dateSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Date Settings"),
    textInput(
      ns("label"),
      label = "Label",
      value = "Date Input"
    ),
    textInput(
      ns("id"),
      label = "Input ID",
      value = ""
    ),
    checkboxInput(
      ns("range"),
      "Date Range"
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

checkboxSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Checkbox Settings"),
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
    checkboxInput(
      ns("checked"),
      label = "Checked"
    ),
    textInput(
      ns("width"),
      label = "Width",
      value = "",
      placeholder = "Optional"
    )
  )
}

radioSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h5("Radio Button Settings"),
    radioButtons(
      ns("type"),
      label = "Button Type",
      choices = RADIO_BUTTON_TYPES,
      selected = "radio",
      inline = TRUE
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
    textAreaInput(
      ns("choices"),
      label = "Choices (One Per Line)",
      value = "Choice 1\nChoice 2",
      width = "100%",
      height = "5rem"
    ),
    checkboxInput(
      ns("inline"),
      label = "Inline"
    ),
    textInput(
      ns("width"),
      label = "Width",
      value = "",
      placeholder = "Optional"
    )
  )
}

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
      "input.type === 'plot'",
      ns = ns,
      selectInput(
        ns("plot"),
        "Plot Type",
        PLOT_TYPES
      )
    ),
    conditionalPanel(
      "!['table', 'verbatimText'].includes(input.type)",
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
      "['text', 'verbatimText', 'html'].includes(input.type)",
      ns = ns,
      textAreaInput(
        ns("contents"),
        label = "Contents",
        value = "",
        width = "100%",
        height = "5rem"
      )
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
    ),

    tags$br(),
    h6("Notes"),
    tags$ul(
      tags$li("Plot and image output will show area of plot, but image will not stretch to fit")
    )
  )
}
