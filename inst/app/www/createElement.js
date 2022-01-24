$(document).ready(function() {
  $(".create-button").on("click", updateDesignerElement);
});

updateDesignerElement = function() {
  var component = $("#sidebar-component").val();
  var component_html = createDesignerElement(component);
  $(".component-container").html(component_html);
  $(".component-container .designer-element").draggable({
    helper: "clone",
    cancel : ".no-drag"
  });
};

createDesignerElement = function(component) {
  var html;

  switch(component) {
    case "Button":
      html = designerButton();
      break;
    case "Header":
      html = designerHeader();
      break;
    case "Row":
      html = designerRow();
      break;
    case "Column":
      html = designerColumn();
      break;
    default:
      html = designerElement();
      break;
  }

  return html;
};

designerButton = function() {
  var el = document.createElement("button");
  $(el).addClass("designer-element");
  $(el).attr("data-shinyfunction", "actionButton");
  $(el).html("Button");
  return el;
};

designerHeader = function() {
  var el = document.createElement("h1");
  $(el).addClass("designer-element");
  $(el).attr("data-shinyfunction", "h1");
  $(el).html("H1 Header");
  return el;
};

designerElement = function() {
  var el = document.createElement("div");
  $(el).addClass("designer-element");
  $(el).attr("data-shinyfunction", "div");
  $(el).html("Element");
  return el;
};

designerRow = function() {
  var el = document.createElement("div");
  $(el).addClass("designer-element row");
  $(el).attr("data-shinyfunction", "fluidRow");
  $(el).html("Row");
  return el;
};

designerColumn = function() {
  var el = document.createElement("div");
  $(el).addClass("designer-element col-sm-3");
  $(el).attr("data-shinyfunction", "column");
  $(el).html("Column");
  return el;
};
