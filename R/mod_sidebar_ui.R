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
      class = "accordion",
      id = accordion_id,

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
      )
    ),

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
