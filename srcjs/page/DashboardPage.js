import { Page } from './Page';

export class DashboardPage extends Page {
    page_html = `
        <div id="canvas-page" class="wrapper designer-page-template"
             data-shinyfunction="bs4Dash::dashboardPage" data-shinyattributes="title = &quot;$title$&quot;">
            <nav data-fixed="false" class="main-header navbar navbar-expand navbar-white navbar-light"
                 data-shinyfunction="bs4Dash::dashboardHeader" data-shinyattributes="title = &quot;$title$&quot;">
                <ul class="navbar-nav">
                    <a class="nav-link" data-widget="pushmenu" href="#">
                        <i class="fa fa-bars" role="presentation" aria-label="bars icon"></i>
                    </a>
                </ul>
                <ul class="navbar-nav ml-auto navbar-right"></ul>
            </nav>
            <aside id="sidebarId" data-fixed="true" data-minified="true" data-collapsed="false"
                   data-disable="FALSE" class="main-sidebar sidebar-dark-primary elevation-4"
                   data-shinyfunction="bs4Dash::dashboardSidebar">
                <div class="brand-link">$title$</div>
                <div class="sidebar" id="sidebarItemExpanded">
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column sidebar-menu nav-child-indent"
                            data-widget="treeview" role="menu" data-accordion="true" data-shinyfunction="bs4Dash::sidebarMenu">
                            <div id="tabs_$page_id$" class="sidebarMenuSelectedTabItem"></div>
                        </ul>
                    </nav>
                </div>
            </aside>
            <div class="content-wrapper" data-shinyfunction="bs4Dash::dashboardBody">
                <section class="content">
                    <div class="tab-content"></div>
                </section>
            </div>
        </div>
    `;

    constructor() {
        super();
        this.updatePage(this.page_html);
    }
};
