import { Page } from './Page';

export class BootstrapPage extends Page {
    name = "bootstrapPage";
    page_html = `
        <div id="canvas-page" class="designer-page-template container-fluid" 
             data-shinyfunction="bootstrapPage"
             data-shinyattributes="title = &quot;$title$&quot;, theme = bslib::bs_theme(4)"></div>
    `;
};
