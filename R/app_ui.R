#' \{designer\} application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'
#' @noRd
app_ui <- function(request) {
  tagList(
    golem_add_external_resources(),

    fluidPage(
      title = "Shiny UI Designer",
      theme = bslib::bs_theme(version = 4),

      warning_modal("warning_modal"),

      h1("{designer} - Design Your UI"),

      fluidRow(
        column(
          width = 3,
          h3("Settings"),
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
#' @noRd
golem_add_external_resources <- function() {
  golem::add_resource_path("www", app_sys("app/www"))

  tags$head(
    golem::favicon(),
    golem::bundle_resources(
      path = app_sys("app/www"),
      app_title = "designer"
    )
  )
}
