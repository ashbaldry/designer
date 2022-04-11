var selected_component = "header";
const UPDATEABLE_ELEMENT = [
  "dropdown", "input", "output", "button", "radio", "checkbox", "date", "file", "slider"
];

$(document).ready(function() {
  $(".component_settings").on("change", updateDesignerElement);
  updateDesignerElement(true);

  $(".component_settings[data-component= '" + selected_component + "']").css("display", "unset");

  $("#settings-component .dropdown-item").on("click", (el) => {
    selected_component = $(el.target).data("shinyelement");
    $(".component_settings").css("display", "");
    $(".component_settings[data-component= '" + selected_component + "']").css("display", "unset");
    updateDesignerElement(true);
  });
});

updateDesignerElement = function(update_sortable = false) {
  $(".component-container").html(null);
  var component = selected_component;
  var component_html = designerElements[component]();
  var container = document.getElementById("sidebar-container");
  $(".component-container").html(component_html);

  if (component === "dropdown") {
    $(".component-container").find("select").selectize({
      labelField: "label",
      valueField: "value",
      searchField: ["label"],
      placeholder: "select input"
    });
  } else if (component === "slider") {
    var slider_type = $(".component-container").find("input").data("data-type");
    $(".component-container").find("input").ionRangeSlider({ prettify: sliderPrettifier[slider_type]});
  } else if (component === "date") {
    $(".component-container").find("input").bsDatepicker();
  }

  if (update_sortable) {
    Sortable.create(container, {
      group: {
        name: "shared",
        pull: "clone",
        put: false
      },
      onClone: function(evt) {
        var component = selected_component;
        var sortable_settings = designerSortableSettings[component];
        if (sortable_settings) {
          Sortable.create(evt.item, sortable_settings);
        }
      },
      onEnd: function(evt) {
        var component = selected_component;
        if (UPDATEABLE_ELEMENT.includes(component)) {
          updateDesignerElement();
        }
      }
    });
  }
};

createRandomID = function(prefix) {
  return prefix + "_" + Math.random().toString(36).substr(2, 10);
};

validateCssUnit = function(x, fallback) {
  const regex = /^(auto|inherit|fit-content|calc\(.*\)|((\.\d+)|(\d+(\.\d+)?))(%|in|cm|mm|ch|em|ex|rem|pt|pc|px|vh|vw|vmin|vmax))$/;
  if (regex.test(x)) {
    return x;
  } else {
    return fallback;
  }
};

createListItem = function(x) {
    var el = document.createElement("li");
    $(el).html(x);
    $(el).attr("data-shinyfunction", "tags$li");
    return el;
};

createCheckbox = function(x, id = "", type = "checkbox", inline = false) {
  var el = document.createElement("label");
  $(el).addClass(inline ? type + "-inline" : type);

  var el_input = document.createElement("input");
  $(el_input).attr("type", type);
  $(el_input).attr("name", id);
  $(el_input).attr("value", x);

  var el_label = document.createElement("span");
  $(el_label).html(x);

  $(el).html(el_input);
  $(el).append(el_label);

  return el;
};

const sliderPrettifier = {
  number: null,
  date: function (num) {
    var sel_date = new Date(num);
    console.log(sel_date);
    return sel_date.getFullYear() + "-" + (sel_date.getMonth() + 1) + "-" + sel_date.getDate();
  },
  datetime: function (num) {
    var sel_date = new Date(num);
    console.log(sel_date);
    return sel_date.getFullYear() + "-" + (sel_date.getMonth() + 1) + "-" + sel_date.getDate() + " " +
    sel_date.getHours() + ":" + sel_date.getMinutes() + ":" + sel_date.getSeconds();
  }
};

