#' @param ui_code Reactive object containing JSON string of the UI in the "App UI" tab
#'
#' @noRd
CodeModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(c("save", "save_confirm", "file_type", "file_name"))
    ns <- session$ns

    observeEvent(input$save, ignoreInit = TRUE, {
      showModal(saveFileModal(ns, "save"))
    })

    observeEvent(input$download, ignoreInit = TRUE, {
      showModal(saveFileModal(ns, "download"))
    })

    observeEvent(input$save_confirm, ignoreInit = TRUE, {
      writeToUI(ui_code(), input$file_type, input$file_name, input$app_type)
    })

    output$download_confirm <- downloadHandler(
      filename = function() {
        if (input$file_type == "ui") {
          "ui.R"
        } else {
          paste0("mod_", paste0("mod_", tolower(gsub(" ", "_", module_name)), "_ui.R"))
        }
      },
      content = function(file) {
        mod_name <- if (input$file_type == "ui") NULL else input$file_name
        r_code <- jsonToRScript(code, module_name = module_name)
        writeLines(r_code, file)
      }
    )

    r_code <- reactive(jsonToRScript(ui_code()))

    output$code <- renderPrint(cat(r_code()))
  })
}

saveFileModal <- function(ns, type = c("save", "download")) {
  type <- match.arg(type)

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
          if (type == "save") {
            shiny::radioButtons(
              inputId = ns("app_type"),
              label = "App Structure:",
              choices = c("{golem}" = "golem", "{rhino}" = "rhino"),
              inline = TRUE
            )
          }
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
      if (type == "save") {
        tags$button(
          id = ns("save_confirm"),
          type = "button",
          class = "btn btn-primary action-button",
          `data-dismiss` = "modal",
          `data-bs-dismiss` = "modal",
          shiny::icon("check"),
          "Confirm"
        )
      } else {
        tags$a(
          id = ns("download_confirm"),
          type = "button",
          class = "btn btn-primary shiny-download-link",
          `data-dismiss` = "modal",
          `data-bs-dismiss` = "modal",
          href = "",
          target = "_blank",
          download = NA,
          icon = shiny::icon("check"),
          label = "Confirm"
        )
      }
    )
  )
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
