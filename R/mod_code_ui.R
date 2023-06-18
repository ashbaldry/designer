#' Template Code Module
#'
#' @description
#' Module showing the user the R code required to create the UI on the "App UI" tab.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI and server code to display selected HTML elements
#'
#' @noRd
CodeModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "code-ui-form",
      tags$fieldset(
        span(
          toast("copy_toast", "Copied!"),
          tags$button(
            class = "copy-ui-button btn btn-default",
            role = "button",
            icon("copy"),
            "Copy"
          )
        ),
        downloadButton(
          ns("download")
        ),
        if (interactive()) {
          actionButton(
            ns("save"),
            "Save As...",
            shiny::icon("floppy-disk")
          )
        },
        actionButton(
          ns("options"),
          shiny::icon("cogs")
        )
      )
    ),

    tags$fieldset(
      id = ns("options_fields"),
      style = "display: none;",

      shiny::radioButtons(
        inputId = ns("file_type"),
        label = "File Type",
        choices = c("UI" = "ui", "Module" = "module"),
        inline = TRUE
      ),
      conditionalPanel(
        condition = "input.file_type === 'module'",
        ns = ns,
        tagList(
          shiny::textInput(
            inputId = ns("file_name"),
            label = "Module Name"
          ),
          shiny::radioButtons(
            inputId = ns("app_type"),
            label = "App Structure",
            choices = c("{golem}" = "golem", "{rhino}" = "rhino"),
            inline = TRUE
          )
        )
      )
    ),

    tagAppendAttributes(
      verbatimTextOutput(ns("code"), placeholder = TRUE),
      class = "code-output"
    )
  )
}

toast <- function(id, text) {
  div(
    id = id,
    class = "toast hide",
    role = "alert",
    `aria-live` = "assertive",
    `aria-atomic` = "true",
    `data-autohide` = "true",
    div(
      class = "toast-body",
      tags$b(text)
    )
  )
}
