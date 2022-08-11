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
                shiny::icon("xmark"),
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
        session$sendCustomMessage("runjs", list(script = "$('#save_toast').toast('show');"))
      }
    })

    observeEvent(input$overwrite, {
      writeToUI(r_code())
      session$sendCustomMessage("runjs", list(script = "$('#save_toast').toast('show');"))
    })

    output$code <- renderPrint(cat(r_code()))

    output$download <- downloadHandler(
      filename = "ui.R",
      content = function(file) {
        writeLines(r_code(), file)
      }
    )
  })
}

writeToUI <- function(code, file = "ui.R") {
  sink(file = file, append = FALSE)
  cat(code)
  sink()
}
