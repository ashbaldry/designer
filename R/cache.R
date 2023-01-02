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
#' @inheritParams base::file.access
#'
#' @noRd
find_cache_dir <- function(mode = 2L) {
  custom_dir <- Sys.getenv("R_DESIGNER_CACHE", "")
  if (dir.exists(custom_dir) && file.access(custom_dir, mode = mode) == 0L) {
    return(custom_dir)
  } else if (dir.exists(custom_dir)) {
    stop("Custom cache directory is unwritable. Please change directory permissions")
  }

  shared_dir <- rappdirs::site_data_dir(
    appname = "designer",
    appauthor = "r-designer",
    version = paste0("v", DESIGNER_VERSION)
  )
  parent_shared_dir <- rappdirs::site_data_dir()

  if (file.access(shared_dir, mode = mode) == 0L) {
    return(shared_dir)
  } else if (!dir.exists(shared_dir) && file.access(parent_shared_dir, mode = mode) == 0L) {
    dir.create(shared_dir, recursive = TRUE, showWarnings = FALSE)
    return(shared_dir)
  }

  personal_dir <- rappdirs::user_data_dir(
    appname = "designer",
    appauthor = "r-designer",
    version = paste0("v", DESIGNER_VERSION)
  )
  if (!dir.exists(personal_dir)) {
    dir.create(personal_dir, recursive = TRUE, showWarnings = FALSE)
  }
  personal_dir
}

DESIGNER_VERSION <- 1L
