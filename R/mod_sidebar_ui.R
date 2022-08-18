#' Bootstrap Component Creation Module
#'
#' @description
#' A shiny module that creates Bootstrap components to drag into the App UI canvas for the wire-framing
#' of shiny applications.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI and server code to display options to create
#'
#' @noRd
SidebarModUI <- function(id) {
  ns <- NS(id)
  accordion_id <- ns("accordion")

  tagList(
    div(
      id = ns("container"),
      class = "container component-container"
    ),

    tags$section(
      class = "accordion component-accordion",
      id = accordion_id,

      #### Tab Item ####
      sidebarItem(
        id = ns("tab"),
        name = "Tab",
        element = "tab_panel",
        parent_id = accordion_id,
        componentTab(ns("tab"))
      ),

      #### Header ####
      sidebarItem(
        id = ns("header"),
        name = "Header",
        element = "header",
        parent_id = accordion_id,
        active = TRUE,
        compSettingTag(ns("header"), choices = paste0("h", 1:6)),
        compSettingText(ns("header"), value = "Header")
      ),

      #### Row ####
      sidebarItem(
        id = ns("row"),
        name = "Row",
        element = "row",
        parent_id = accordion_id,
        notes = list(
          "The only component that can be a direct child of a row are columns.",
          paste(
            "By default, a row will have no height and is determined by the contents inside.",
            "To easily drop elements into the rows, they have a minimum height of 50px in this app."
          )
        )
      ),

      #### Column ####
      sidebarItem(
        id = ns("column"),
        name = "Column",
        element = "column",
        parent_id = accordion_id,
        compSettingWidthNum(ns("column")),
        compSettingOffset(ns("column")),
        notes = list(
          tagList("Columns can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of columns' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### Box ####
      sidebarItem(
        id = ns("box"),
        name = "Box/Card",
        element = "box",
        parent_id = accordion_id,
        compSettingLabel(ns("box")),
        compSettingColour(ns("box")),
        compSettingBackground(ns("box")),
        compSettingWidthNum(ns("box"), value = 6, min = 0),
        notes = list(
          tagList("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### User Box ####
      sidebarItem(
        id = ns("user_box"),
        name = "User Box/Card",
        element = "user_box",
        parent_id = accordion_id,
        compSettingLabel(ns("user_box")),
        compSettingType(ns("user_box"), c(1, 2)),
        compSettingColour(ns("user_box")),
        compSettingBackground(ns("user_box")),
        compSettingWidthNum(ns("user_box"), value = 3, min = 0),
        notes = list(
          tagList("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### Value Box ####
      sidebarItem(
        id = ns("value_box"),
        name = "Value Box",
        element = "value_box",
        parent_id = accordion_id,
        compSettingValue(ns("value_box")),
        compSettingLabel(ns("value_box")),
        compSettingIcon(ns("value_box")),
        compSettingBackground(ns("value_box")),
        compSettingWidthNum(ns("value_box"), value = 3, min = 0),
        notes = list(
          tagList("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### Input Panel ####
      sidebarItem(
        id = ns("input_panel"),
        name = "Input Panel",
        element = "input_panel",
        parent_id = accordion_id,
        notes = "By default inputs will be aligned vertically, input panels enable the inputs to be aligned horizontally."
      ),

      #### Input ####
      sidebarItem(
        id = ns("input"),
        name = "Basic Input",
        element = "input",
        parent_id = accordion_id,
        compSettingType(
          ns("input"),
          choices = c("Text" = "text", "Text Area" = "textarea", "Numeric" = "number", "Password" = "password")
        ),
        compSettingID(ns("input")),
        compSettingLabel(ns("input")),
        compSettingWidth(ns("input")),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Select Input ####
      sidebarItem(
        id = ns("dropdown"),
        name = "Dropdown (selectInput)",
        element = "dropdown",
        parent_id = accordion_id,
        compSettingID(ns("dropdown")),
        compSettingLabel(ns("dropdown")),
        compSettingWidth(ns("dropdown")),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Slider Input ####
      sidebarItem(
        id = ns("slider"),
        name = "Slider Input",
        element = "slider",
        parent_id = accordion_id,
        compSettingType(
          ns("slider"),
          choices = c("Numeric" = "number", "Date" = "date", "Timestamp" = "datetime")
        ),
        compSettingID(ns("slider")),
        compSettingLabel(ns("slider")),
        compSettingRange(ns("slider")),
        compSettingWidth(ns("slider")),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Date Input ####
      sidebarItem(
        id = ns("date"),
        name = "Calendar (dateInput)",
        element = "date",
        parent_id = accordion_id,
        compSettingID(ns("date")),
        compSettingLabel(ns("date")),
        compSettingRange(ns("date")),
        compSettingWidth(ns("date")),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### File Input ####
      sidebarItem(
        id = ns("file"),
        name = "File Input",
        element = "file",
        parent_id = accordion_id,
        compSettingID(ns("file")),
        compSettingLabel(ns("file")),
        compSettingWidth(ns("file")),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Checkbox ####
      sidebarItem(
        id = ns("checkbox"),
        name = "Checkbox",
        element = "checkbox",
        parent_id = accordion_id,
        compSettingID(ns("checkbox")),
        compSettingLabel(ns("checkbox")),
        compSettingWidth(ns("checkbox"))
      ),

      #### Radio Buttons/Checkbox Group ####
      sidebarItem(
        id = ns("radio"),
        name = "Radio Buttons",
        element = "radio",
        parent_id = accordion_id,
        compSettingType(ns("radio"), choices = c("Radio" = "radio", "Checkbox" = "checkbox")),
        compSettingID(ns("radio")),
        compSettingLabel(ns("radio")),
        compSettingChoices(ns("radio")),
        compSettingInline(ns("radio")),
        compSettingWidth(ns("radio"))
      ),

      #### Button ####
      sidebarItem(
        id = ns("button"),
        name = "Button",
        element = "button",
        parent_id = accordion_id,
        compSettingType(
          ns("button"),
          choices = c(
            "Default" = "default",
            "Primary" = "primary",
            "Secondary" = "secondary",
            "Success" = "success",
            "Danger" = "danger",
            "Warning" = "warning",
            "Info" = "info",
            "Light" = "light",
            "Dark" = "dark"
          )
        ),
        compSettingID(ns("button")),
        compSettingLabel(ns("button")),
        compSettingIcon(ns("button")),
        compSettingDownload(ns("button")),
        compSettingWidth(ns("button"))
      ),

      #### Text ####
      sidebarItem(
        id = ns("text"),
        name = "Text",
        element = "text",
        parent_id = accordion_id,
        compSettingTag(
          ns("text"),
          choices = c("Paragraph <p>" = "p", "Ordered List <ol>" = "ol", "Unordered List <ul>" = "ul")
        ),
        compSettingTextArea(ns("text"))
      ),

      #### Output ####
      sidebarItem(
        id = ns("output"),
        name = "Output",
        element = "output",
        parent_id = accordion_id,
        compSettingType(
          ns("output"),
          choices = c(
            "Text" = "text",
            "Verbatim Text" = "verbatim",
            "Plot" = "plot",
            "Image" = "image",
            "Table" = "table",
            "HTML" = "html"
          )
        ),
        conditionalPanel(
          "input['output-type'] === 'plot'",
          ns = ns,
          compSettingPlot(ns("output"))
        ),
        compSettingID(ns("output")),
        compSettingLabel(ns("output")),
        conditionalPanel(
          "!['plot', 'image', 'table'].includes(input['output-type'])",
          ns = ns,
          compSettingTextArea(ns("output"))
        ),
        compSettingInline(ns("output")),
        compSettingWidth(ns("output")),
        conditionalPanel(
          "['plot', 'image'].includes(input['output-type'])",
          ns = ns,
          compSettingHeight(ns("output"))
        ),
        notes = "Plot and image output will show area of plot, but image will not stretch to fit"
      )
    ),

    #### Comments ####
    tags$section(
      class = "component-comments",
      textAreaInput(
        ns("comments"),
        label = inputLabel(
          "Add Code Comment",
          "In the preview, this will be available as a tooltip,",
          "however this will also be included in the R script as a comment for reference."
        ),
        placeholder = "Comment included in R script",
        rows = 3,
        width = "100%"
      )
    ),

    #### Deletion ####
    tags$section(
      id = "component_delete",
      class = "container bin-container",
      h3(class = "bin-header", icon("trash", "aria-hidden" = "true"), "Drag Here to Delete Item"),
      div(
        class = "sortable-bin",
        id = ns("bin")
      )
    )
  )
}
