import { htmlToJSON } from "./utils";

var canvasPageBinding = new Shiny.InputBinding();

$.extend(canvasPageBinding, {
  find: function(scope) {
    return $(scope).find(".page-canvas");
  },
  getValue: function(el) {
    return htmlToJSON(document.getElementById("canvas-page"));
  },
  setValue: function(el, value) {
    $(el).text(value);
  },
  subscribe: function(el, callback) {
    const observer = new MutationObserver(function() { callback(); });
    observer.observe(el, {subtree: true, childList: true, attributes: true});
  },
  unsubscribe: function(el) {
    $(el).off(".page-canvas");
  }
});

Shiny.inputBindings.register(canvasPageBinding);
