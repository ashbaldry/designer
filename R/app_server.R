#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  setBookmarkExclude(c("remove_border", "remove_label", "remove_colour", "help", "css_style"))

  observeEvent(input$help, guide$init()$start())

  page_html <- CanvasModuleServer("canvas")

  SettingsModuleServer("settings", ui_code = page_html)

  SidebarModuleServer("sidebar")
}
