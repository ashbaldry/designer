#' sidebar Server Functions
#'
#' @noRd
mod_sidebar_server <- function(id) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    shiny_code <- eventReactive(input$save, {
      1
    })

  })
}
