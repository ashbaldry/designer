import { BasicPage } from './BasicPage';
import { FluidPage } from './FluidPage';

export function createPage () {
    var page_type = $('#settings-page_type input:radio:checked').val();
    var page;
  
    if (page_type === "basicPage") {
        page = new BasicPage();
    } else if (page_type === "fluidPage") {
        page = new FluidPage();
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