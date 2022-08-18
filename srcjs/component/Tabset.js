import { Component } from "./Component";

export class Tabset extends Component {
    _item = 1;
    id;
    html = `
        <div class="tabbable designer-element tabset-designer-component">
            <ul class="nav nav-$type$" data-tabsetid="$id$"></ul>
            <div class="tab-content" data-tabsetid="$id$" data-shinyfunction="$shiny_func$" data-shinyattributes="$shiny_attribs$"></div>
        </div>`;
    is_tab = true;

    constructor() {
        super()
        this.id = this.getTabID();
    };

    createComponent() {
        const type = $("#sidebar-tabset-type").val();
        
        const is_dash_page = this.getPageType() === "dashboardPage";
        const shiny_func = is_dash_page ? "bs4Dash::" : "tabsetPanel";

        let shiny_attribs = "";
        if (is_dash_page) {
            shiny_attribs = `type = &quot;${type}&quot;`;
        } else {
            shiny_attribs = `type = &quot;${type}&quot;`;
        }

        return this.replaceHTMLPlaceholders(this.html, {
            id: this.id,
            type: type,
            shiny_func: shiny_func,
            shiny_attribs: shiny_attribs
        });
    };


    getPageType() {
        return $('#settings-page_type input:radio:checked').val();
    };

    addPage() {
        const page_type = this.getPageType();

        const tab_name = $("#sidebar-tabset-name").val();
        let tab_value = $("#sidebar-tabset-value").val();
        if (tab_value === "") {
          tab_value = tab_name;
        }       

        $("#sidebar-tabset-alert div").alert("close");

        if (page_type === "dashboardPage") {
            this.addMenuItem(tab_name, tab_value);
        } else {
            this.addTab(tab_name, tab_value);
        }
    };

    addTab(tab_name, tab_value) {
        const nav_panel = $(".component-container>.tabbable>.nav");
        const nav_id = nav_panel.id;

        const tab_panel = $(".component-container>.tabbable>.tab-content");
        const active_class = tab_panel.html() === "" ? "active" : "";

        const tab_icon = $("#sidebar-tabset-icon").val();
        const icon_r = tab_icon === "" ? "" : `, icon = icon(&quot;${tab_icon}&quot;)`;
        const icon_class = tab_icon === "" ? "" : $("#sidebar-tabset-icon option").html().includes("fab") ? "fab" : "fa";
        const icon_html = tab_icon === "" ? "" : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i>`;
        
        nav_panel.append(`
            <li class="${active_class}">
                <a href="#tab-${nav_id}-${this._item}" data-toggle="tab"
                   data-bs-toggle="tab" data-value="${tab_value}" data-name="${tab_name}">
                   ${icon_html}
                   ${tab_name}
                </a>
            </li>
        `);

        tab_panel.append(`
            <div class="tab-pane ${active_class}" data-value="${tab_value}" id="tab-${nav_id}-${this._item}"
                 data-shinyfunction="tabPanel" data-shinyattributes="title = &quot;${tab_name}&quot;, value = &quot;${tab_value}&quot;${icon_r}"></div>
        `);

        this.enableSortablePage(`tab-${nav_id}-${this._item}`);
        this._item = this._item + 1;
    };

    addMenuItem(tab_name, tab_value) {
        const tab_panel = $("section.content .tab-content");
        const active_class = tab_panel.html() === "" ? "active" : "";

        const tab_icon = $("#sidebar-tabset-icon").val();
        const icon_r = tab_icon === "" ? "" : `, icon = icon(&quot;${tab_icon}&quot;)`;
        const icon_class = tab_icon === "" ? "" : $("#sidebar-tabset-icon option").html().includes("fab") ? "fab" : "fa";
        const icon_html = tab_icon === "" ? "" : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} nav-icon" role="presentation"></i>`;        
        
        $(".sidebarMenuSelectedTabItem").before(`
            <li class="nav-item" data-shinyfunction="bs4Dash::menuItem"
                data-shinyattributes="text = &quot;${tab_name}&quot;, tabName = &quot;${tab_value}&quot;${icon_r}">
                <a class="nav-link ${active_class}" id="tab-${tab_value}" href="#"
                   data-toggle="tab" data-target="#shiny-tabset-${tab_value}"
                   data-value="${tab_value}" data-name="${tab_name}">
                   ${icon_html}
                    <p>${tab_name}</p>
                </a>
            </li>
        `);

        if (!$(".sidebarMenuSelectedTabItem").attr("data-value")) {
            $(".sidebarMenuSelectedTabItem").attr("data-value", tab_value);
        }

        tab_panel.append(`
            <div role="tabpanel" data-value="${tab_value}" id="shiny-tabset-${tab_value}"
                 class="tab-pane container-fluid ${active_class}"
                    data-shinyfunction="bs4Dash::tabItem" data-shinyattributes="tabName = &quot;${tab_value}&quot;"></div>
        `);

        this.enableSortablePage(`shiny-tabset-${tab_value}`);
    };

