#' Store Saved Protoype
#'
#' @description
save_design <- function(html, title = NULL, desc = NULL, user = NULL) {
  cache_dir <- find_cache_dir()
}

#' Find designer directory
#'
#' @description
#' Searches the following locations in order for somewhere to read/write:
#'
#' - The system environment variable R_DESIGNER_CACHE
#' - The shared data directory
#' - The user data directory
#'
#' The aim is to make the bookmarked designs as public as possible, and giving
#' people using a server more options to store the bookmarks, especially if
#' the site data directory isn't available
#'
#' @noRd
find_cache_dir <- function(mode = 2) {
  custom_dir <- Sys.getenv("R_DESIGNER_CACHE", "")
  if (dir.exists(custom_dir) && file.access(custom_dir, mode = mode) == 0) {
    return(custom_dir)
  }

  shared_dir <- rappdirs::site_data_dir(appauthor = "R_designer")
  parent_shared_dir <- rappdirs::site_data_dir()

  if (file.access(shared_dir, mode = mode) == 0) {
    return(shared_dir)
  } else if (!dir.exists(shared_dir) && file.access(parent_shared_dir, mode = mode) == 0) {
    dir.create(shared_dir)
    return(shared_dir)
  }

  personal_dir <- rappdirs::user_data_dir(appauthor = "R_designer")
  if (!dir.exists(personal_dir)) {
    dir.create(personal_dir)
  }
  personal_dir
}
