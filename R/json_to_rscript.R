#' Convert JSON to R Calls
#'
#' @description
#' Using the JSON string generated from the canvas, convert into a list that can be easily parsed by R
#' into a script to recreate the UI designed in the app
#'
#' @param json A string containing JSON code of the "App UI" page
#' @param module_name Optional string the allows the function to be written as a module
#'
#' @return A string that can be written to a \code{ui.R} file
#'
#' @noRd
jsonToRScript <- function(json, module_name = NULL) {
  if (is.null(json)) return("")

  valid_json <- jsonlite::validate(json)

  if (valid_json) {
    html_list <- jsonlite::fromJSON(json, simplifyDataFrame = FALSE)
    htmlToRScript(html_list, module_name = module_name)
  } else {
    message(attr(valid_json, "err"), "Returning NA")
    NA_character_
  }
}

#' Convert HTML Info to R Calls
#'
#' @description
#' Recursively looking into a list of HTML information to create R code that will produce the HTML seen in the app.
#'
#' @param html_list A list containing information about the tags, relevant R functions and extra arguments to
#' give to each HTML tag
#' @param indent The number of spaces to indent each subsequent call
#' @param module_name Optional string the allows the function to be written as a module
#'
#' @return A string that can be written to a \code{ui.R} file
#'
#' @noRd
htmlToRScript <- function(html_list, indent = 0L, module_name = NULL) {
  if (is.null(html_list$r_function)) return("")

  module_home <- indent == 0L && is.character(module_name)
  indent_space <- paste0(rep(" ", indent), collapse = "")
  indent_text_space <- paste0(rep(" ", indent + 2L), collapse = "")

  if ("children" %in% names(html_list) && length(html_list$children) > 0L) {
    sub_indent <- indent + if (module_home) 4L else 2L
    sub_rfuncs <- lapply(html_list$children, htmlToRScript, indent = sub_indent)
    sub_rfuncs <- paste0(paste(sub_rfuncs, collapse = ",\n"), "\n")
  } else {
    sub_rfuncs <- ""
  }

  if (is.null(html_list$text) || html_list$text == "") {
    html_text <- ""
  } else {
    html_text <- paste0(
      indent_text_space,
      "\"", html_list$text, "\"",
      if (sub_rfuncs == "") "" else ",",
      "\n"
    )
  }

  if (is.null(html_list$r_arguments)) {
    rfunc_arguments <- ""
  } else {
    rfunc_arguments <- paste0(
      indent_text_space,
      gsub(",(?![^\\(]+\\)) ", paste0(",\n", indent_text_space), html_list$r_arguments, perl = TRUE),
      if (sub_rfuncs == "" && html_text == "") "" else ",",
      "\n"
    )
  }

  if (is.null(html_list$r_comments)) {
    r_comments <- ""
  } else {
    r_comments <- paste0(indent_space, "# ", strsplit(html_list$r_comments, "\n")[[1L]], "\n", collapse = "")
  }

  if (module_home) {
    r_comments <- paste0("#' ", module_name, " Module\n#' @export\n")
    rfunc <- paste0(gsub(" ", "", module_name), "UI <- function(id) {\n  tagList(\n")
    rfunc_arguments <- NULL
    rfunc_end <- "  )\n}"
  } else {
    rfunc <- paste0(indent_space, html_list$r_function, "(\n")
    rfunc_end <- paste0(indent_space, ")")
  }

  paste0(
    r_comments,
    rfunc,
    rfunc_arguments,
    html_text,
    sub_rfuncs,
    rfunc_end,
    collapse = ""
  )
}
