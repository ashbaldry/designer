import { getComponent } from "./utils";
import { Tab } from "./Tab";

export var component;
const tab = new Tab();

export function initComponents () {
    component = new getComponent("header");
    component.updateComponent(true);

    $(".component-settings").on("change keyup", () => {
        if (component.name !== "Tab") component.updateComponent();
    });
    $(".component-comments").on("change blur", () => {
        if (component.name !== "Tab") component.updateComponent();
    });
    $('.component-container').on("mouseover", () => {$(":focus").trigger("blur")});

    $("#sidebar-tab_add").on("click", () => tab.addPage())
    $("#sidebar-tab_delete").on("click", () => tab.deletePage())

    $("#settings-component .dropdown-item").on("click", (el) => {
        component = new getComponent($(el.target).data("shinyelement"));
        component.updateComponent(true);
        $("#settings-component .dropdown-item").removeClass("active");
        $(el.target).addClass("active");
    });    
};
