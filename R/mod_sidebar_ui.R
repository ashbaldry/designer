COMPONENTS <- c(
  "Header" = "header",
  "Row" = "row",
  "Column" = "column",
  "Text" = "text",
  "Input Panel" = "input_panel",
  "Dropdown (selectInput)" = "dropdown",
  "Input" = "input",
  "Slider" = "slider",
  "File Input" = "file",
  "Calendar (dateInput)" = "date",
  "Checkbox" = "checkbox",
  "Radio Buttons" = "radio",
  "Button" = "button",
  "Output" = "output"
)

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

  tagList(
    div(
      div(
        id = ns("container"),
        class = "container component-container"
      ),
      tags$form(
        class = "component-form",
        div(
          class = "component_settings",
          `data-component` = "tab_panel",
          tabSettings(ns("tab_panel"))
        ),
        div(
          class = "component_settings",
          `data-component` = "header",
          headerSettings(ns("header"))
        ),
        div(
          class = "component_settings",
          `data-component` = "row",
          rowSettings()
        ),
        div(
          class = "component_settings",
          `data-component` = "column",
          columnSettings(ns("column"))
        ),
        div(
          class = "component_settings",
          `data-component` = "text",
          textSettings(ns("text"))
        ),
        div(
          class = "component_settings",
          `data-component` = "input_panel",
          inputPanelSettings()
        ),
        div(
          class = "component_settings",
          `data-component` = "dropdown",
          dropdownSettings(ns("dropdown"))
        ),
        div(
          class = "component_settings",
          `data-component` = "input",
          inputSettings(ns("input"))
        ),
        div(
          class = "component_settings",
          `data-component` = "file",
          fileSettings(ns("file"))
        ),
        div(
          class = "component_settings",
          `data-component` = "slider",
          sliderSettings(ns("slider"))
        ),
        div(
          class = "component_settings",
          `data-component` = "date",
          dateSettings(ns("date"))
        ),
        div(
          class = "component_settings",
          `data-component` = "checkbox",
          checkboxSettings(ns("checkbox"))
        ),
        div(
          class = "component_settings",
          `data-component` = "radio",
          radioSettings(ns("radio"))
        ),
        div(
          class = "component_settings",
          `data-component` = "button",
          buttonSettings(ns("button"))
        ),
        div(
          class = "component_settings",
          `data-component` = "output",
          outputSettings(ns("output"))
        ),
        br(),
        div(
          class = "component_comments",
          textAreaInput(
            ns("comments"),
            label = inputLabel(
              "Add Code Comment",
              "In this application, this will be available as a tooltip, however this will also be included in the R",
              "script as a comment for reference."
            ),
            placeholder = "Comment included in R script",
            rows = 2
          )
        )
      )
    ),
    div(
      class = "screenshots screenshot-container",
      h6(class = "screenshots-header", icon("save", "aria-hidden" =  "true"), "Screenshot options"),
      div(
        class = "screenshot-options",
        `data-component` = "screenshots",
        screenshotSettings(ns("screenshots"))
      )
    ),
    div(
      class = "container bin-container",
      h6(class = "bin-header", icon("trash", "aria-hidden" = "true"), "Drag Here to Delete Item"),
      div(
        class = "sortable-bin",
        id = ns("bin")
      )
    )
  )
}
