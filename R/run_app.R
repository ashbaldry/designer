#' Run the Shiny Application
#'
#' @description
#' Runs the designer Shiny application.
#'
#' @param ... arguments to pass to \code{golem_opts}. See \code{\link[golem]{get_golem_options}} for more details.
#' @inheritParams shiny::shinyApp
#'
#' @return
#' This function does not return a value; interrupt R to stop the application (usually by pressing Ctrl+C or Esc).
#'
#' @examplesIf interactive()
#' designApp()
#'
#' @import shiny
#' @importFrom stats setNames
#'
#' @export
designApp <- function(onStart = NULL, options = list(), enableBookmarking = NULL, uiPattern = "/", ...) {
  golem::with_golem_options(
    app = shinyApp(
      ui = appUI,
      server = appServer,
      onStart = onStart,
      options = options,
      enableBookmarking = enableBookmarking,
      uiPattern = uiPattern
    ),
    golem_opts = list(...)
  )
}
