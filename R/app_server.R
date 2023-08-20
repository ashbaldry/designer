#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  setBookmarkExclude(c(
    "app_name", "remove_border", "remove_label", "remove_colour", "help", "css_style", "screenshot"
  ))

  observeEvent(input$help, guide$init()$start())

  template_html <- reactiveVal()

  page_html <- CanvasModuleServer("canvas", selected_template = template_html)

  selected_template <- SettingsModuleServer("settings", ui_code = page_html)

  observeEvent(selected_template(), template_html(selected_template()))

  SidebarModuleServer("sidebar")
}
