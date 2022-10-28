#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  setBookmarkExclude(c("remove_border", "remove_label", "remove_colour", "help", "css_style"))

  observeEvent(input$help, guide$init()$start())

  selected_template <- SettingsModuleServer("settings", ui_code = page_html)

  page_html <- CanvasModuleServer("canvas", selected_template = selected_template)

  SidebarModuleServer("sidebar")
}
