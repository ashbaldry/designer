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
      span(
        toast("copy_toast", "Copied!"),
        tags$button(
          class = "copy-ui-button btn btn-default",
          role = "button",
          icon("copy"),
          "Copy"
        )
      ),
      bookmarkButton(
        label = "Share"
      ),
      if (interactive()) {
        span(
          toast("save_toast", "Saved!"),
          actionButton(
            ns("save"),
            "Save To ui.R",
            shiny::icon("floppy-disk")
          )
        )
      },
      downloadButton(
        ns("download")
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
