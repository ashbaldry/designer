#' Bootstrap Component Inputs
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param ns Namespace to include the component
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @seealso \code{\link{component}}
#'
#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
componentValue <- function(ns) {
  component(
    "value",
    textInput(
      inputId = ns("value"),
      label = "Value",
      value = "Value"
    )
  )
}

#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
componentIcon <- function(ns) {
  component(
    "icon",
    htmltools::tagAppendAttributes(
      selectizeInput(
        inputId = ns("icon"),
        label = "Icon",
        choices = c("Optional" = ""),
        options = list(
          render = I("{
            item: function(item, escape) { return '<div class=\"item icon-option\">' + item.label + '</div>'; },
            option: function(item, escape) { return '<div class=\"option icon-option\">' + item.label + '</div>'; }
          }")
        )
      ),
      class = "icon-choices"
    )
  )
}

#' @rdname component_input
componentColour <- function(ns) {
  component(
    "colour",
    selectInput(
      ns("colour"),
      "Colour",
      bs4Dash::getAdminLTEColors(),
      "white"
    )
  )
}

#' @rdname component_input
componentBackground <- function(ns) {
  component(
    "background",
    selectInput(
      ns("background"),
      "Background Colour",
      bs4Dash::getAdminLTEColors(),
      "white"
    )
  )
}

#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
componentRange <- function(ns) {
  component(
    "range",
    checkboxInput(
      inputId = ns("range"),
      label = "Ranged Input"
    )
  )
}

#' @rdname component_input
componentInline <- function(ns) {
  component(
    "inline",
    checkboxInput(
      inputId = ns("inline"),
      label = "In-Line"
    )
  )
}

#' @rdname component_input
componentDownload <- function(ns) {
  component(
    "download",
    checkboxInput(
      inputId = ns("download"),
      label = "Downloadable"
    )
  )
}

#' @rdname component_input
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

#' @rdname component_input
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

#' @rdname component_input
componentWidthNum <- function(ns) {
  component(
    "width_num",
    numericInput(
      inputId = ns("width_num"),
      label = "Width",
      value = 3,
      min = 0,
      max = 12
    )
  )
}

#' @rdname component_input
componentOffset <- function(ns) {
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

#' Component Settings Shell
#'
#' @description
#' A container for the specified component input
#'
#' @param id The ID of the component input
#' @param ... Shiny tags to include inside the component
#'
#' @return A shiny.tag of the compoenent settings
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

#' @details
#' The tab component contains a selection of specific inputs related to adding a new tab, as
#' the events to create it in the UI are different to the other components
#'
#' @rdname component
componentTab <- function(ns) {
  tagList(
    h2(class = "tab-title", "Tab Panel Settings"),
    textInput(
      ns("tab_name"),
      label = "Name",
      value = "Tab 1"
    ),
    textInput(
      ns("tab_value"),
      label = inputLabel(
        "Value",
        "Used to reference switching the tab, or changing visibility of the tab on the server"
      ),
      placeholder = "Keep blank to copy name"
    ),
    htmltools::tagAppendAttributes(
      selectizeInput(
        inputId = ns("tab_icon"),
        label = "Icon",
        choices = c("Optional" = ""),
        options = list(
          render = I("{
            item: function(item, escape) { return '<div class=\"item icon-option\">' + item.label + '</div>'; },
            option: function(item, escape) { return '<div class=\"option icon-option\">' + item.label + '</div>'; }
          }")
        )
      ),
      class = "icon-choices"
    ),
    tags$button(
      id = ns("tab_add"),
      type = "button",
      class = "btn btn-success action-button",
      "Add Tab"
    ),
    tags$button(
      id = ns("tab_delete"),
      type = "button",
      class = "btn btn-danger action-button",
      "Delete Tab"
    ),
    br(),
    br(),
    div(
      id = ns("tab_alert")
    )
  )
}

getFAIcons <- function() {
  setNames(
    fa_tbl$name,
    paste0(
      "<i class='", ifelse(fa_tbl$name %in% fa_brands, "fab", "fa"), " fa-", fa_tbl$name, "' aria-hidden='true'></i>",
      fa_tbl$label
    )
  )
}

fa_tbl <- getFromNamespace("fa_tbl", "fontawesome")
fa_brands <- getFromNamespace("font_awesome_brands", "fontawesome")
