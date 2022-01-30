var canvasPageBinding = new Shiny.InputBinding();
$.extend(canvasPageBinding, {
  find: function(scope) {
    return $(scope).find(".canvas-page");
  },
  getValue: function(el) {
    var id = $(el).attr("id");
    return htmlToJSON(document.getElementById(id));
  },
  setValue: function(el, value) {
    $(el).text(value);
  },
  subscribe: function(el, callback) {
    $(el).on("change.canvasPageBinding", function(e) {
      callback();
    });
  },
  unsubscribe: function(el) {
    $(el).off(".canvas-page");
  }
});

Shiny.inputBindings.register(canvasPageBinding);
