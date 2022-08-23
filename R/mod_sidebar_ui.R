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

      #### Tab Panel ####
      sidebarItem(
        id = ns("tabset"),
        name = "Tabset Panel",
        element = "tabset",
        parent_id = accordion_id,
        conditionalPanel(
          "input['settings-page_type'] !== 'dashboardPage'",
          compSettingType(ns("tabset"), c("tabs", "pills"))
        ),
        conditionalPanel(
          "input['settings-page_type'] === 'dashboardPage'",
          compSettingLabel(ns("tabset"), label = "Title", optional = TRUE),
          tags$fieldset(
            compSettingColour(ns("tabset")),
            compSettingWidthNum(ns("tabset"), value = 6, min = 0)
          )
        ),
        componentTab(ns("tabset"))
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
        tags$fieldset(
          compSettingWidthNum(ns("column")),
          compSettingOffset(ns("column"))
        ),
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
        tags$fieldset(
          compSettingLabel(ns("box")),
          compSettingWidthNum(ns("box"), value = 6, min = 0)
        ),
        tags$fieldset(
          compSettingColour(ns("box")),
          compSettingBackground(ns("box"))
        ),
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
        tags$fieldset(
          compSettingType(ns("user_box"), c(1, 2)),
          compSettingWidthNum(ns("user_box"), value = 3, min = 0)
        ),
        tags$fieldset(
          compSettingColour(ns("user_box")),
          compSettingBackground(ns("user_box"))
        ),
        notes = list(
          tagList("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### Info Box ####
      sidebarItem(
        id = ns("info_box"),
        name = "Info Box",
        element = "info_box",
        parent_id = accordion_id,
        tags$fieldset(
          compSettingValue(ns("info_box")),
          compSettingLabel(ns("info_box"))
        ),
        tags$fieldset(
          compSettingIcon(ns("info_box")),
          compSettingWidthNum(ns("info_box"), value = 3, min = 0)
        ),
        tags$fieldset(
          compSettingBackground(ns("info_box")),
          compSettingFill(ns("info_box"))
        ),
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
        tags$fieldset(
          compSettingValue(ns("value_box")),
          compSettingLabel(ns("value_box"))
        ),
        compSettingIcon(ns("value_box")),
        tags$fieldset(
          compSettingBackground(ns("value_box")),
          compSettingWidthNum(ns("value_box"), value = 3, min = 0)
        ),
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
        tags$fieldset(
          compSettingType(
            ns("input"),
            choices = c(
              "Text" = "text",
              "Text Area" = "textarea
              ", "Numeric" = "number",
              "Password" = "password"
            )
          ),
          compSettingLabel(ns("input"))
        ),
        tags$fieldset(
          compSettingID(ns("input")),
          compSettingWidth(ns("input"))
        ),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Select Input ####
      sidebarItem(
        id = ns("dropdown"),
        name = "Dropdown (selectInput)",
        element = "dropdown",
        parent_id = accordion_id,
        compSettingLabel(ns("dropdown")),
        tags$fieldset(
          compSettingID(ns("dropdown")),
          compSettingWidth(ns("dropdown"))
        ),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Slider Input ####
      sidebarItem(
        id = ns("slider"),
        name = "Slider Input",
        element = "slider",
        parent_id = accordion_id,
        compSettingLabel(ns("slider")),
        tags$fieldset(
          compSettingType(
            ns("slider"),
            choices = c("Numeric" = "number", "Date" = "date", "Timestamp" = "datetime")
          ),
          compSettingWidth(ns("slider"))
        ),
        tags$fieldset(
          compSettingID(ns("slider")),
          compSettingRange(ns("slider"))
        ),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Date Input ####
      sidebarItem(
        id = ns("date"),
        name = "Calendar (dateInput)",
        element = "date",
        parent_id = accordion_id,
        tags$fieldset(
          compSettingLabel(ns("date")),
          compSettingWidth(ns("date"))
        ),
        tags$fieldset(
          compSettingID(ns("date")),
          compSettingRange(ns("date"))
        ),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### File Input ####
      sidebarItem(
        id = ns("file"),
        name = "File Input",
        element = "file",
        parent_id = accordion_id,
        compSettingLabel(ns("file")),
        tags$fieldset(
          compSettingID(ns("file")),
          compSettingWidth(ns("file"))
        ),
        notes = "To position several inputs horizontally, they must be put within an input panel."
      ),

      #### Checkbox ####
      sidebarItem(
        id = ns("checkbox"),
        name = "Checkbox",
        element = "checkbox",
        parent_id = accordion_id,
        compSettingLabel(ns("checkbox")),
        tags$fieldset(
          compSettingID(ns("checkbox")),
          compSettingWidth(ns("checkbox"))
        )
      ),

      #### Radio Buttons/Checkbox Group ####
      sidebarItem(
        id = ns("radio"),
        name = "Radio Buttons",
        element = "radio",
        parent_id = accordion_id,
        tags$fieldset(
          compSettingType(ns("radio"), choices = c("Radio" = "radio", "Checkbox" = "checkbox")),
          compSettingLabel(ns("radio"))
        ),
        compSettingChoices(ns("radio")),
        tags$fieldset(
          compSettingID(ns("radio")),
          compSettingWidth(ns("radio"))
        ),
        compSettingInline(ns("radio"))
      ),

      #### Button ####
      sidebarItem(
        id = ns("button"),
        name = "Button",
        element = "button",
        parent_id = accordion_id,
        tags$fieldset(
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
          compSettingLabel(ns("button"))
        ),
        tags$fieldset(
          compSettingIcon(ns("button")),
          compSettingWidth(ns("button"))
        ),
        tags$fieldset(
          compSettingID(ns("button")),
          compSettingDownload(ns("button"))
        )
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

      #### Block Quote ####
      sidebarItem(
        id = ns("quote"),
        name = "Block Quote",
        element = "quote",
        parent_id = accordion_id,
        compSettingColour(ns("quote")),
        compSettingTextArea(ns("quote"))
      ),

      #### Callout ####
      sidebarItem(
        id = ns("callout"),
        name = "Callout",
        element = "callout",
        parent_id = accordion_id,
        compSettingLabel(ns("callout")),
        compSettingTextArea(ns("callout")),
        tags$fieldset(
          compSettingColour(ns("callout"), status = TRUE),
          compSettingWidthNum(ns("callout"), value = 6, min = 0)
        ),
        notes = list(
          tagList("If the width > 0, then the box is included in a column and can only be included in", tags$b("rows"), "."),
          "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line."
        )
      ),

      #### Output ####
      sidebarItem(
        id = ns("output"),
        name = "Output",
        element = "output",
        parent_id = accordion_id,
        tags$fieldset(
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
          compSettingID(ns("output"))
        ),
        tags$fieldset(
          conditionalPanel(
            "input['output-type'] === 'plot'",
            ns = ns,
            class = "component-settings",
            compSettingPlot(ns("output"))
          ),
          compSettingInline(ns("output"))
        ),
        conditionalPanel(
          "!['plot', 'image', 'table'].includes(input['output-type'])",
          ns = ns,
          compSettingTextArea(ns("output"))
        ),
        tags$fieldset(
          compSettingWidth(ns("output")),
          conditionalPanel(
            "['plot', 'image'].includes(input['output-type'])",
            ns = ns,
            class = "component-settings",
            compSettingHeight(ns("output"))
          )
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
