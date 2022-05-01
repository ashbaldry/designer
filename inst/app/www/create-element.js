var selected_component = "header";
const UPDATEABLE_ELEMENT = [
  "dropdown", "input", "output", "button", "radio", "checkbox", "date", "file", "slider"
];

$(document).ready(function() {
  $(".component_settings").on("change", updateDesignerElement);
  $(".component_comments").on("change", updateDesignerElement);
  updateDesignerElement(true);

  $(".component_settings[data-component= '" + selected_component + "']").css("display", "unset");

  $("#settings-component .dropdown-item").on("click", (el) => {
    selected_component = $(el.target).data("shinyelement");
    $(".component_settings").css("display", "");
    $(".component_settings[data-component= '" + selected_component + "']").css("display", "unset");
    updateDesignerElement(true);
  });

  $("#sidebar-tab_panel-add").on("click", addTab);
  $("#sidebar-tab_panel-delete").on("click", deleteTab);
});

let navbar_item = 1;
function addTab () {
  const nav_panel = $("ul.navbar-nav");
  const tab_panel = $(".tab-content");
  const nav_id = nav_panel.data("tabsetid");

  const active_class = tab_panel.html() === "" ? "active" : "";
  const tab_name = $("#sidebar-tab_panel-name").val();
  let tab_value = $("#sidebar-tab_panel-value").val();
  if (tab_value === "") {
    tab_value = createRandomID("tab");
  }

  if ($(`ul.navbar-nav a[data-name='${tab_name}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_name} is the name of an existing tab. Please choose a unique name
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  } else if ($(`ul.navbar-nav a[data-value='${tab_value}']`).length > 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        ${tab_value} is the ID of an existing tab. Please choose a unique ID
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  }

  $("#sidebar-tab_panel-alert div").alert("close");

  nav_panel.append(
    `<li class="${active_class}">
       <a href="#tab-${nav_id}-${navbar_item}" data-toggle="tab"
          data-bs-toggle="tab" data-value="${tab_value}" data-name="${tab_name}">${tab_name}</a>
     </li>`
  );

  tab_panel.append(
    `<div class="tab-pane ${active_class}" data-value="${tab_value}" id="tab-${nav_id}-${navbar_item}"
          data-shinyfunction="tabPanel"
          data-shinyattributes="title = &quot;${tab_name}&quot;, value = &quot;${tab_value}&quot;"></div>`
  );
  enableSortablePage(document.getElementById(`tab-${nav_id}-${navbar_item}`));

  navbar_item = navbar_item + 1;
}

function deleteTab () {
  const tab_name = $("#sidebar-tab_panel-name").val();

  const delete_tab = $(`ul.navbar-nav a[data-name='${tab_name}']`);
  if (delete_tab.length === 0) {
    $("#sidebar-tab_panel-alert").html(`
      <div class="alert alert-danger" role="alert">
        Unable to find a tab with the name "${tab_name}"
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
    return;
  }

  $("#sidebar-tab_panel-alert div").alert("close");

  const tab_value = $(`ul.navbar-nav a[data-name='${tab_name}']`).data("value");
  $(delete_tab[0].parentElement).remove();
  $(`.tab-content .tab-pane[data-value='${tab_value}']`).remove();
}

function updateDesignerElement (update_sortable = false) {
  $(".component-container").html(null);
  var component = selected_component;

  // Need to do multiple things when //
  if (component === "tab_panel") {
    $(".component-container").css("display", "none");
    $(".component_comments").css("display", "none");
    return;
  }

  var component_html = designerElements[component]();
  var container = document.getElementById("sidebar-container");

  $(".component-container").css("display", "");
  $(".component_comments").css("display", "");
  $(".component-container").html(component_html);
  if ($("#sidebar-comments").val() !== "") {
    $(".component-container>.designer-element").attr("data-shinycomments", $("#sidebar-comments").val());
    $(".component-container>.designer-element").attr("title", $("#sidebar-comments").val());
    $(".component-container>.designer-element").attr("data-toggle", "tooltip");
  }

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
  } else if (component === "output") {
    Shiny.bindAll();
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
        $('.page-canvas [data-toggle="tooltip"]').tooltip();
        if (UPDATEABLE_ELEMENT.includes(component) || $("#sidebar-comments").val() !== "") {
          $("#sidebar-comments").val("");
          updateDesignerElement();
        }
      }
    });
  }
}

function createRandomID (prefix) {
  return prefix + "_" + Math.random().toString(36).substr(2, 10);
}

