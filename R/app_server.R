#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  page_html <- CanvasModuleServer("canvas")

  SidebarModuleServer("sidebar")

  CodeModuleServer("settings-code", ui_code = page_html)
}
