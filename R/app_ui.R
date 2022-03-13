#' \{designer\} application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'
#' @noRd
appUI <- function(request) {
  tagList(
    addGolemExternalResources(),

    tags$header(
      "{designer} - Design your UI"
    ),

    fluidPage(
      title = "Shiny UI Designer",
      theme = bslib::bs_theme(version = 4),
      warningModal("warning_modal"),

      SettingsModUI("settings"),

      fluidRow(
        column(
          width = 3,
          class = "d-flex flex-column justify-content-between",
          SidebarModUI("sidebar")
        ),
        column(
          width = 9,
          tabsetPanel(
            tabPanel(
              "App UI",
              CanvasModUI("canvas")
            ),
            tabPanel(
              "Code",
              CodeModUI("code")
            ),
            tabPanel(
              "About",
              AboutModUI("about")
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
addGolemExternalResources <- function() {
  golem::add_resource_path("www", appSys("app/www"))
  golem::add_resource_path("images", appSys("app/images"))

  tags$head(
    golem::favicon(),
    golem::bundle_resources(
      path = appSys("app/www"),
      app_title = "Shiny UI Designer",
      name = "designer"
    )
  )
}