function validateCssUnit (x, fallback) {
  const regex = /^(auto|inherit|fit-content|calc\(.*\)|((\.\d+)|(\d+(\.\d+)?))(%|in|cm|mm|ch|em|ex|rem|pt|pc|px|vh|vw|vmin|vmax))$/;
  if (regex.test(x)) {
    return x;
  } else if (/^\d+$/.test(x)) {
    return x + "px";
  } else {
    return fallback;
  }
}

function createCheckbox (x, id = "", type = "checkbox", inline = false) {
  var check_class = inline ? type + "-inline" : type;
  return `<label class="${check_class}"><input type="${type}"><span>${x}</span></label>`;
}

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
    var tag = $("#sidebar-header-tag").val();
    var value = $("#sidebar-header-value").val();

    return `<${tag} class="designer-element" data-shinyfunction="${tag}">${value}</${tag}>`;
  },

  row: function() {
    return `<div class="designer-element row row-designer" data-shinyfunction="fluidRow"></div>`;
  },

  column: function() {
    var width = $("#sidebar-column-width").val();
    var offset = $("#sidebar-column-offset").val();

    var offset_class = "";
    var offset_r = "";
    if (offset > 0) {
      offset_class = ` offset-md-${offset}`;
      offset_r = `, offset = ${offset}`;
    }

    return `<div class="designer-element col-sm col-sm-${width}${offset_class}"
                 data-shinyfunction="column"
                 data-shinyattributes="width = ${width}${offset_r}"></div>`;
  },

  text: function() {
    var tag = $("#sidebar-text-type").val();

    var contents = "";
    if (tag === "p") {
      contents = $("#sidebar-text-contents").val().replaceAll("\n", " ");
    } else {
      var list_items = $("#sidebar-text-contents").val().split("\n");
      contents = list_items.map(x => '<li data-shinyfunction="tags$li">' + x + "</li>").join("");
    }

    return `<${tag} class="designer-element" data-shinyfunction="tags$${tag}">${contents}</${tag}>`;
  },

  input_panel: function() {
    return `<div class="designer-element shiny-input-panel shiny-flow-layout" data-shinyfunction="inputPanel"></div>`;
  },

  input: function() {
    var type = $("#sidebar-input-type").val();
    var label = $("#sidebar-input-label").val();
    var id = $("#sidebar-input-id").val();
    var width = validateCssUnit($("#sidebar-input-width").val(), "");

    if (id === "") {
      id = createRandomID("input");
    }

    var value_str = "";
    if (type === "numeric") {
      value_str = ", value = 1";
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var input_tag;
    if (type === "textArea") {
      input_tag = `<textarea class="form-control" placeholder="textArea"></textarea>`;
    } else {
      const input_types = {numeric: "Numeric", text: "Text", password: "Password"};
      input_tag = `<input class="form-control" type="${input_types[type]} Input" placeholder="${type}">`;
    }

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${value_str}${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;

    return `<div class="designer-element form-group shiny-input-container"${style_str}
                 data-shinyattributes="${input_str}"
                 data-shinyfunction="${type}Input">${label_tag}${input_tag}</div>`;
  },

  dropdown: function() {
    var label = $("#sidebar-dropdown-label").val();
    var id = $("#sidebar-dropdown-id").val();
    var width = validateCssUnit($("#sidebar-dropdown-width").val(), "");

    if (id === "") {
      id = createRandomID("dropdown");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;, choices = &quot;...&quot;${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;

    return `<div class="designer-element form-group shiny-input-container"
                 ${style_str}
                 data-shinyattributes="${input_str}"
                 data-shinyfunction="selectInput">${label_tag}<div><select></div></div>`;
  },

  slider: function() {
    var label = $("#sidebar-slider-label").val();
    var id = $("#sidebar-slider-id").val();
    var format = $("#sidebar-slider-type").val();
    var range = document.getElementById("sidebar-slider-range").checked;
    var width = validateCssUnit($("#sidebar-slider-width").val(), "");

    if (id === "") {
      id = createRandomID("slider");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var step = 1, min = 0, max = 10, from = 5, to = 7;
    var value_str, input_value_str;
    var curr_time, curr_date = new Date(), time_format = "";

    if (format === "number") {
      if (range) {
        input_value_str = "c(5, 7)";
      } else {
        input_value_str = "5";
      }
      value_str = `, min = 0, max = 10, value = ${input_value_str}`;
    } else {
      if (format === "date") {
        curr_date.setHours(0, 0, 0, 0);
      }

      step = format === "date" ? 1000 * 60 * 60 * 24 : 1000;
      curr_time = curr_date.getTime();
      min = curr_time - 5 * step;
      max = curr_time + 5 * step;
      from = curr_time;
      to = curr_time + 2 * step;

      time_format = format === "date" ? "%F" : "%F %T";
      var r_datefunc = format === "date" ? "Sys.Date()" : "Sys.time()";
      var r_mult = format === "date" ? "" : "000";

      if (range) {
        input_value_str = `"c(${r_datefunc}, ${r_datefunc} + 2${r_mult})"`
      } else {
        input_value_str = r_datefunc;
      }
      value_str = `, min = ${r_datefunc} - 5${r_mult}, max = ${r_datefunc} + 5${r_mult}, value = ${input_value_str}`;
    }

    var range_attr = "";
    if (range) {
      range_attr = `data-type="double" data-drag-interval="true" data-to="${to}"`
    }

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${value_str}${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;
    var input_tag = `<input class="js-range-slider"
                            data-data-type="${format}" data-skin="shiny" data-grid="true" data-grid-num="10"
                            data-grid-snap="false" data-prettifyed-enabled="true" data-prettifyed-separator=","
                            data-keyboard="true" ${range_attr} data-time-format="${time_format}"
                            data-step="${step}" data-min="${min}" data-max="${max}" data-from="${from}">`;

    return `<div class="designer-element form-group shiny-input-container" ${style_str}
                 data-shinyattributes="${input_str}"
                 data-shinyfunction="sliderInput">${label_tag}${input_tag}</div>`;
  },

  file: function() {
    var label = $("#sidebar-file-label").val();
    var id = $("#sidebar-file-id").val();
    var width = validateCssUnit($("#sidebar-file-width").val(), "");

    if (id === "") {
      id = createRandomID("file");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;
    var input_tag = `<div class="input-group">
      <label class="input-group-btn input-group-prepend">
        <span class="btn btn-default btn-file">
          Browse...
          <input type="file"
                 style="position: absolute !important; top: -99999px !important; left: -99999px !important;"/>
        </span>
      </label>
      <input type="text" class="form-control" placeholder="No file selected" readonly="readonly"/>
    </div>`;

    return `<div class="designer-element form-group shiny-input-container"
                 data-shinyfunction="fileInput" ${style_str}
                 data-shinyattributes="${input_str}">${label_tag}${input_tag}</div>`;
  },

  date: function() {
    var label = $("#sidebar-date-label").val();
    var id = $("#sidebar-date-id").val();
    var width = validateCssUnit($("#sidebar-date-width").val(), "");
    var range = document.getElementById("sidebar-date-range").checked;

    if (id === "") {
      id = createRandomID("date");
    }

    var r_func = range ? "dateRangeInput" : "dateInput";
    var date_class = range ? "shiny-date-range-input" : "shiny-date-input";

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;

    var date_tag = `<input class="form-control" type="text" title="Date format: yyyy-mm-dd"
                            data-date-language="en" data-date-week-start="0" data-date-format="yyyy-mm-dd"
                            data-date-start-view="month" data-date-autoclose="true"/>`;
    var input_tag;
    if (range) {
      var mid_tag = `<span class="input-group-addon input-group-prepend input-group-append">
                       <span class ="input-group-text"> to </span>
                     </span>`;

      input_tag = `<div class="input-daterange input-group input-group-sm">${date_tag}${mid_tag}${date_tag}</div>`;
    } else {
      input_tag = date_tag;
    }

    return `<div class="designer-element form-group shiny-input-container ${date_class}"
                 data-shinyfunction="${r_func}" ${style_str}
                 data-shinyattributes="${input_str}">${label_tag}${input_tag}</div>`;
  },

  checkbox: function() {
    var label = $("#sidebar-checkbox-label").val();
    var id = $("#sidebar-checkbox-id").val();
    var width = validateCssUnit($("#sidebar-checkbox-width").val(), "");
    var checked = document.getElementById("sidebar-checkbox-checked").checked;

    if (id === "") {
      id = createRandomID("checkbox");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var checked_str = checked ? ", value = TRUE" : "";
    var checked_attr = checked ? `checked="checked"` : "";

    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${checked_str}${width_str}`;
    var input_tag = `<label><input type="checkbox" ${checked_attr}><span>${label}</span></label>`;

    return `<div class="designer-element form-group shiny-input-container" ${style_str}
                 data-shinyfunction="checkboxInput"
                 data-shinyattributes="${input_str}"><div class="checkbox">${input_tag}</div>`;
  },

  radio: function() {
    var label = $("#sidebar-radio-label").val();
    var id = $("#sidebar-radio-id").val();
    var width = validateCssUnit($("#sidebar-radio-width").val(), "");
    var type = $('#sidebar-radio-type input:checked').val();
    var choices = $('#sidebar-radio-choices').val();
    var inline = document.getElementById("sidebar-radio-inline").checked;

    if (id === "") {
      id = createRandomID(type + "group");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var r_func = type === "radio" ? "radioButtons" : "checkboxGroupInput";
    var role = type === "radio" ? "radiogroup" : "group";

    var inline_class = inline ? " shiny-input-container-inline" : "";
    var inline_str = inline ? ", inline = TRUE" : "";

    var choices_str = `, choices = c(&quot;${choices.replaceAll("\n", '&quot;, &quot;')}&quot;)`
    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${choices_str}${inline_str}${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;

    var choices_tag = choices.split("\n").map(x => createCheckbox(x, id = id, type = type, inline = inline)).join("");
    var input_tag = `<div class="shiny-options-group">${choices_tag}</div>`;

    return `<div class="designer-element form-group shiny-input-container shiny-input-${type}group ${inline_class}"
                 data-shinyfunction="${r_func}" data-shinyattributes="${input_str}" ${style_str}
                 role="${role}">${label_tag}${input_tag}</div>`;
  },

  button: function() {
    var label = $("#sidebar-button-label").val();
    var id = $("#sidebar-button-id").val();
    var width = validateCssUnit($("#sidebar-button-width").val(), "");
    var button_class = $("#sidebar-button-class").val();

    if (id === "") {
      id = createRandomID("button");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var class_str = button_class === "default" ? "" : `, class = &quot;btn-${button_class}&quot;`;
    var btn_class = button_class === "default" ? "" : "btn-" + button_class;

    var input_str = `inputId = &quot;${id}&quot;{class_str}${width_str}`;
    return `<button class="btn btn-default ${btn_class} action-button designer-element"
                    type="button" ${style_str}
                    data-shinyfunction="actionButton"
                    data-shinyattributes="${input_str}">${label}</button>`;
  },

  output: function() {
    var type = $("#sidebar-output-type").val();
    var id = $("#sidebar-output-id").val();
    var width = validateCssUnit($("#sidebar-output-width").val(), "100%");
    var height = validateCssUnit($("#sidebar-output-height").val(), "400px");
    var inline = document.getElementById("sidebar-output-inline").checked;

    var html_tag = "div";
    if (type === "verbatimText") {
      html_tag = "pre";
    } else if (inline && type != "table") {
      html_tag = "span";
    }
    var type2 = type === "table" ? "datatable" : (type === "verbatimText" ? "text" : type);
    var inline_text = inline && !["verbatimText", "table"].includes(type) ? ", inline = TRUE" : "";

    if (id === "") {
      id = createRandomID(type);
    }

    var designer_str = "";
    if (["plot", "image", "table"].includes(type)) {
      const designer_id = createRandomID("output")
      Shiny.setInputValue("sidebar-outputid", designer_id);
      designer_str = `id="sidebar-${designer_id}"`
    }

    var height_str = "", width_str = "", style_str = "";
    if (["plot", "image"].includes(type)) {
      if (width !== "100%") {
        width_str = `, width = &quot;${width}&quot;`;
      }
      if (height !== "400px") {
        height_str = `, height = &quot;${height}&quot;`;
      }
      style_str = `width: ${width}; height: ${height};`;
    }

    var input_str = `outputId = &quot;${id}&quot;${inline_text}${height_str}${width_str}`;

    var output_tag = OUTPUT_CONTENTS[type];
    if (["text", "verbatimText"].includes(type)) {
      output_tag = "<span>" + output_tag + $("#sidebar-output-contents").val() + "</span>";
    } else if (["table", "html"].includes(type)) {
      output_tag = "<span>" + output_tag + "</span>";
    }

    return `<${html_tag} ${designer_str}
                         class="designer-element output-element ${type}-output-element shiny-${type2}-output"
                         style="${style_str}"
                         data-shinyfunction="${type}Output"
                         data-shinyattributes="${input_str}">${output_tag}</${html_tag}>`
  }
};

const OUTPUT_CONTENTS = {
  text: "Text Output: ",
  verbatimText: "Verbatim Text Output: ",
  plot: "",
  table: "",
  image: "",
  html: "Placeholder for HTML Output"
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