const designerElements = {
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

  text: function() {
    var type = $("#sidebar-text-type").val();
    var el = document.createElement(type);
    $(el).addClass("designer-element");

    if (type === "p") {
      $(el).html($("#sidebar-text-contents").val());
    } else {
      var list_items = $("#sidebar-text-contents").val().split("\n");
      $(el).html(list_items.map(createListItem));
    }

    $(el).attr("data-shinyfunction", "tags$" + type);
    return el;
  },

  input_panel: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element shiny-input-panel shiny-flow-layout");
    $(el).attr("data-shinyfunction", "inputPanel");
    return el;
  },

  input: function() {
    var el = document.createElement("div");
    var type = $("#sidebar-input-type").val();
    $(el).attr("data-shinyfunction", type + "Input");
    $(el).addClass("designer-element form-group shiny-input-container");


    var label = $("#sidebar-input-label").val();
    var id = $("#sidebar-input-id").val();
    if (id === "") {
      id = createRandomID("input");
    }

    var input_value = "";
    if (type === "numeric") {
      input_value = ", value = 1";
    }

    var width_str;
    var width = validateCssUnit($("#sidebar-input-width").val(), "");
    if (width === "") {
      width_str = "";
    } else {
      $(el).css("width", width);
      width_str = `, width = "${width}"`;
    }

    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}"${input_value}${width_str}`);

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var child_input_tag = "input";
    if (type === "textArea") {
      child_input_tag = "textarea";
    }
    var el_input = document.createElement(child_input_tag);
    $(el_input).addClass("form-control");
    if (type !== "textArea") {
      var input_types = {numeric: "Numeric", text: "Text", password: "Password"};
      $(el_input).attr("type", input_types[type] + " Input");
    }
    $(el_input).attr("placeholder", type);

    $(el).html(el_label);
    $(el).append(el_input);
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

    var width_str;
    var width = validateCssUnit($("#sidebar-dropdown-width").val(), "");
    if (width === "") {
      width_str = "";
    } else {
      $(el).css("width", width);
      width_str = `, width = "${width}"`;
    }

    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}", choices = "..."${width_str}`);

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var el_dropdown = document.createElement("div");
    $(el_dropdown).html(document.createElement("select"));

    $(el).html(el_label);
    $(el).append(el_dropdown);
    return el;
  },

  slider: function() {
    var el = document.createElement("div");
    var type = $("#sidebar-slider-type").val();
    var range = document.getElementById("sidebar-slider-range").checked;
    $(el).attr("data-shinyfunction", "sliderInput");
    $(el).addClass("designer-element form-group shiny-input-container");

    var label = $("#sidebar-slider-label").val();
    var id = $("#sidebar-slider-id").val();
    if (id === "") {
      id = createRandomID("slider");
    }

    var width_str;
    var width = validateCssUnit($("#sidebar-slider-width").val(), "");
    if (width === "") {
      width_str = "";
    } else {
      $(el).css("width", width);
      width_str = `, width = "${width}"`;
    }

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var el_input = document.createElement("input");
    $(el_input).attr("id", id);
    $(el_input).addClass("js-range-slider");
    $(el_input).attr("data-data-type", type);
    $(el_input).attr("data-skin", "shiny");
    $(el_input).attr("data-grid", true);
    $(el_input).attr("data-grid-num", 10);
    $(el_input).attr("data-grid-snap", false);
    $(el_input).attr("data-prettifyed-enabled", true);
    $(el_input).attr("data-prettifyed-separator", ",");
    $(el_input).attr("data-keyboard", true);

    if (range) {
      $(el_input).attr("data-type", "double");
      $(el_input).attr("data-drag-interval", true);
    }

    var input_str;
    var input_value_str;
    var curr_date = new Date();
    var curr_time;

    if (type === "number") {
      $(el_input).attr("data-step", 1);
      $(el_input).attr("data-min", 0);
      $(el_input).attr("data-max", 10);
      $(el_input).attr("data-from", 5);
      if (range) {
        $(el_input).attr("data-to", 7);
        input_value_str = "c(5, 7)";
      } else {
        input_value_str = "5";
      }
      input_str = `, min = 0, max = 10, value = ${input_value_str}`;
    } else if (type === "date") {
      curr_date.setHours(0, 0, 0, 0);
      curr_time = curr_date.getTime();
      $(el_input).attr("data-step", 86400000);
      $(el_input).attr("data-min", curr_time - 5 * 1000 * 60 * 60 * 24);
      $(el_input).attr("data-max", curr_time + 5 * 1000 * 60 * 60 * 24);
      $(el_input).attr("data-from", curr_time);
      if (range) {
        $(el_input).attr("data-to", curr_time + 2 * 1000 * 60 * 60 * 24);
        input_value_str = "c(Sys.Date(), Sys.Date() + 2)";
      } else {
        input_value_str = "Sys.Date()";
      }
      $(el_input).attr("data-time-format", "%F");

      input_str = `, min = Sys.Date() - 5, max = Sys.Date() + 5, value = ${input_value_str}`;
    } else {
      curr_time = curr_date.getTime();
      $(el_input).attr("data-step", 1000);
      $(el_input).attr("data-min", curr_time - 5000);
      $(el_input).attr("data-max", curr_time + 5000);
      $(el_input).attr("data-from", curr_time);
      if (range) {
        $(el_input).attr("data-to", curr_time + 2000);
        input_value_str = "c(Sys.time(), Sys.time() + 2000)";
      } else {
        input_value_str = "Sys.time()";
      }
      $(el_input).attr("data-time-format", "%F %T");

      input_str = `, min = Sys.time() - 5000, max = Sys.time() + 5000, value = ${input_value_str}`;
    }

    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}"${input_str}${width_str}`);
    $(el).html(el_label);
    $(el).append(el_input);
    return el;
  },

  file: function() {
    var el = document.createElement("div");
    var type = $("#sidebar-input-type").val();
    $(el).attr("data-shinyfunction", type + "Input");
    $(el).addClass("designer-element form-group shiny-input-container");


    var label = $("#sidebar-input-label").val();
    var id = $("#sidebar-input-id").val();
    if (id === "") {
      id = createRandomID("input");
    }

    var input_value = "";
    if (type === "numeric") {
      input_value = ", value = 1";
    }

    var width_str;
    var width = validateCssUnit($("#sidebar-input-width").val(), "");
    if (width === "") {
      width_str = "";
    } else {
      $(el).css("width", width);
      width_str = `, width = "${width}"`;
    }

    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}"${input_value}${width_str}`);

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var child_input_tag = "input";
    if (type === "textArea") {
      child_input_tag = "textarea";
    }
    var el_input = document.createElement(child_input_tag);
    $(el_input).addClass("form-control");
    if (type !== "textArea") {
      var input_types = {numeric: "Numeric", text: "Text", password: "Password"};
      $(el_input).attr("type", input_types[type] + " Input");
    }
    $(el_input).attr("placeholder", type);

    $(el).html(el_label);
    $(el).append(el_input);
    return el;
  },

  date: function() {
    var el = document.createElement("div");
    var type = $("#sidebar-date-type").val();
    var range = document.getElementById("sidebar-date-range").checked;
    $(el).addClass("designer-element form-group shiny-input-container");
    if (range) {
      $(el).addClass("shiny-date-range-input");
      $(el).attr("data-shinyfunction", "dateRangeInput");
    } else {
      $(el).addClass("shiny-date-input");
      $(el).attr("data-shinyfunction", "dateInput");
    }

    var label = $("#sidebar-date-label").val();
    var id = $("#sidebar-date-id").val();
    if (id === "") {
      id = createRandomID("date");
    }

    var width_str;
    var width = validateCssUnit($("#sidebar-date-width").val(), "");
    if (width === "") {
      width_str = "";
    } else {
      $(el).css("width", width);
      width_str = `, width = "${width}"`;
    }

    $(el).attr("id", id);
    $(el).attr("data-shinyattributes", `inputId = "${id}", label = "${label}"${width_str}`);

    var el_label = document.createElement("label");
    $(el_label).addClass("control-label");
    $(el_label).html(label);

    var el_date_input = document.createElement("input");
    $(el_date_input).addClass("form-control");
    $(el_date_input).attr("type", "text");
    $(el_date_input).attr("title", "Date format: yyyy-mm-dd");
    $(el_date_input).attr("data-date-language", "en");
    $(el_date_input).attr("data-date-week-start", 0);
    $(el_date_input).attr("data-date-format", "yyyy-mm-dd");
    $(el_date_input).attr("data-date-start-view", "month");
    $(el_date_input).attr("data-date-autoclose", true);

    if (range) {
      var el_mid_input = document.createElement("span");
      $(el_mid_input).addClass("input-group-addon input-group-prepend input-group-append");

      var el_to_label = document.createElement("span");
      $(el_to_label).html(" to ");
      $(el_to_label).addClass("input-group-text");
      $(el_mid_input).html(el_to_label);

      var el_input = document.createElement("div");
      $(el_input).addClass("input-daterange input-group input-group-sm");

      $(el_input).html(el_date_input.cloneNode());
      $(el_input).append(el_mid_input);
      $(el_input).append(el_date_input.cloneNode());
    } else {
      var el_input = el_date_input;
      $(el_input).attr("data-date-dates-disabled", null);
      $(el_input).attr("data-date-days-of-week-disabled", null);
    }

    $(el).html(el_label);
    $(el).append(el_input);
    return el;
  },

  checkbox: function() {
    var el = document.createElement("div");
    $(el).attr("data-shinyfunction", "checkboxInput");
    $(el).addClass("designer-element form-group shiny-input-container");

    var label = $("#sidebar-checkbox-label").val();
    var id = $("#sidebar-checkbox-id").val();
    if (id === "") {
      id = createRandomID("checkbox");
    }
    var attributes_str = `inputId = "${id}", label = "${label}"`;

    var width = validateCssUnit($("#sidebar-checkbox-width").val(), "");
    if (width !== "") {
      $(el).css("width", width);
      attributes_str = `${attributes_str}, width = "${width}"`;
    }

    var el_label = document.createElement("span");
    $(el_label).html(label);

    var el_input = document.createElement("input");
    $(el_input).attr("id", id);
    $(el_input).attr("type", "checkbox");

    var checked = document.getElementById("sidebar-checkbox-checked").checked;
    if (checked) {
      $(el_input).attr("checked", "checked");
      attributes_str = `${attributes_str}, value = TRUE`;
    }

    var el_checkbox = document.createElement("div");
    var el_check_label = document.createElement("label");

    $(el_check_label).html(el_input);
    $(el_check_label).append(el_label);
    $(el_checkbox).html(el_check_label);

    $(el).attr("data-shinyattributes", attributes_str);
    $(el).html(el_checkbox);
    return el;
  },

  radio: function() {
    var el = document.createElement("div");
    $(el).addClass("designer-element form-group shiny-input-container");

    var label = $("#sidebar-radio-label").val();
    var id = $("#sidebar-radio-id").val();
    var type = $('#sidebar-radio-type input:checked').val();
    var choice_str = $('#sidebar-radio-choices').val().replaceAll("\n", '", "');
    var inline = document.getElementById("sidebar-radio-inline").checked;
    if (id === "") {
      id = createRandomID(type + "group");
    }

    $(el).addClass("shiny-input-" + type + "group");
    $(el).attr(
      "data-shinyfunction",
      type === "radio" ? "radioButtons" : "checkboxGroupInput"
    );
    $(el).attr("role", "group");
    $(el).attr("aria-labelledby", id + "-label");

    var attributes_str = `inputId = "${id}", label = "${label}", choices = c("${choice_str}")`;

    if (inline) {
      $(el).addClass("shiny-input-container-inline");
      attributes_str = `${attributes_str}, inline = TRUE`;
    }

    var width = validateCssUnit($("#sidebar-radio-width").val(), "");
    if (width !== "") {
      $(el).css("width", width);
      attributes_str = `${attributes_str}, width = "${width}"`;
    }

    var el_label = document.createElement("label");
    $(el_label).html(label);
    $(el_label).attr("id", id + "-label");
    $(el_label).attr("for", id);
    $(el_label).addClass("control-label");

    var el_input = document.createElement("div");
    $(el_input).addClass("shiny-options-group");

    var choices = $("#sidebar-radio-choices").val().split("\n");
    $(el_input).html(choices.map(function(choice) {
      return createCheckbox(
        choice,
        id = id,
        type = type,
        inline = inline
      );
    }));

    $(el).attr("data-shinyattributes", attributes_str);
    $(el).html(el_label);
    $(el).append(el_input);
    return el;
  },

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

    var width_str = "";
    var width = validateCssUnit($("#sidebar-button-width").val(), "");
    if (width !== "") {
      width_str = `, width = "${width}"`;
      $(el).css("width", width);
    }

    if (button_class === "default") {
      $(el).attr("data-shinyattributes", `inputId = "${id}"${width_str}`);
    } else {
      $(el).attr("data-shinyattributes", `inputId = "${id}"${width_str}, class = "btn-${button_class}"`);
      $(el).addClass("btn-" + button_class);
    }

    $(el).html(label);
    return el;
  },

  output: function() {
    var el;
    var inline_text = "";
    var type = $("#sidebar-output-type").val();
    var type2;
    if (type === "table") {
      type2 = "datatable";
    } else if (type === "verbatimText") {
      type2 = "text";
    } else {
      type2 = type;
    }
    var inline = document.getElementById("sidebar-output-inline").checked;
    var contents = outputContents[type]();

    if (type === "verbatimText") {
      el = document.createElement("pre");
    } else if (inline) {
      el = document.createElement("span");
      inline_text = ", inline = TRUE";
    } else {
      el = document.createElement("div");
    }

    var id = $("#sidebar-output-id").val();
    if (id === "") {
      id = createRandomID(type);
    }

    var height_str = "";
    var width_str = "";
    if (["plot", "image"].includes(type)) {

      var width = validateCssUnit($("#sidebar-output-width").val(), "100%");
      var height = validateCssUnit($("#sidebar-output-height").val(), "400px");
      if (width !== "100%") {
        width_str = `, width = "${width}"`;
      }
      if (height !== "400px") {
        height_str = `, height = "${height}"`;
      }

      $(el).css("width", width);
      $(el).css("height", height);

    } else if (["text", "verbatimText"].includes(type)) {
      contents = contents + $("#sidebar-output-contents").val();
    }

    $(el).attr("data-shinyfunction", type + "Output");
    $(el).attr("data-shinyattributes", `outputId = "${id}"${inline_text}${height_str}${width_str}`);
    $(el).addClass(`designer-element output-element ${type}-output-element shiny-${type2}-output`);
    $(el).html(contents);
    return el;
  }
};

const outputContents = {
  text: function() {
    return "Text Output: ";
  },
  verbatimText: function() {
    return "Verbatim Text Output: ";
  },
  plot: function() {
    var el = document.createElement("img");
    $(el).attr("src", "images/plot.png");
    $(el).attr("alt", "Placeholder for a plot output");
    $(el).attr("title", "Example Plot");
    return el;
  },
  table: function() {
    return "Example Table Output";
  },
  image: function() {
    var el = document.createElement("img");
    $(el).attr("src", "images/image.png");
    $(el).attr("alt", "Placeholder for an image output");
    $(el).attr("title", "Example Image");
    return el;
  },
  html: function() {
    return "Placeholder for HTML Output";
  }
};

const designerSortableSettings = {
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
        return clone.classList.contains("form-group") || clone.classList.contains("btn");
      }
    }
  }
};
