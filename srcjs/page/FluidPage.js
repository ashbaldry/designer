import { Page } from './Page'

export class FluidPage extends Page {
  name = 'fluidPage'
  page_html = `
        <div id="canvas-page" class="designer-page-template container-fluid" 
             data-shinyfunction="fluidPage"
             data-shinyattributes="title = &quot;$title$&quot;, theme = bslib::bs_theme(4)"></div>
    `
};
