CSSFileInput <- function(id, label) {
  div(
    class = "form-group setting-input",
    tags$label(label),
    div(
      class = "custom-file",
      tags$input(id = id, type = "file", accept = ".css"),
      tags$label(class = "custom-file-label", `for` = id, "Choose file")
    )
  )
}
