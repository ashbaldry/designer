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

heightInput <- function(id, value = "") {
  textInput(
    inputId = id,
    label = inputLabel(
      "Height",
      "<p>Either use a specific width (e.g. 400px) or a percentage (e.g. 100%).</p>",
      "<p>If just a number is used, then it will be treated as pixels (px)</p>"
    ),
    value = value
  )
}

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

sliderSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Slider Settings"),
    labelInput(ns("label")),
    idInput(ns("id")),
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
    widthInput(ns("width")),

    tags$br(),
    h3("Notes:"),
    tags$ul(
      tags$li("To position several inputs horizontally, they must be put within an input panel")
    )
  )
}

checkboxSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Checkbox Settings"),
    labelInput(ns("label")),
    idInput(ns("id")),
    checkboxInput(
      ns("checked"),
      label = "Checked"
    ),
    widthInput(ns("width"))
  )
}

radioSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Radio Button Settings"),
    radioButtons(
      ns("type"),
      label = "Button Type",
      choices = RADIO_BUTTON_TYPES,
      selected = "radio",
      inline = TRUE
    ),
    labelInput(ns("label")),
    idInput(ns("id")),
    textAreaInput(
      ns("choices"),
      label = "Choices (One Per Line)",
      value = "Choice 1\nChoice 2",
      height = "5rem"
    ),
    checkboxInput(
      ns("inline"),
      label = "Inline"
    ),
    widthInput(ns("width"))
  )
}

buttonSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Button Settings"),
    selectInput(
      ns("class"),
      "Button Type",
      setNames(BUTTON_TYPES, tools::toTitleCase(BUTTON_TYPES))
    ),
    labelInput(ns("label")),
    idInput(ns("id")),
    checkboxInput(
      ns("download"),
      "Download Button"
    ),
    widthInput(ns("width"))
  )
}

outputSettings <- function(id) {
  ns <- NS(id)

  tagList(
    h2("Output Settings"),
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
        height = "5rem"
      )
    ),
    conditionalPanel(
      "['plot', 'image'].includes(input.type)",
      ns = ns,
      heightInput(
        ns("height"),
        value = "400px"
      ),
      widthInput(
        ns("width"),
        value = "100%",
        placeholder = ""
      )
    ),

    tags$br(),
    h3("Notes"),
    tags$ul(
      tags$li("Plot and image output will show area of plot, but image will not stretch to fit")
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
