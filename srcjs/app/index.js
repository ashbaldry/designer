import { initPage } from "../page/init";
import { initSettings } from "./settings";
import { initComponents } from "../component/init";
import { canvasPageBinding } from "../input/canvas-page-input";

$(function() {
    initPage();
    initComponents();
    initSettings();

    $(".help-icon").tooltip({ boundary: "window", placement: "right" });

    bsCustomFileInput.init();

    Sortable.create(document.getElementById("sidebar-bin"), {
        group: {
            name: "shared",
            pull: false
        },
        handle: ".designer-element",
        draggable: ".designer-element",
        onAdd: function (evt) {
            this.el.removeChild(evt.item);
        }
    });
});

Shiny.inputBindings.register(canvasPageBinding);
