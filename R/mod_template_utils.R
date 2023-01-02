#' Store Saved Prototype
#'
#' @description
#' Saves the current template in the designer cache, along with metadata
#'
#' @param html Character string of the HTML that is present in the canvas
#' @param page Type of page selected for the template (used to restore correct value on restart)
#' @param title Short title of the template
#' @param desc Longer description of the template
#' @param user Person who created the template
#'
#' @importFrom utils read.csv write.csv write.table
#' @noRd
save_template <- function(html, page = NULL, title = NULL, desc = NULL, user = NULL,
                          session = shiny::getDefaultReactiveDomain()) {
  cache_dir <- find_cache_dir()
  template_index <- get_template_index()

  template_id <- create_random_id()
  while (template_id %in% template_index$id) {
    template_id <- create_random_id()
  }

  template_dir <- file.path(cache_dir, template_id)
  dir.create(template_dir, showWarnings = FALSE)
  cat(paste0(html, "\n"), file = file.path(template_dir, "template.html"))

  take_screenshot(id = template_id, file.path(cache_dir, "screenshots"), session = session)

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

update_template <- function(html, id, session = shiny::getDefaultReactiveDomain()) {
  cache_dir <- find_cache_dir()
  take_screenshot(id = id, file.path(cache_dir, "screenshots"), session = session)
  cat(paste0(html, "\n"), file = file.path(cache_dir, id, "template.html"))
}

read_template <- function(id) {
  cache_dir <- find_cache_dir()
  paste0(readLines(file.path(cache_dir, id, "template.html")), collapse = "\n")
}

delete_template <- function(id) {
  cache_dir <- find_cache_dir()
  template_index <- get_template_index()

  if (id %in% template_index$id) {
    unlink(file.path(cache_dir, id), recursive = TRUE)
    template_index <- template_index[template_index$id != id, ]

    write.csv(
      template_index,
      file.path(cache_dir, "index.csv"),
      col.names = TRUE,
      row.names = FALSE
    )
  }
}

#' Take Template Screenshot
#'
#' @description
#'
#' @noRd
take_screenshot <- function(id, screenshot_dir, session = shiny::getDefaultReactiveDomain()) {
  if (!dir.exists(screenshot_dir)) {
    dir.create(screenshot_dir)
  }

  session$sendCustomMessage("prepare_canvas_screenshot", NULL)
  shinyscreenshot::screenshot(
    selector = "#canvas-page",
    filename = id,
    download = FALSE,
    server_dir = screenshot_dir
  )
  session$sendCustomMessage("revert_canvas_screenshot", NULL)
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
