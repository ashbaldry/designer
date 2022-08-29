export function htmlToJSON (el, inner = false) {
  const children = getChildrenJSON(el)

  const jsonElement = {
    tagName: el.tagName.toLowerCase(),
    r_function: el.dataset.shinyfunction,
    r_arguments: el.dataset.shinyattributes,
    r_comments: el.dataset.shinycomments,
    text: $(el).ignore().text().replace(/\s*\n\s*/g, ''),
    htmlclass: el.className,
    children
  }

  if (inner) {
    return jsonElement
  } else {
    return JSON.stringify(jsonElement)
  }
};

$.fn.ignore = function (sel) {
  return this.clone().find(sel || '>*').remove().end()
}

function getChildrenJSON (el) {
  let children = []
  for (let i = 0; i < el.children.length; i++) {
    if (el.children[i].dataset.shinyfunction) {
      children.push(htmlToJSON(el.children[i], true))
    } else if (el.children[i].children.length) {
      const childContent = getChildrenJSON(el.children[i])
      if (childContent.length > 0) {
        children = children.concat(childContent)
      }
    }
  }
  return children
};
