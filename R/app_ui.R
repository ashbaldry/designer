#' \{designer\} application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'
#' @noRd
appUI <- function(request) {
  ui <- tagList(
    addGolemExternalResources(),

    tags$header(
      h1("{designer} - Design your UI"),
      tags$button(
        id = "help",
        class = "btn btn-outline-dark action-button guide-button",
        "Help"
      )
    ),

    fluidPage(
      title = "Shiny UI Designer",
      theme = bslib::bs_theme(version = 4),
      lang = "en",
      warningModal("warning_modal"),

      SettingsModUI("settings"),

      fluidRow(
        column(
          width = 3,
          class = "d-flex flex-column justify-content-between px-2",
          SidebarModUI("sidebar")
        ),
        column(
          width = 9,
          class = "px-2",
          CanvasModUI("canvas")
        )
      )
    )
  )

  attr(ui, "lang") <- "en"
  ui
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

  ui_head <- tags$head(
    golem::favicon(),
    golem::bundle_resources(
      path = appSys("app/www"),
      app_title = "Shiny UI Designer",
      name = "designer",
      version = "0.1.0"
    ),
    ionRangeSliderDependency(),
    datePickerDependency(),
    dataTableDependency,
    cicerone::use_cicerone(),

    tags$meta(name = "description", content = "Create Wireframes of the UI of shiny applications"),
    tags$meta(name = "keywords", content = "R, shiny, designer, prototype, wireframe"),
    tags$meta(name = "author", content = "Ashley Baldry"),
  )

  designer_scripts <- list.files(system.file("srcjs/designer", package = "designer"), ".js$")

  ui_head <- addbs4DashDependencies(ui_head, NULL)

  ui_head <- htmltools::attachDependencies(
    ui_head,
    htmltools::htmlDependency(
      name = "Sortable",
      version = "1.14.0",
      src = "srcjs/sortable",
      script = "Sortable.min.js",
      package = "designer"
    )
  )

  ui_head
}

ionRangeSliderDependency <- getFromNamespace("ionRangeSliderDependency", "shiny")
datePickerDependency <- getFromNamespace("datePickerDependency", "shiny")
dataTableDependency <- getFromNamespace("dataTableDependency", "shiny")
addbs4DashDependencies <- getFromNamespace("add_bs4Dash_deps", "bs4Dash")
