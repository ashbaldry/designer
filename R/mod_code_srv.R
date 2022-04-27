#' @param ui_code Reactive object containing JSON string of the UI in the "App UI" tab
#'
#' @noRd
CodeModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    r_code <- reactive({
      jsonToRScript(ui_code())
    })

    observeEvent(input$save, {
      if (file.exists("ui.R")) {
        showModal(
          modalDialog(
            p("ui.R already exists. Saving this will overwrite what currently is in ui.R. Are you sure?"),
            title = "Warning!",
            footer = tagList(
              tags$button(
                type = "button",
                class = "btn btn-secondary",
                `data-dismiss` = "modal",
                `data-bs-dismiss` = "modal",
                shiny::icon("times"),
                "No"
              ),
              tags$button(
                id = ns("overwrite"),
                type = "button",
                class = "btn btn-primary action-button",
                `data-dismiss` = "modal",
                `data-bs-dismiss` = "modal",
                shiny::icon("check"),
                "Yes"
              )
            )
          )
        )
      } else {
        writeToUI(r_code())
      }
    })

    observeEvent(input$overwrite, {
      writeToUI(r_code())
    })

    output$code <- renderPrint(cat(r_code()))
  })
}

writeToUI <- function(code) {
  sink(file = "ui.R", append = FALSE)
  cat(code)
  sink()
}
