import { getComponent } from "./utils";

export var component;

export function initComponents () {
    component = new getComponent("header");
    component.updateComponent(true);

    $(".component-settings").on("change keyup", () => component.updateComponent());
    $(".component-comments").on("change blur", () => component.updateComponent());
    $('.component-container').on("mouseover", () => {$(":focus").trigger("blur")});

    $("#sidebar-tab_add").on("click", () => component.addPage())
    $("#sidebar-tab_delete").on("click", () => component.deletePage())

    $(".accordion .card-header .btn").on("click", (el) => {
        $(el.target).closest('.card').find('form').trigger("reset");
        component = new getComponent($(el.target).data("shinyelement"));
        component.updateComponent(true);
    });
};
