export class Page {
    navbar_item_style = "none";
    bs4_item_style = "none";
    enable_on_load = true;
    page_html;
        
    constructor() {
        this.updateComponentDropdown(this.navbar_item_style, this.bs4_item_style);
    };

    updateComponentDropdown (navbar_display, bs4_display) {
        $(".navbar-tab-item").css("display", navbar_display);
        $(".bs4-item").css("display", bs4_display);
        if (navbar_display === "none") {
            $("#settings-component a[name='header']").trigger("click");
        } else {
            $("#settings-component a[name='tab_panel']").trigger("click");
        }
    };

    getPageHTML(html, title = "") {
        return html.replaceAll("$title$", title);
    };

    updatePage(html) {
        const title = $("#canvas-title").html();;
        $(".page-canvas").html(this.getPageHTML(html, title));
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
};