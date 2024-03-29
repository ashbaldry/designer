#' @noRd
TemplateModuleServer <- function(id, html, page) {
  moduleServer(id, function(input, output, session) {
    ns <- session$ns
    shared_template_id <- reactiveVal()

    #### Bookmarking ####
    setBookmarkExclude(c(
      "title", "description", "author",
      "save", "save_share",
      "overwrite", "overwrite_share",
      "existing_template", "save_button", "select",
      "delete", "confirm_delete", "search"
    ))

    onBookmark(function(state) {
      state$values$template <- shared_template_id()
    })
    onRestore(function(state) {
      session$sendCustomMessage(
        "runjs",
        list(
          script = paste0(
            "document.querySelector(\".template-option[data-value='", state$values$template, "']\").click()"
          )
        )
      )
    })

    #### Modal ####
    observeEvent(input$save_button, {
      existing_templates <- get_template_index()

      showModal(
        modalDialog(
          tags$form(
            tags$fieldset(
              tags$legend("Save Template"),
              textInput(ns("title"), "Title", width = "100%"),
              textInput(ns("author"), "Author", width = "100%"),
              textAreaInput(ns("description"), "Description (optional)", rows = 2L, width = "100%"),
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
                "Save"
              ),
              tags$button(
                id = ns("save_share"),
                type = "button",
                class = "btn btn-primary action-button",
                `data-dismiss` = "modal",
                `data-bs-dismiss` = "modal",
                "Share",
                shiny::icon("share")
              )
            ),
            if (nrow(existing_templates) > 0L) {
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
                  ),
                  tags$button(
                    id = ns("overwrite_share"),
                    type = "button",
                    class = "btn btn-primary action-button",
                    `data-dismiss` = "modal",
                    `data-bs-dismiss` = "modal",
                    "Share",
                    shiny::icon("share")
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

    #### Saving ####
    saved_template_id <- reactiveVal()

    observe({
      req(input$title, input$author)

      id <- save_template(
        html = html(),
        page = page(),
        title = input$title,
        desc = input$description,
        user = input$author
      )
      saved_template_id(id)

      insertUI(
        selector = paste0("#", ns("select")),
        where = "beforeEnd",
        ui = createTemplateSelection(
          list(
            id = id,
            page = page(),
            user = input$author,
            title = input$title,
            description = input$description
          )
        )
      )
    }) |>
      bindEvent(
        input$save,
        input$save_share,
        ignoreInit = TRUE
      )

    observe({
      shared_template_id(saved_template_id())
      session$doBookmark()
    }) |>
      bindEvent(
        input$save_share,
        ignoreInit = TRUE
      )

    #### Updating ####
    observe({
      req(input$overwrite + input$overwrite_share > 0L)
      update_template(
        html = html(),
        id = input$existing_template
      )
    }) |>
      bindEvent(
        input$overwrite,
        input$overwrite_share,
        ignoreInit = TRUE
      )

    observe({
      shared_template_id(input$existing_template)
      session$doBookmark()
    }) |>
      bindEvent(
        input$overwrite_share,
        ignoreInit = TRUE
      )

    #### Deleting ####
    observe({
      req(input$delete)
      showModal(
        modalDialog(
          p("Deleting this template will remove for all users. Do you wish to continue?"),
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
              id = ns("confirm_delete"),
              type = "button",
              class = "btn btn-danger action-button",
              `data-dismiss` = "modal",
              `data-bs-dismiss` = "modal",
              shiny::icon("check"),
              "Yes"
            )
          )
        )
      )
    }) |>
      bindEvent(
        input$select,
        input$delete,
        ignoreInit = TRUE
      )

    observe({
      delete_template(input$select)
      removeUI(selector = paste0(".template-option[data-value='", input$select, "']"))
    }) |>
      bindEvent(
        input$confirm_delete,
        ignoreInit = TRUE
      )

    #### UI Updating ####
    selected_template <- reactive({
      req(!input$delete)
      read_template(input$select)
    }) |>
      bindEvent(
        input$select,
        input$delete,
        ignoreInit = TRUE
      )

    return(selected_template)
  })
}
