#' @param ui_code Reactive object containing JSON string of the UI in the "App UI" tab
#'
#' @noRd
SettingsModuleServer <- function(id, ui_code) {
  moduleServer(id, function(input, output, session) {
    setBookmarkExclude("code-save")

    dash_deps_disabled <- reactiveVal(TRUE)
    observeEvent(input$page_type, {
      if (input$page_type == "dashboardPage") {
        if (dash_deps_disabled()) {
          addbs4DashDeps()
          dash_deps_disabled(FALSE)
        } else {
          toggleBS4DashDeps("show")
        }
      } else {
        toggleBS4DashDeps("hide")
      }
    })

    CodeModuleServer("code", ui_code = ui_code$ui_code)

    selected_template <- TemplateModuleServer("template", html = ui_code$html)

    return(selected_template)
  })
}

addbs4DashDeps <- function() {
  insertUI(
    "head",
    "beforeEnd",
    addbs4DashDependencies(
      tags$head(
        tags$link(
          href = "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700",
          rel = "stylesheet"
        )
      ),
      NULL
    )
  )
}

toggleBS4DashDeps <- function(toggle = c("show", "hide"), session = shiny::getDefaultReactiveDomain()) {
  toggle <- match.arg(toggle)
  session$sendCustomMessage("toggleBS4DashDeps", toggle)
}

addbs4DashDependencies <- getFromNamespace("add_bs4Dash_deps", "bs4Dash")
