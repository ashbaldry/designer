#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
app_server <- function(input, output, session) {
  page_html <- mod_canvas_server("canvas")

  mod_sidebar_server("sidebar", ui_code = page_html)
}
