#' Warning Modal
#'
#' @description
#' Creates a modal to warn the user about the consequences of a particular action they're
#' about to make.
#'
#' @param id ID to give to the modal
#' @param text Character string of the body of the warning message
#' @param confirm_id,cancel_id HTML ID references for the confirm and cancel buttons
#' @param confirm_text,cancel_text Labels to give the confirm and cancel buttons
#'
#' @return HTML for a modal
#'
#' @noRd
warningModal <- function(id, text, confirm_id, confirm_text, cancel_id, cancel_text) {
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
          p(text)
        ),
        div(
          class = "modal-footer",
          tags$button(
            id = cancel_id,
            type = "button",
            class = "btn btn-secondary",
            `data-dismiss` = "modal",
            `data-bs-dismiss` = "modal",
            shiny::icon("xmark"),
            cancel_text
          ),
          tags$button(
            id = confirm_id,
            type = "button",
            class = "btn btn-primary",
            `data-dismiss` = "modal",
            `data-bs-dismiss` = "modal",
            shiny::icon("check"),
            confirm_text
          )
        )
      )
    )
  )
}

screenshtButton <- function(btn_id, ...) {
  btn <- shinyscreenshot::screenshotButton(
    selector = ".designer-page-template",
    label = "Snapshot UI",
    filename = "ui_wireframe",
    ...
  )
  btn[[2L]]$attribs$class <- sub(" btn-default", "", btn[[2L]]$attribs$class)
  btn[[2L]]$attribs$onclick <- sub(btn[[2L]]$attribs$id, btn_id, btn[[2L]]$attribs$onclick, fixed = TRUE)
  btn[[2L]]$attribs$id <- btn_id
  btn
}
