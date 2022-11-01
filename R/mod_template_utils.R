#' Store Saved Prototype
#'
#' @description
#' Saves the current template in the designer cache, along with metadata
#'
#' @param html Character string of the HTML that is present in the canvas
save_template <- function(html, page = NULL, title = NULL, desc = NULL, user = NULL) {
  cache_dir <- find_cache_dir()
  template_index <- get_template_index()

  template_id <- create_random_id()
  while (template_id %in% template_index$id) {
    template_id <- create_random_id()
  }

  template_dir <- file.path(cache_dir, template_id)
  dir.create(template_dir, showWarnings = FALSE)
  cat(paste0(html, "\n"), file = file.path(template_dir, "template.html"))

  write.table(
    data.frame(id = template_id, page = page, title = title, user = user, description = desc),
    file.path(cache_dir, "index.csv"),
    sep = ",",
    append = TRUE,
    col.names = FALSE,
    row.names = FALSE
  )

  template_id
}

create_random_id <- function(n = 10) {
  paste0(sample(letters, n, replace = TRUE), collapse = "")
}

#' @noRd
update_template <- function(html, id) {
  cache_dir <- find_cache_dir()
  cat(paste0(html, "\n"), file = file.path(cache_dir, id, "template.html"))
}

read_template <- function(id) {
  cache_dir <- find_cache_dir()
  paste0(readLines(file.path(cache_dir, id, "template.html")), collapse = "\n")
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
    writeLines("id,page,title,user,description", index_file)
    index_file
  }
}
