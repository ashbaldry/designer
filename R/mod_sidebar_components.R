#' Bootstrap Component Inputs
#'
#' @description
#' A way to be able to adjust components so that can more easily visualise how the shiny application will look.
#'
#' @param id Namespace to include the component
#' @param choices A vector of potential choices to include in the component
#'
#' @return A \code{shiny.tag.list} of settings specific to the selected component
#'
#' @seealso \code{\link{component}}
#'
#' @rdname component_setting
compSettingTag <- function(id, choices = NULL) {
  ns <- NS(id)

  component(
    "tag",
    selectInput(
      inputId = ns("tag"),
      label = inputLabel(
        "HTML Tag",
        "The size of the header will reduce as the number increases. Use sequentially for best user experience."
      ),
      choices,
      selected = choices[1]
    )
  )
}

#' @rdname component_setting
compSettingType <- function(id, choices) {
  ns <- NS(id)

  component(
    "type",
    selectInput(
      inputId = ns("type"),
      label = "Type",
      choices,
      selected = choices[1]
    )
  )
}

#' @rdname component_setting
compSettingPlot <- function(id) {
  ns <- NS(id)

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

#' @rdname component_setting
compSettingValue <- function(id) {
  ns <- NS(id)

  component(
    "value",
    textInput(
      inputId = ns("value"),
      label = "Value",
      value = "Value"
    )
  )
}

#' @param label Label of the input
#' @param optional Logical, is the input optional?
#' @rdname component_setting
compSettingLabel <- function(id, label = "Label", optional = FALSE) {
  ns <- NS(id)

  component(
    "label",
    textInput(
      inputId = ns("label"),
      label = label,
      value = if (optional) "" else label,
      placeholder = if (optional) "Optional" else NULL
    )
  )
}

#' @rdname component_setting
compSettingID <- function(id) {
  ns <- NS(id)

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

#' @rdname component_setting
compSettingIcon <- function(id) {
  ns <- NS(id)

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
          }"),
          maxOptions = 3000
        )
      ),
      class = "icon-choices"
    )
  )
}

#' @param status Logical, are only status colours allowed, default is `FALSE`
#' @rdname component_setting
compSettingColour <- function(id, status = FALSE) {
  ns <- NS(id)

  if (status) {
    colours <- c("warning", "danger", "info", "success")
    selected <- "info"
  } else {
    colours <- bs4Dash::getAdminLTEColors()
    selected <- "white"
  }

  component(
    "colour",
    selectInput(
      ns("colour"),
      "Colour",
      colours,
      selected
    )
  )
}

#' @rdname component_setting
compSettingBackground <- function(id) {
  ns <- NS(id)

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

#' @rdname component_setting
compSettingFill <- function(id, label = "Fill Whole Box") {
  ns <- NS(id)

  component(
    "fill",
    checkboxInput(
      ns("fill"),
      label
    )
  )
}

#' @rdname component_setting
compSettingText <- function(id, value = NULL) {
  ns <- NS(id)

  component(
    "text",
    textInput(
      inputId = ns("text"),
      label = "Contents",
      placeholder = "Add Text",
      value = value
    )
  )
}

#' @rdname component_setting
compSettingTextArea <- function(id) {
  ns <- NS(id)

  component(
    "textarea",
    textAreaInput(
      inputId = ns("textarea"),
      label = inputLabel(
        "Contents",
        "Add individual list items on separate lines"
      ),
      value = "",
      height = "5rem",
      width = "100%"
    )
  )
}

#' @rdname component_setting
compSettingChoices <- function(id) {
  ns <- NS(id)

  component(
    "choices",
    textAreaInput(
      inputId = ns("choices"),
      label = "Choices (One Per Line)",
      value = "Choice 1\nChoice 2",
      height = "5rem",
      width = "100%"
    )
  )
}

#' @rdname component_setting
compSettingRange <- function(id) {
  ns <- NS(id)

  component(
    "range",
    checkboxInput(
      inputId = ns("range"),
      label = "Ranged Input"
    )
  )
}

#' @rdname component_setting
compSettingInline <- function(id) {
  ns <- NS(id)

  component(
    "inline",
    checkboxInput(
      inputId = ns("inline"),
      label = "In-Line"
    )
  )
}

#' @rdname component_setting
compSettingDownload <- function(id) {
  ns <- NS(id)

  component(
    "download",
    checkboxInput(
      inputId = ns("download"),
      label = "Downloadable"
    )
  )
}

#' @rdname component_setting
compSettingWidth <- function(id) {
  ns <- NS(id)

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

#' @rdname component_setting
compSettingHeight <- function(id) {
  ns <- NS(id)

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

#' @rdname component_setting
compSettingWidthNum <- function(id, value = 3, min = 1) {
  ns <- NS(id)

  component(
    "width_num",
    numericInput(
      inputId = ns("width_num"),
      label = "Width",
      value = value,
      min = min,
      max = 12
    )
  )
}

#' @rdname component_setting
compSettingOffset <- function(id) {
  ns <- NS(id)

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
componentTab <- function(id) {
  ns <- NS(id)

  tagList(
    tags$fieldset(
      div(
        class = "tab-settings",
        textInput(
          ns("name"),
          label = "Name",
          value = "Tab 1"
        )
      ),
      div(
        class = "tab-settings",
        textInput(
          ns("value"),
          label = inputLabel(
            "Value",
            "Used to reference switching the tab, or changing visibility of the tab on the server"
          ),
          placeholder = "Keep blank to copy name"
        )
      ),
    ),
    div(
      class = "tab-settings",
      htmltools::tagAppendAttributes(
        selectizeInput(
          inputId = ns("icon"),
          label = "Icon",
          choices = c("Optional" = ""),
          options = list(
            render = I("{
            item: function(item, escape) { return '<div class=\"item icon-option\">' + item.label + '</div>'; },
            option: function(item, escape) { return '<div class=\"option icon-option\">' + item.label + '</div>'; }
          }"),
          maxOptions = 3000
          )
        ),
        class = "icon-choices"
      )
    ),
    tags$button(
      id = ns("add"),
      type = "button",
      class = "btn btn-success action-button add-tab-button",
      "Add Tab"
    ),
    tags$button(
      id = ns("delete"),
      type = "button",
      class = "btn btn-danger action-button delete-tab-button",
      "Delete Tab"
    ),
    br(),
    br(),
    div(
      id = ns("alert")
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
