import { page } from "../page/utils";
import { Component } from "../component/Component";
import { Column } from "../component/Column";
import { Row } from "../component/Row";

export var canvasBinding = new Shiny.InputBinding();

$.extend(canvasBinding, {
  find: function(scope) {
    return $(scope).find(".page-canvas-shell");
  },
  getValue: function(el) {
    return $(el).find(".page-canvas").html();
  },
  setValue: function(el, value) {
    $(el).find(".page-canvas").html(value);
  },
  subscribe: function(el, callback) {
    const observer = new MutationObserver(function() { callback(); });
    observer.observe(el, {subtree: true, childList: true, attributes: true});
  },
  unsubscribe: function(el) {
    $(el).off(".page-canvas-shell");
  },
  receiveMessage(el, data) {
    this.setValue(el, data);
    $(".canvas-modal").css("display", "none");

    if (page.enable_on_load) {
      page.enableSortablePage("canvas-page");
    }

    page.updateComponentDropdown();
    // Fixes the first flashing component
    new Component().enableSortable();

    const sortable_settings = new Column().sortable_settings;
    const row_sortable_settings = new Row().sortable_settings;
    
    PARENT_DESIGNER_CLASSES.map(x => enableSortableComponent(x, settings = sortable_settings));
    enableSortableComponent("designer-element row", settings = row_sortable_settings)
  }
});

const PARENT_DESIGNER_CLASSES = ["tab-pane", "designer-element col-sm", "designer-element card-body", "shiny-input-panel"];

function enableSortableComponent(selector, settings) {
  document.getElementsByClassName(selector).forEach(el => {
    Sortable.create(el, settings);
  })
}