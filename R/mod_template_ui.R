#' Stored Templates Module
#'
#' @description
#' Module providing access to previously saved templates.
#'
#' @param id The character vector to use for the namespace.
#'
#' @return
#' UI and server code to display selected HTML elements
#'
#' @noRd
TemplateModUI <- function(id) {
  ns <- NS(id)

  tagList(
    tags$form(
      class = "code-ui-form",
      actionButton(
        ns("save_button"),
        "Save",
        shiny::icon("floppy-disk")
      )
    ),
    templateSelectionInput(
      ns("select"),
      get_template_index()
    )
  )
}

templateSelectionInput <- function(id, template_index) {
  if (nrow(template_index) > 0) {
    template_tags <- apply(template_index, 1, createTemplateSelection)
  } else {
    template_tags <- NULL
  }

  tags$section(
    class = "template-select",
    id = id,
    template_tags
  )
}

createTemplateSelection <- function(template_info) {
  tags$article(
    `data-value` = template_info[["id"]],
    `data-page` = template_info[["page"]],
    class = "template-option",
    span(
      class = "author",
      template_info[["user"]]
    ),
    div(
      class = "title",
      template_info[["title"]]
    ),
    div(
      class = "description",
      template_info[["description"]]
    )
  )
}
