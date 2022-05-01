PAGE_TYPES <- c("basicPage", "bootstrapPage", "fillPage", "fluidPage", "navbarPage")

pageChoices <- function(ns) {
  div(
    `aria-labelledby` = ns("page_type_button"),
    class = "dropdown-menu dropdown-menu-right dropdown-menu-wide page-type-dropdown clickable-dropdown",
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

componentChoices <- function(ns) {
  div(
    id = ns("component"),
    `aria-labelledby` = ns("component_button"),
    class = "dropdown-menu dropdown-menu-right dropdown-menu-wide component-type-dropdown",
    tags$a(
      class = "dropdown-item navbar-tab-item",
      `data-shinyelement` = "tab_panel",
      name = "tab_panel",
      "Tab"
    ),
    lapply(names(COMPONENTS), function(component) {
      first_item <- COMPONENTS[[component]] == COMPONENTS[[1]]
      tags$a(
        class = paste("dropdown-item component-item", if (first_item) "active" else ""),
        `data-shinyelement` = COMPONENTS[[component]],
        name = COMPONENTS[[component]],
        component
      )
    })
  )
}
