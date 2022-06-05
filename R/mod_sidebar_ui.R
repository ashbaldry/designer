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
    tags$section(
      id = "component_settings",
      div(
        id = ns("container"),
        class = "container component-container"
      ),
      tags$form(
        class = "component-form",
        tags$section(
          class = "component-parameters",
          h2(id = ns("title")),
          componentTag(ns),
          componentType(ns),
          componentLabel(ns),
          componentID(ns),
          componentText(ns),
          componentTextArea(ns),
          componentRange(ns),
          componentWidth(ns),
          componentWidthNum(ns),
          componentOffset(ns)
        ),
        tags$section(
          id = ns("notes"),
        ),
        tags$section(
          class = "component-comments",
          textAreaInput(
            ns("comments"),
            label = inputLabel(
              "Add Code Comment",
              "In this application, this will be available as a tooltip,",
              "however this will also be included in the R script as a comment for reference."
            ),
            placeholder = "Comment included in R script",
            rows = 2
          )
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
