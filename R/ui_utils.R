#' Warning Modal
#'
#' @description
#' Creates a modal when switching page type in case a user is about to delete the template, giving them a
#' warning about deleting the page.
#'
#' @param id ID to give to the modal
#'
#' @return HTML for a modal
#'
#' @noRd
warningModal <- function(id) {
  div(
    class = "modal fade",
    id = id,
    tabindex = "-1",
    `aria-hidden` = "true",
    `data-bs-keyboard` = "false",
    `data-keyboard` = "false",
    div(
      class = "modal-dialog",
      role = "document",
      div(
        class = "modal-content",
        div(
          class = "modal-header",
          h5(class = "modal-title", "Warning!")
        ),
        div(
          class = "modal-body",
          p("Changing page type will clear all contents of your design. Do you wish to continue?")
        ),
        div(
          class = "modal-footer",
          tags$button(
            id = "cancel_reset",
            type = "button",
            class = "btn btn-secondary",
            `data-dismiss` = "modal",
            `data-bs-dismiss` = "modal",
            shiny::icon("xmark"),
            "No"
          ),
          tags$button(
            id = "confirm_reset",
            type = "button",
            class = "btn btn-primary",
            `data-dismiss` = "modal",
            `data-bs-dismiss` = "modal",
            shiny::icon("check"),
            "Yes"
          )
        )
      )
    )
  )
}

screenshtButton <- function(...) {
  btn <- shinyscreenshot::screenshotButton(
    id = "canvas-page",
    label = "Snapshot UI",
    filename = "ui_wireframe",
    ...
  )
  btn[[2L]]$attribs$class <- sub(" btn-default", "", btn[[2L]]$attribs$class)
  btn
}
