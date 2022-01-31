var canvasPageBinding = new Shiny.InputBinding();
$.extend(canvasPageBinding, {
  find: function(scope) {
    return $(scope).find(".page-canvas");
  },
  getValue: function(el) {
    var id = $(el).attr("id");
    return htmlToJSON(document.getElementById(id));
  },
  setValue: function(el, value) {
    $(el).text(value);
  },
  subscribe: function(el, callback) {
    const observer = new MutationObserver(function() {
      "Callback triggered when observer runs";
      callback();
    });
    observer.observe(el, {subtree: true, childList: true});
  },
  unsubscribe: function(el) {
    $(el).off(".page-canvas");
  }
});

Shiny.inputBindings.register(canvasPageBinding);

$.fn.ignore = function(sel) {
  return this.clone().find(sel || ">*").remove().end();
};

htmlToJSON = function(el, inner = false) {
  var children = [];
  for (var i = 0; i < el.children.length; i++) {
    if (!el.children[i].classList.contains('unmovable-element')) {
      children.push(htmlToJSON(el.children[i], true));
    }
  }

  var el_json = {
    tagName: el.tagName.toLowerCase(),
    r_function: el.dataset.shinyfunction,
    r_arguments: el.dataset.shinyattributes,
    text: $(el).ignore().text(),
    htmlclass: el.className,
    children: children
  };

  if (inner) {
    return el_json;
  } else {
    return JSON.stringify(el_json);
  }
};
