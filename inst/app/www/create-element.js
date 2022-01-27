$(document).ready(function() {
  $("#sidebar-component").on("change", updateDesignerElement);
  $("#sidebar-column_settings").on("change", updateDesignerElement);
  updateDesignerElement();
});

updateDesignerElement = function() {
  var component = $("#sidebar-component").val();
  var component_html = designerElements[component]();
  var container = document.getElementById("sidebar-container");
  $(".component-container").html(component_html);

  var new_element = container.children[0];
  var sortable_settings = designerSortableSettings[component];

  new Sortable(container, {
    group: {
      name: "shared",
      pull: "clone",
      put: false
    },
    animation: 150,
    onClone: function(evt) {
      var sortable_settings = designerSortableSettings[$("#sidebar-component").val()];
      if (sortable_settings) {
        Sortable.create(evt.item, sortable_settings);
      }
    }
  });

  if (sortable_settings) {
    Sortable.create(new_element, sortable_settings);
  }
};

var designerElements = {
  Button: function() {
    var el = document.createElement("button");
    $(el).addClass("designer-element");
    $(el).attr("data-shinyfunction", "actionButton");
    $(el).html("Button");
    return el;
  },

  Header: function() {
    var el = document.createElement("h1");
    $(el).addClass("designer-element");
    $(el).attr("data-shinyfunction", "h1");
    $(el).html("H1 Header");
    return el;
  },

  Row: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element row");
    $(el).attr("data-shinyfunction", "fluidRow");
    var content = document.createElement("p");
    $(content).html("Row");
    $(el).html(content);
    return el;
  },

  Column: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element col-sm");
    $(el).addClass("col-sm-" + $("#sidebar-column_width").val());
    var offset = $("#sidebar-column_offset").val();
    if (offset > 0) {
      $(el).addClass("offset-md-" + offset + " col-sm-offset-" + offset);
    }
    $(el).attr("data-shinyfunction", "column");
    $(el).html("Column");
    return el;
  }
};

var designerSortableSettings = {
  Button: null,
  Header: null,
  Row: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return clone.classList.contains("col-sm");
      }
    }
  },
  Column: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !clone.classList.contains("col-sm");
      }
    }
  }
};
