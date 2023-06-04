#' @param ui_code Reactive object containing JSON string of the UI in the "App UI" tab
#'
#' @noRd
CodeModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(c("save", "save_confirm", "file_type", "file_name"))
    ns <- session$ns

    observeEvent(input$save, ignoreInit = TRUE, {
      showModal(
        modalDialog(
          tagList(
            shiny::radioButtons(
              inputId = ns("file_type"),
              label = "File Type:",
              choices = c("UI" = "ui", "Module" = "module"),
              inline = TRUE
            ),
            conditionalPanel(
              condition = "input.file_type === 'module'",
              ns = ns,
              tagList(
                shiny::textInput(
                  inputId = ns("file_name"),
                  label = "Module Name:"
                ),
                shiny::radioButtons(
                  inputId = ns("app_type"),
                  label = "App Structure:",
                  choices = c("{golem}" = "golem", "{rhino}" = "rhino"),
                  inline = TRUE
                )
              )
            )
          ),
          title = "Save UI",
          footer = tagList(
            tags$button(
              type = "button",
              class = "btn btn-secondary",
              `data-dismiss` = "modal",
              `data-bs-dismiss` = "modal",
              shiny::icon("xmark"),
              "Cancel"
            ),
            tags$button(
              id = ns("save_confirm"),
              type = "button",
              class = "btn btn-primary action-button",
              `data-dismiss` = "modal",
              `data-bs-dismiss` = "modal",
              shiny::icon("check"),
              "Confirm"
            )
          )
        )
      )
    })

    observeEvent(input$save_confirm, ignoreInit = TRUE, {
      writeToUI(ui_code(), input$file_type, input$file_name,input$app_type)
    })

    r_code <- reactive(jsonToRScript(ui_code()))

    output$code <- renderPrint(cat(r_code()))

    output$download <- downloadHandler(
      filename = "ui.R",
      content = function(file) {
        writeLines(r_code(), file)
      }
    )
  })
}

writeToUI <- function(code, file_type = c("ui", "module"), module_name = NULL, app_type = c("golem", "rhino")) {
  file_type <- match.arg(file_type)
  app_type <- match.arg(app_type)

  if (file_type == "ui") {
    r_code <- jsonToRScript(code)
    file_name <- "ui.R"
  } else {
    r_code <- jsonToRScript(code, module_name = module_name)
    r_dir <- if (app_type == "golem") "R" else "app/view"
    if (!file.exists(r_dir)) dir.create(r_dir, recursive = TRUE)
    file_name <- file.path(r_dir, paste0("mod_", tolower(gsub(" ", "_", module_name)), "_ui.R"))
  }

  sink(file = file_name, append = FALSE)
  cat(r_code)
  sink()
}
