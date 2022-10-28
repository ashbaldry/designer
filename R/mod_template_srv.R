#' @noRd
TemplateModuleServer <- function(id, html) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns

    observeEvent(input$save_button, {
      existing_templates <- get_template_index()

      showModal(
        modalDialog(
          tags$form(
            tags$fieldset(
              tags$legend("Save Template"),
              textInput(ns("title"), "Title", width = "100%"),
              textInput(ns("author"), "Author", width = "100%"),
              textAreaInput(ns("description"), "Description (optional)", rows = 2, width = "100%"),
              tags$button(
                type = "button",
                class = "btn btn-secondary",
                `data-dismiss` = "modal",
                `data-bs-dismiss` = "modal",
                "Cancel"
              ),
              tags$button(
                id = ns("save"),
                type = "button",
                class = "btn btn-primary action-button",
                `data-dismiss` = "modal",
                `data-bs-dismiss` = "modal",
                "Confirm"
              )
            ),
            if (nrow(existing_templates) > 0) {
              tagList(
                tags$hr(),
                tags$fieldset(
                  tags$legend("Overwrite Existing Template"),
                  selectInput(
                    ns("existing_template"),
                    "Template",
                    choices = setNames(
                      existing_templates$id,
                      paste(existing_templates$title, "-", existing_templates$user)
                    ),
                    selected = NULL,
                    width = "100%"
                  ),
                  tags$button(
                    type = "button",
                    class = "btn btn-secondary",
                    `data-dismiss` = "modal",
                    `data-bs-dismiss` = "modal",
                    "Cancel"
                  ),
                  tags$button(
                    id = ns("overwrite"),
                    type = "button",
                    class = "btn btn-primary action-button",
                    `data-dismiss` = "modal",
                    `data-bs-dismiss` = "modal",
                    "Overwrite"
                  )
                )
              )
            }
          ),
          title = NULL,
          footer = NULL,
          easyClose = TRUE
        )
      )
    })

    observeEvent(input$save, {
      save_template(
        html = html(),
        title = input$title,
        desc = input$description,
        user = input$author
      )
    })

    observeEvent(input$overwrite, {
      update_template(
        html = html(),
        id = input$existing_template
      )
    })

    selected_template <- eventReactive(input$select, read_template(input$select))

    return(selected_template)
  })
}
