$(document).ready(function() {
  $("#sidebar-component").on("change", updateDesignerElement);
  $("#sidebar-column_settings").on("change", updateDesignerElement);
  $("#sidebar-header_settings").on("change", updateDesignerElement);
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
    draggable: ".designer-element",
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
    var el = document.createElement($("#sidebar-header_tag").val());
    $(el).addClass("designer-element");
    $(el).attr("data-shinyfunction", $("#sidebar-header_tag").val());
    $(el).html($("#sidebar-header_value").val());
    return el;
  },

  Row: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element row");
    $(el).attr("data-shinyfunction", "fluidRow");

    var p = document.createElement("p");
    $(p).addClass("unmovable-element");
    $(p).html("Row");
    $(el).html(p);
    return el;
  },

  Column: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element col-sm");

    var width = $("#sidebar-column_width").val();
    $(el).addClass("col-sm-" + width);

    var offset = $("#sidebar-column_offset").val();
    if (offset > 0) {
      $(el).addClass("offset-md-" + offset + " col-sm-offset-" + offset);
    }

    if (offset > 0) {
      $(el).attr("data-shinyattributes", "width = " + width + ", offset = " + offset);
    } else {
      $(el).attr("data-shinyattributes", "width = " + width);
    }


    $(el).attr("data-shinyfunction", "column");

    var p = document.createElement("p");
    $(p).addClass("unmovable-element");
    $(p).html("Column");
    $(el).html(p);
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
