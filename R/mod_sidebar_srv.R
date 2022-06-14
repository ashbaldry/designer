#' @noRd
SidebarModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    updateSelectizeInput(session, "tab_icon", choices = getFAIcons(), selected = "", server = TRUE)
    updateSelectizeInput(session, "icon", choices = getFAIcons(), selected = "", server = TRUE)

    observeEvent(input$outputid, {
      if (input$type == "plot") {
        local({
          output_id <- input$outputid
          plot_type <- input$plot
          output[[output_id]] <- shiny::renderPlot(shinipsum::random_ggplot(plot_type))
        })
      } else if (input$type == "image") {
        local({
          output_id <- input$outputid
          output[[output_id]] <- shiny::renderImage(shinipsum::random_image(), deleteFile = TRUE)
        })
      } else if (input$type == "table") {
        local({
          output_id <- input$outputid
          output[[output_id]] <- shiny::renderDataTable(
            shinipsum::random_table(5, 3),
            options = list(dom = "t")
          )
        })
      }
    })
  })
}
