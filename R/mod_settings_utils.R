PAGE_TYPES <- c("basicPage", "bootstrapPage", "fillPage", "fluidPage")

pageSettings <- function(ns) {
  div(
    `aria-labelledby` = ns("page_type_button"),
    class = "dropdown-menu",
    tags$form(
      class = "px-2",
      div(
        class = "form-group",
        id = ns("page_type"),
        lapply(PAGE_TYPES, function(x) {
          div(
            class = "form-check",
            tags$input(
              class = "form-check-input",
              type = "radio",
              id = ns(x),
              name = "page_types",
              value = x,
              checked = if (x == PAGE_TYPES[1]) NA else NULL
            ),
            tags$label(
              class = "form-check-label",
              `for` = ns(x),
              x
            )
          )
        })
      )
    )
  )
}
