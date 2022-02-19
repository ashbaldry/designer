#' \{designer\} application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'
#' @noRd
app_ui <- function(request) {
  tagList(
    golem_add_external_resources(),

    tags$header(
      "{designer} - Design your UI"
    ),

    fluidPage(
      title = "Shiny UI Designer",
      theme = bslib::bs_theme(version = 4),

      warning_modal("warning_modal"),

      fluidRow(
        column(
          width = 3,
          h3("Settings"),
          mod_sidebar_ui("sidebar")
        ),
        column(
          width = 9,
          tabsetPanel(
            tabPanel(
              "App UI",
              mod_canvas_ui("canvas")
            ),
            tabPanel(
              "Code",
              mod_code_ui("code")
            ),
            tabPanel(
              "About",
              mod_about_ui("about")
            )
          )

        )
      )
    )
  )
}

#' Add external Resources to the Application
#'
#' @description
#' This function is internally used to add external
#' resources inside the Shiny application.
#'
#' @return
#' A series of tags that are included in \code{<head></head>}
#'
#' @noRd
golem_add_external_resources <- function() {
  golem::add_resource_path("www", app_sys("app/www"))
  golem::add_resource_path("images", app_sys("app/images"))

  tags$head(
    golem::favicon(),
    golem::bundle_resources(
      path = app_sys("app/www"),
      app_title = "Shiny UI Designer",
      name = "designer"
    )
  )
}
