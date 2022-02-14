$(document).ready(function() {
  $("#sidebar-component").on("change", () => updateDesignerElement(update_sortable = true));
  $(".component_settings").on("change", updateDesignerElement);
  updateDesignerElement(true);
});

updateDesignerElement = function(update_sortable = false) {
  $(".component-container").html(null);
  var component = $("#sidebar-component").val();
  var component_html = designerElements[component]();
  var container = document.getElementById("sidebar-container");
  $(".component-container").html(component_html);

  if (component === "dropdown") {
    $(".component-container").find("select").selectize({
      labelField: "label",
      valueField: "value",
      searchField: ["label"]
    });
  }

  if (update_sortable) {
    Sortable.create(container, {
      group: {
        name: "shared",
        pull: "clone",
        put: false
      },
      onClone: function(evt) {
        var component = $("#sidebar-component").val();
        var sortable_settings = designerSortableSettings[component];
        if (sortable_settings) {
          Sortable.create(evt.item, sortable_settings);
        }
      },
      onEnd: function(evt) {
        var component = $("#sidebar-component").val();
        if (component == "dropdown") {
          updateDesignerElement();
        }
      }
    });
  }
};

createRandomID = function(prefix) {
  return prefix + "_" + Math.random().toString(36).substr(2, 10);
};

var designerElements = {
  button: function() {
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

  dropdown: function() {
    var el = document.createElement("div");
    $(el).attr("data-shinyfunction", "selectInput");
    $(el).addClass("designer-element form-group shiny-input-container");


    var label = $("#sidebar-dropdown-label").val();
    var id = $("#sidebar-dropdown-id").val();
    if (id === "") {
      id = createRandomID("dropdown");
    }

    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}", choices = "..."`);

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var el_dropdown = document.createElement("div");
    $(el_dropdown).html(document.createElement("select"));

    $(el).html(el_label);
    $(el).append(el_dropdown);
    return el;
  },

  header: function() {
    var el = document.createElement($("#sidebar-header-tag").val());
    $(el).addClass("designer-element");
    $(el).attr("data-shinyfunction", $("#sidebar-header-tag").val());
    $(el).html($("#sidebar-header-value").val());
    return el;
  },

  row: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element row");
    $(el).attr("data-shinyfunction", "fluidRow");
    return el;
  },

  column: function() {
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
  },

  input_panel: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element shiny-input-panel shiny-flow-layout");
    $(el).attr("data-shinyfunction", "inputPanel");
    return el;
  }
};

var designerSortableSettings = {
  button: null,
  dropdown: null,
  header: null,
  row: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return clone.classList.contains("col-sm");
      }
    }
  },
  column: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !clone.classList.contains("col-sm");
      }
    }
  },
  input_panel: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !(clone.classList.contains("col-sm") || clone.classList.contains("row"));
      }
    }
  }
};
