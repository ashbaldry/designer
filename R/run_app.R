#' Run the Shiny Application
#'
#' @param ... arguments to pass to golem_opts.
#' See `?golem::get_golem_options` for more details.
#' @inheritParams shiny::shinyApp
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
