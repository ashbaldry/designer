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
        
        const component = this.navbar_item_style === "none" ? "header" : "tab";
        if (!$(`#sidebar-${component}-body`).hasClass("show")) {
            $(`#sidebar-${component}-header button`).trigger("click");
        }
    };

    getPageHTML(html, title = "") {
        return html.replaceAll("$page_id$", this.getTabID()).replaceAll("$title$", title);
    };

    updatePage() {
        const title = $("#canvas-title").html();
        $(".page-canvas").html(this.getPageHTML(this.page_html, title));
    };

    enableSortablePage(selector, by = "id") {
        if (by === "id") {
            Sortable.create(document.getElementById(selector), {
                group: {
                    name: "shared",
                    put: function (_to, _from, clone) {
                        return !clone.classList.contains("col-sm");
                    }
                }
            });
        } else {
            document.getElementsByClassName(selector).forEach(el => {
                Sortable.create(el, {
                    group: {
                        name: "shared",
                        put: function (_to, _from, clone) {
                            return !clone.classList.contains("col-sm");
                        }
                    }
                });
            })
        }
    };

    getTabID () {
        return Math.round(Math.random() * 8999 + 1000);
    };
};