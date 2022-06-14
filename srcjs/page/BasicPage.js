import { Page } from './Page';

export class BasicPage extends Page {
    name = "basicPage";
    page_html = `
        <div id="canvas-page" class="designer-page-template container-fluid" data-shinyfunction="basicPage"></div>
    `;
};
