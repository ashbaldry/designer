#' Component Accordion Item
#'
#' @description
#' An item to add to the sidebar that opens up the settings for the selected component
sidebarItem <- function(id, name, element, parent_id, ..., notes = NULL, active = FALSE) {
  ns <- NS(id)

  div(
    class = "card",
    div(
      id = ns("header"),
      class = "card-header",

      h2(
        class = "m-0",

        tags$button(
          class = paste("btn btn-link btn-block text-left", if (!active) "collapsed"),
          type = "button",
          `data-shinyelement` = element,
          `data-toggle` = "collapse",
          `data-target` = paste0("#", ns("body")),
          `aria-expanded` = tolower(active),
          `aria-controls` = ns("body"),
          name
        )
      )
    ),
    div(
      id = ns("body"),
      class = paste("collapse", if (active) "show"),
      `aria-labelledby` = ns("header"),
      `data-parent` = paste0("#", parent_id),

      div(
        class = "card-body",
        tags$form(
          id = ns("form"),
          ...
        ),
        if (!is.null(notes)) {
          tagList(
            h3("Notes"),
            tags$ul(
              lapply(notes, tags$li)
            )
          )
        }
      )
    )
  )
}
