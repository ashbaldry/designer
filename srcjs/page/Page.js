export class Page {
    name;
    navbar_item_style = "none";
    bs4_item_style = "none";
    enable_on_load = true;
    page_html;
        
    constructor() {};

    updateComponentDropdown () {
        $(".navbar-tab-item").css("display", this.navbar_item_style);
        $(".bs4-item").css("display", this.bs4_item_style);
        if (this.navbar_item_style === "none") {
            $("#settings-component a[name='header']").trigger("click");
        } else {
            $("#settings-component a[name='tab_panel']").trigger("click");
        }
    };

    getPageHTML(html, title = "") {
        return html.replaceAll("$page_id$", this.getTabID()).replaceAll("$title$", title);
    };

    updatePage() {
        const title = $("#canvas-title").html();
        $(".page-canvas").html(this.getPageHTML(this.page_html, title));
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

    getTabID () {
        return Math.round(Math.random() * 8999 + 1000);
    }    
};