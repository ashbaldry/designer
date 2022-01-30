jsonToRScript <- function(json) {
  html_list <- jsonlite::fromJSON(json, simplifyDataFrame = FALSE)

  htmlToRScript(html_list$children[[1]])
}

htmlToRScript <- function(html_list, indent = 0) {
  if ("children" %in% names(html_list) && length(html_list$children) > 0) {
    sub_rfuncs <- lapply(html_list$children, htmlToRScript, indent = indent + 2)
    sub_rfuncs <- paste0(paste(sub_rfuncs, collapse = ",\n"), "\n")
  } else {
    sub_rfuncs <- ""
  }

  indent_space <- paste0(rep(" ", indent), collapse = "")

  if (!is.null(html_list$text) && html_list$text != "") {
    indent_text_space <- paste0(rep(" ", indent + 2), collapse = "")
    html_text <- paste0(
      indent_text_space,
      "\"", html_list$text, "\"",
      if (sub_rfuncs != "") "," else "",
      "\n"
    )
  } else {
    html_text <- character(0)
  }

  paste0(
    indent_space, html_list$r_function, "(\n",
    html_text,
    sub_rfuncs,
    indent_space, ")",
    collapse = ""
  )
}