    enableSortablePage (id) {
        Sortable.create(document.getElementById(id), {
            group: {
                name: "shared",
                put: function (_to, _from, clone) {
                    return !clone.classList.contains("col-sm");
                }
            }
        });
    };  

    checkDuplicateNames(tab_name, page_type) {
        if ($(this.getNameIdentifier(tab_name, page_type)).length > 0) {
            $("#sidebar-tabset-alert").html(`
                <div class="alert alert-danger" role="alert">
                    ${tab_name} is the name of an existing menu item. Please choose a unique name
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            return true;
        } else {
            return false;
        }
    };

    getNameIdentifier(tab_name, page_type) {
        if (page_type === "dashboardPage") {
            return `ul.sidebar-menu a[data-name='${tab_name}']`;
        } else {
            return `ul.navbar-nav a[data-name='${tab_name}']`;
        }
    };

    checkDuplicateIDs(tab_value, page_type) {
        if ($(this.getValueIdentifier(tab_value, page_type)).length > 0) {
            $("#sidebar-tabset-alert").html(`
                <div class="alert alert-danger" role="alert">
                    ${tab_value} is the ID of an existing menu item. Please choose a unique ID
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
            return true;
        } else {
            return false;
        }
    };

    getValueIdentifier(tab_value, page_type) {
        if (page_type === "dashboardPage") {
            return `ul.sidebar-menu a[data-value='${tab_value}']`;
        } else {
            return `ul.navbar-nav a[data-value='${tab_value}']`;
        }
    };

    deletePage() {
        const page_type = this.getPageType();
        const tab_name = $("#sidebar-tabset-name").val();
        let tab_value = $("#sidebar-tabset-value").val();

        if (this.checkMissingName(tab_name, page_type)) {
            return true;
        } else if ($(this.getNameIdentifier(tab_name, page_type)).length > 1 && tab_value === "") {
            $("#sidebar-tabset-alert").html(`
                <div class="alert alert-danger" role="alert">
                    Duplicate tabs contain the name "${tab_name}" and no value has been provided. Please provide the specific ID of the tab to delete.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);   
            return true;
        }

        $("#sidebar-tabset-alert div").alert("close");

        if (page_type === "dashboardPage") {
            tab_value = tab_value === "" ? $(`ul.nav a[data-name='${tab_name}']`).data("value") : tab_value;
            this.deleteMenuItem(tab_value);
        } else {
            tab_value = tab_value === "" ? $(`ul.nav a[data-name='${tab_name}']`).data("value") : tab_value;
            this.deleteTab(tab_value);
        }
    };

    deleteTab(tab_value) {
        $(`ul.nav a[data-value='${tab_value}']`).parent().remove();
        $(`.tab-content .tab-pane[data-value='${tab_value}']`).remove();
    };

    deleteMenuItem(tab_value) {
        $(`#tab-${tab_value}`).parent().remove();
        $(`#shiny-tabset-${tab_value}`).remove();
    };    
    
    checkMissingName(tab_name, page_type) {
        if ($(this.getNameIdentifier(tab_name, page_type)).length > 0) {
            return false;
        } else {
            $("#sidebar-tabset-alert").html(`
                <div class="alert alert-danger" role="alert">
                    Unable to find a tab with the name "${tab_name}"
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);            
            return true;
        }
    };

    getTabID () {
        return Math.round(Math.random() * 8999 + 1000);
    };
}
