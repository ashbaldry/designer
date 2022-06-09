#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  observeEvent(input$help, {
    guide$init()$start()
  })

  page_html <- CanvasModuleServer("canvas")

  SettingsModuleServer("settings", ui_code = page_html)

  SidebarModuleServer("sidebar")
}
