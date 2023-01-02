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
      tags$fieldset(
        class = "form-group",
        actionButton(
          ns("save_button"),
          "Save",
          shiny::icon("floppy-disk")
        )
      ),
      templateSearchInput(
        ns("search")
      )
    ),
    templateSelectionInput(
      ns("select"),
      get_template_index()
    )
  )
}

templateSearchInput <- function(id) {
  tags$fieldset(
    class = "form-group input-group",
    tags$input(
      id = id,
      class = "form-control",
      type = "text",
      `aria-label` = "search templates",
      placeholder = "Search templates..."
    ),
    tags$div(
      vlass = "input-group-append",
      tags$span(
        class = "input-group-text",
        " ",
        shiny::icon("magnifying-glass")
      )
    )
  )
}

templateSelectionInput <- function(id, template_index) {
  if (nrow(template_index) > 0L) {
    template_tags <- apply(template_index, 1L, createTemplateSelection)
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
    div(
      class = "info",
      div(
        class = "title",
        template_info[["title"]]
      ),
      div(
        class = "description",
        template_info[["description"]]
      )
    ),
    span(
      class = "author",
      template_info[["user"]]
    ),
    span(
      class = "delete",
      shiny::icon("x")
    )
  )
}
