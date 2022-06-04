import { BasicPage } from './BasicPage';
import { FillPage } from './FillPage';
import { FluidPage } from './FluidPage';
import { BootstrapPage } from './BootstrapPage';
import { NavbarPage } from './NavbarPage';
import { DashboardPage } from './DashboardPage';

export function createPage () {
    var page_type = $('#settings-page_type input:radio:checked').val();
    var page;
  
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

    return page;
};

export function changePageCheck () {
    if ($("#canvas-page").html() === "") {
        $("#canvas-page").html("<div></div>");
        createPage();
    } else {
        $("#warning_modal").modal();
    }
};