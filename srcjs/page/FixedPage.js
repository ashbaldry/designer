import { Page } from './Page'

export class FixedPage extends Page {
  name = 'fixedPage'
  page_html = `
        <div id="canvas-page" class="designer-page-template container" 
             data-shinyfunction="fixedPage"
             data-shinyattributes="title = &quot;$title$&quot;, theme = bslib::bs_theme(4)"></div>
    `
};
