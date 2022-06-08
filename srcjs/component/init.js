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

    $("#settings-component .dropdown-item").on("click", (el) => {
        component = new getComponent($(el.target).data("shinyelement"));
        component.updateComponent(true);
        $("#settings-component .dropdown-item").removeClass("active");
        $(el.target).addClass("active");
    });    
};
