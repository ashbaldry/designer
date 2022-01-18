#' The application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'     DO NOT REMOVE.
#' @import shiny
#' @noRd
app_ui <- function(request) {
  tagList(
    # Leave this function for adding external resources
    golem_add_external_resources(),
    # Your application UI logic
    fluidPage(
      title = "Shiny UI Designer",
      theme = bslib::bs_theme(bslib::version_default()),

      h1("designer"),
      fluidRow(
        column(
          width = 3,
          h3("Shiny UI Designer"),
          mod_sidebar_ui("sidebar")
        ),
        column(
          width = 9,
          mod_canvas_ui("canvas")
        )
      )
    )
  )
}

#' Add external Resources to the Application
#'
#' This function is internally used to add external
#' resources inside the Shiny application.
#'
#' @import shiny
#' @importFrom golem add_resource_path activate_js favicon bundle_resources
#' @noRd
golem_add_external_resources <- function() {
  golem::add_resource_path("www", app_sys("app/www"))

  tags$head(
    favicon(),
    golem::bundle_resources(
      path = app_sys("app/www"),
      app_title = "designer"
    )
  )
}

