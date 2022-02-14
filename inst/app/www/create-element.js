$(document).ready(function() {
  $("#sidebar-component").on("change", () => updateDesignerElement(update_sortable = true));
  $("#sidebar-column_settings").on("change", updateDesignerElement);
  $("#sidebar-header_settings").on("change", updateDesignerElement);
  $("#sidebar-button_settings").on("change", updateDesignerElement);
  updateDesignerElement(true);
});

updateDesignerElement = function(update_sortable = false) {
  $(".component-container").html(null);
  var component = $("#sidebar-component").val();
  var component_html = designerElements[component]();
  var container = document.getElementById("sidebar-container");
  $(".component-container").html(component_html);

  if (update_sortable) {
    Sortable.create(container, {
      group: {
        name: "shared",
        pull: "clone",
        put: false
      },
      onClone: function(evt) {
        var sortable_settings = designerSortableSettings[$("#sidebar-component").val()];
        if (sortable_settings) {
          Sortable.create(evt.item, sortable_settings);
        }
      }
    });
  }
};

createRandomID = function(prefix) {
  return prefix + "_" + Math.random().toString(36).substr(2, 10);
};

var designerElements = {
  Button: function() {
    var el = document.createElement("button");
    $(el).attr("data-shinyfunction", "actionButton");
    $(el).addClass("designer-element btn btn-default");

    var label = $("#sidebar-button-label").val();
    var button_class = $("#sidebar-button-class").val();
    var id = $("#sidebar-button-id").val();
    if (id === "") {
      id = createRandomID("button");
    }

    if (button_class === "default") {
      $(el).attr("data-shinyattributes", `inputId = "${id}"`);
    } else {
      $(el).attr("data-shinyattributes", `inputId = "${id}", class = "btn-${button_class}"`);
      $(el).addClass("btn-" + button_class);
    }

    $(el).html(label);
    return el;
  },

  Header: function() {
    var el = document.createElement($("#sidebar-header-tag").val());
    $(el).addClass("designer-element");
    $(el).attr("data-shinyfunction", $("#sidebar-header-tag").val());
    $(el).html($("#sidebar-header-value").val());
    return el;
  },

  Row: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element row");
    $(el).attr("data-shinyfunction", "fluidRow");
    return el;
  },

  Column: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element col-sm");

    var width = $("#sidebar-column-width").val();
    $(el).addClass("col-sm-" + width);

    var offset = $("#sidebar-column-offset").val();
    if (offset > 0) {
      $(el).addClass("offset-md-" + offset + " col-sm-offset-" + offset);
    }

    if (offset > 0) {
      $(el).attr("data-shinyattributes", "width = " + width + ", offset = " + offset);
    } else {
      $(el).attr("data-shinyattributes", "width = " + width);
    }

    $(el).attr("data-shinyfunction", "column");
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
