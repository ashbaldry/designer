#' Store Saved Prototype
#'
#' @description
#' Saves the current template in the designer cache, along with metadata
save_template <- function(html, title = NULL, desc = NULL, user = NULL) {
  cache_dir <- find_cache_dir()
}

#' Template Index File
#'
#' @description
#' To keep track of all templates, a csv file is created within the local cache
#' to store the name, author and description of the template, along with a unique
#' ID.
#'
#' @noRd
get_template_index <- function(index_file = file.path(find_cache_dir(), "index.csv")) {
  if (!file.exists(index_file)) {
    create_template_index(index_file)
  }

  read.csv(index_file)
}

#' @noRd
create_template_index <- function(index_file = file.path(find_cache_dir(), "index.csv")) {
  if (file.exists(index_file)) {
    index_file
  } else {
    writeLines("id,title,user,description", index_file)
    index_file
  }
}
