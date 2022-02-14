#' About the App Module
#'
#' @description
#' A shiny module that explains the dashboard and certain rules about components that can or cannot be added inside
#' another element.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI code to display information about the application
#'
#' @rdname create_bscomp_module
mod_about_ui <- function(id) {
  ns <- NS(id)

  tagList(
    h4("About"),
    p(),
    h5("Component Rules:"),
    tags$ul(
      tags$li(tags$b("Rows"), "can only be placed inside a container (usually the top tag of a page) or a row"),
      tags$li(tags$b("Columns"), "are the only component that can allowed directly inside a column")
    )
  )
}
