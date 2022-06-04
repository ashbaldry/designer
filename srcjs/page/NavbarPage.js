import { Page } from './Page';

export class NavbarPage extends Page {
    page_html = `
        <div class="designer-page-template">
            <nav class="navbar navbar-default navbar-static-top" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <span class="navbar-brand">$title$</span>
                    </div>
                    <ul class="nav navbar-nav" data-tabsetid="$page_id$"></ul>
                </div>
            </nav>
            <div class="container-fluid navbar-page-tabs">
                <div id="canvas-page" class="tab-content"
                     data-tabsetid="$page_id$" data-shinyfunction="navbarPage"
                     data-shinyattributes="title = &quot;$title$&quot;, theme = bslib::bs_theme(4)"></div>
            </div>
        </div>
    `;

    constructor() {
        super();
        const html = this.page_html.replaceAll("$page_id$", this.getTabID());
        this.updatePage(html);
    }
};
