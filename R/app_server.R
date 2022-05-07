#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'
#' @noRd
appServer <- function(input, output, session) {
  observeEvent(input$help, {
    guide$init()$start()
  })

  page_html <- CanvasModuleServer("canvas")

  SidebarModuleServer("sidebar")

  CodeModuleServer("settings-code", ui_code = page_html)
}

guide <- cicerone::Cicerone$new(
)$step(
  el = "settings-page_type_button",
  title = "Page Type",
  description = paste(
    "First thing to do is select the type of page:<ul>",
    "<li>Fluid Page is the most commonly used page for shiny applications</li>",
    "<li>Navigation Bar Page enables multiple tabs to be included in the application</li>",
    "<li>Fill Page will set the height and width to the whole brower window</li>",
    "<li>Basic Page and Bootstrap Page are for those who will use more HTML/CSS after the application is designed</li>",
    "</ul>"
  )
)$step(
  el = "settings-component_button",
  title = "Components",
  description = paste(
    "Components are the bread and butter of building a UI.",
    "The selection of components include rows and columns for designing the layout,",
    "and the all important inputs and outputs."
  )
)$step(
  el = "component_settings",
  title = "Component Settings",
  description = paste(
    "Once you have selected a component, some customisation is available,",
    "such as the text in the component and how wide it should be."
  )
)$step(
  el = "component_delete",
  title = "Delete Component",
  description = paste(
    "If you include something in the UI that ou no longer need, drag it here for it to be removed."
  )
)$step(
  el = "settings-code_button",
  title = "R Code",
  description = "When you are happy with the layout of your code, this will contain the R code to replicate the UI below."
)$step(
  el = "settings-options_button",
  title = "Additional Options",
  description = paste(
    "Here you can toggle the development tools, such as labels and the dotted borders,",
    "as well as changing the title and a full page preview of the application."
  )
)
