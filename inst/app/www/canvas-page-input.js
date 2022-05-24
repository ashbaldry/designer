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
    const observer = new MutationObserver(function() {
      "Callback triggered when observer runs";
      callback();
    });
    observer.observe(el, {subtree: true, childList: true, attributes: true});
  },
  unsubscribe: function(el) {
    $(el).off(".page-canvas");
  }
});

Shiny.inputBindings.register(canvasPageBinding);

$.fn.ignore = function(sel) {
  return this.clone().find(sel || ">*").remove().end();
};

getChildrenJSON = function(el) {
  var children = [];
  for (var i = 0; i < el.children.length; i++) {
    if (el.children[i].dataset.shinyfunction) {
      children.push(htmlToJSON(el.children[i], true));
    } else if (el.children[i].children.length) {
      var child_content = getChildrenJSON(el.children[i]);
      if (child_content.length) {
        children = children.concat(child_content);
      }
    }
  }
  return children;
};

htmlToJSON = function(el, inner = false) {
  var children = getChildrenJSON(el);

  var el_json = {
    tagName: el.tagName.toLowerCase(),
    r_function: el.dataset.shinyfunction,
    r_arguments: el.dataset.shinyattributes,
    r_comments: el.dataset.shinycomments,
    text: $(el).ignore().text().replace(/\s*\n\s*/g, ""),
    htmlclass: el.className,
    children: children
  };

  if (inner) {
    return el_json;
  } else {
    return JSON.stringify(el_json);
  }
};
