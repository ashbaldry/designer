import { Page } from './Page';

export class FillPage extends Page {
    page_html = `
        <div id="canvas-page" class="designer-page-template" 
             data-shinyfunction="fillPage"
             data-shinyattributes="title = &quot;$title$&quot;, theme = bslib::bs_theme(4)"></div>
    `;
};
