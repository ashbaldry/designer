var canvasPageBinding = new Shiny.InputBinding();
$.extend(canvasPageBinding, {
  find: function(scope) {
    return $(scope).find(".page-canvas");
  },
  getValue: function(el) {
    var id = $(el).attr("id");
    if (el.children[0].dataset.shinyfunction === "navbarPage") {
      return htmlToJSON(document.getElementById(id).querySelector(".tab-content"));
    } else {
      return htmlToJSON(document.getElementById(id).children[0]);
    }
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
    if (el.children[i].dataset.shinyfunction) {
      children.push(htmlToJSON(el.children[i], true));
    }
  }

  var el_json = {
    tagName: el.tagName.toLowerCase(),
    r_function: el.dataset.shinyfunction,
    r_arguments: el.dataset.shinyattributes,
    text: $(el).ignore().text().replaceAll(/\s*\n\s*/g, ""),
    htmlclass: el.className,
    children: children
  };

  if (inner) {
    return el_json;
  } else {
    return JSON.stringify(el_json);
  }
};
