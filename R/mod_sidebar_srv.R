#' @noRd
SidebarModuleServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude(SIDEBAR_INPUT_IDS)

    updateSelectizeInput(session, "tab-icon", choices = getFAIcons(), selected = "", server = TRUE)
    updateSelectizeInput(session, "value_box-icon", choices = getFAIcons(), selected = "", server = TRUE)
    updateSelectizeInput(session, "info_box-icon", choices = getFAIcons(), selected = "github", server = TRUE)
    updateSelectizeInput(session, "tabset-icon", choices = getFAIcons(), selected = "", server = TRUE)
    updateSelectizeInput(session, "button-icon", choices = getFAIcons(), selected = "", server = TRUE)

    observeEvent(input$outputid, {
      if (input[["output-type"]] == "plot") {
        local({
          output_id <- input$outputid
          plot_type <- input[["output-plot"]]
          output[[output_id]] <- shiny::renderPlot(shinipsum::random_ggplot(plot_type))
        })
      } else if (input[["output-type"]] == "image") {
        local({
          output_id <- input$outputid
          output[[output_id]] <- shiny::renderImage(shinipsum::random_image(), deleteFile = TRUE)
        })
      } else if (input[["output-type"]] == "table") {
        local({
          output_id <- input$outputid
          output[[output_id]] <- shiny::renderDataTable(
            shinipsum::random_table(5L, 3L),
            options = list(dom = "t")
          )
        })
      }
    })
  })
}

SIDEBAR_INPUT_IDS <- c(
  "comments", "accordion",
  "box-background", "box-colour", "box-label", "box-width_num",
  "button-download", "button-icon", "button-id", "button-label", "button-type", "button-width",
  "callout-colour", "callout-label", "callout-textarea", "callout-width_num",
  "checkbox-id", "checkbox-label", "checkbox-width",
  "column-offset", "column-width_num",
  "date-id", "date-label", "date-range", "date-width",
  "dropdown-id", "dropdown-label", "dropdown-width",
  "file-id", "file-label", "file-width",
  "header-tag", "header-text",
  "info_box-background", "info_box-fill", "info_box-icon", "info_box-label", "info_box-value", "info_box-width_num",
  "input-id", "input-label", "input-type", "input-width",
  "output-height", "output-id", "output-inline", "output-plot", "output-textarea", "output-type", "output-width",
  "quote-colour", "quote-textarea",
  "radio-choices", "radio-id", "radio-inline", "radio-label", "radio-type", "radio-width",
  "slider-id", "slider-label", "slider-range", "slider-type", "slider-width",
  "tab-add", "tab-delete", "tab-icon", "tab-name", "tab-value",
  "tabset-add", "tabset-colour", "tabset-delete", "tabset-icon", "tabset-label",
  "tabset-name", "tabset-type", "tabset-value", "tabset-width_num",
  "text-tag", "text-textarea",
  "user_box-background", "user_box-colour", "user_box-label", "user_box-type", "user_box-width_num",
  "value_box-background", "value_box-icon", "value_box-label", "value_box-value", "value_box-width_num"
)
