import { page } from "../page/utils";

export var canvasBinding = new Shiny.InputBinding();

$.extend(canvasBinding, {
  find: function(scope) {
    return $(scope).find(".page-canvas-shell");
  },
  getValue: function(el) {
    return $(el).find(".page-canvas").html();
  },
  setValue: function(el, value) {
    console.log(value);
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
    } else {
      
    }
    page.updateComponentDropdown();    
  }
});
