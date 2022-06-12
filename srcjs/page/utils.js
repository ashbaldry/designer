import { BasicPage } from './BasicPage';
import { FillPage } from './FillPage';
import { FluidPage } from './FluidPage';
import { BootstrapPage } from './BootstrapPage';
import { NavbarPage } from './NavbarPage';
import { DashboardPage } from './DashboardPage';

var page;

export function createPage () {
    var page_type = $('#settings-page_type input:radio:checked').val();
  
    if (page_type === "basicPage") {
        page = new BasicPage();
    } else if (page_type === "fillPage") {
        page = new FillPage();
    } else if (page_type === "fluidPage") {
        page = new FluidPage();
    } else if (page_type === "bootstrapPage") {
        page = new BootstrapPage();
    } else if (page_type === "navbarPage") {
        page = new NavbarPage();
    } else if (page_type === "dashboardPage") {
        page = new DashboardPage();
    } else {
        page = new BasicPage();
    }

    page.updatePage();
    if (page.enable_on_load) {
        page.enableSortablePage("canvas-page");
    }
    page.updateComponentDropdown();
    return page;
};

export function changePageCheck () {
    if ($("#canvas-page").html() === "" || $("#canvas-page.wrapper .tab-content").html() === "") {
        $("#canvas-page").html("<div></div>");
        createPage();
    } else {
        $("#warning_modal").modal();
    }
};

export function revertPageSelection() {
    $(`#settings-page_type input[value="${page.name}"]`).trigger("click");
}

export function updateTitle (el) {
    const title = $(el.target).val();
    $("#canvas-title").html(title);
    $(".navbar-brand").html(title);
    $(".brand-link").html(title);

    if ($("#canvas-page").data("shinyattributes")) {
        var shiny_atts = $("#canvas-page").data("shinyattributes").replace(/"[^"]+"/, `"${title}"`);
        $("#canvas-page").attr("data-shinyattributes", shiny_atts);
    }
    
    if ($("#canvas-page>.main-header").data("shinyattributes")) {
        var shiny_atts2 = $("#canvas-page>.main-header").data("shinyattributes").replace(/"[^"]+"/, `"${title}"`);
        $("#canvas-page>.main-header").attr("data-shinyattributes", shiny_atts2);
    }
}