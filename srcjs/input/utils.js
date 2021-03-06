export function htmlToJSON (el, inner = false) {
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

$.fn.ignore = function(sel) {
    return this.clone().find(sel || ">*").remove().end();
};

function getChildrenJSON (el) {
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
