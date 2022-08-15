safari_circle <- function(cx, fill, stroke) {
  tags$circle(
    cx = cx,
    cy = "5",
    r = "6",
    fill = fill,
    stroke = stroke,
    `stroke-width` = ".5"
  )
}

createPageItem <- function(page_index) {
  page_type <- names(PAGE_TYPES)[page_index]
  page_id <- unname(PAGE_TYPES[page_index])
  page_desc <- PAGE_DESCRIPTIONS[page_type]

  tags$button(
    class = "btn btn-secondary canvas-page-choice",
    type = "button",
    `data-page` = page_id,
    tags$h4(class = "canvas-choice-header", page_type),
    tags$p(class = "canvas-choice-content", page_desc)
  )
}
