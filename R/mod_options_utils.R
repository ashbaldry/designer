CSSFileInput <- function(id, label) {
  div(
    class = "form-group",
    tags$label(label),
    div(
      class = "custom-file",
      tags$input(id = id, type = "file", class = "custom-file-input", accept = ".css"),
      tags$label(class = "custom-file-label", `for` = id, "Choose file")
    )
  )
}
