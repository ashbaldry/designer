var selected_component = "header";
const UPDATEABLE_ELEMENT = [
  "dropdown", "input", "output", "button", "radio", "checkbox", "date", "file", "slider", "box", "value_box"
];

$(document).ready(function() {
  $(".component-settings").on("change keyup", updateDesignerElement);
  $(".component_comments").on("change blur", updateDesignerElement);
  $('.component-container').on("mouseover", () => {$(":focus").blur()});
  updateDesignerElement(true);

  $(".component-settings[data-component= '" + selected_component + "']").css("display", "unset");

  $("#settings-component .dropdown-item").on("click", (el) => {
    selected_component = $(el.target).data("shinyelement");
    $("#settings-component .dropdown-item").removeClass("active");
    $(el.target).addClass("active");
    $(".component-settings").css("display", "");
    $(".component-settings[data-component= '" + selected_component + "']").css("display", "unset");
    updateDesignerElement(true);
  });
});

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
          if (component === "box") {
            Sortable.create($(evt.item).find('.card-body')[0], sortable_settings);
          } else {
            Sortable.create(evt.item, sortable_settings);
          }
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
      input_tag = `<textarea class="form-control" placeholder="textarea input"></textarea>`;
    } else {
      const input_types = {numeric: "number", text: "text", password: "password"};
      input_tag = `<input class="form-control" type="${input_types[type]}" placeholder="${type} input">`;
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

    var date_tag = `<input class="form-control" type="text" title="Date format: yyyy-mm-dd" placeholder="date input"
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

    var inline_str = inline ? ", inline = TRUE" : "";
    var inline_class = inline ? "-inline" : "";

    var choices_str = `, choices = c(&quot;${choices.replace(/\n/g, '&quot;, &quot;')}&quot;)`
    var input_str = `inputId = &quot;${id}&quot;, label = &quot;${label}&quot;${choices_str}${inline_str}${width_str}`;
    var label_tag = `<label class="control-label">${label}</label>`;

    var choices_tag = choices.split("\n").map(x => createCheckbox(x, id = id, type = type, inline = inline)).join("");
    var input_tag = `<div class="shiny-options-group">${choices_tag}</div>`;

    return `<div class="designer-element form-group shiny-input-container shiny-input-${type}group${inline_class}"
                 data-shinyfunction="${r_func}" data-shinyattributes="${input_str}" ${style_str}
                 role="${role}">${label_tag}${input_tag}</div>`;
  },

  button: function() {
    var label = $("#sidebar-button-label").val();
    var id = $("#sidebar-button-id").val();
    var width = validateCssUnit($("#sidebar-button-width").val(), "");
    var button_class = $("#sidebar-button-class").val();
    var downloadable = document.getElementById("sidebar-button-download").checked;

    if (id === "") {
      id = createRandomID("button");
    }

    var width_str = "", style_str = "";
    if (width !== "") {
      style_str = ` style="width: ${width};"`;
      width_str = `, width = &quot;${width}&quot;`;
    }

    var r_func = "actionButton", id_arg = "inputId", download_icon = "";
    if (downloadable) {
      r_func = "downloadButton";
      id_arg = "outputId";
      download_icon = '<i class="fa fa-download" role="presentation" aria-label="download icon"></i>';
    }

    var class_str = button_class === "default" ? "" : `, class = &quot;btn-${button_class}&quot;`;
    var btn_class = button_class === "default" ? "" : "btn-" + button_class;

    var input_str = `${id_arg} = &quot;${id}&quot;{class_str}${width_str}`;
    return `<button class="btn ${btn_class} action-button designer-element"
                    type="button" ${style_str}
                    data-shinyfunction="${r_func}"
                    data-shinyattributes="${input_str}">${download_icon}${label}</button>`;
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
    var output_func = (type === "table" ? "dataTable" : type) + "Output";
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
                         data-shinyfunction="${output_func}"
                         data-shinyattributes="${input_str}">${output_tag}</${html_tag}>`
  },

  box: function() {
    var label = $("#sidebar-box-label").val();
    var width = $("#sidebar-box-width").val();
    var colour = $("#sidebar-box-colour").val();
    var background = $("#sidebar-box-background").val();

    var width_class = "";
    if (width > 0) {
      width_class = `col-sm col-sm-${width}`;
    } else {
      width = "NULL";
    }

    var colour_class = "";
    if (colour !== "white") {
      colour_class = "card-outline card-" + colour;
    }

    var background_class = "";
    if (background !== "white") {
      background_class = "bg-" + background;
    }

    return `<div class="${width_class} designer-element"
                 data-shinyfunction="bs4Dash::bs4Card"
                 data-shinyattributes="title = &quot;${label}&quot;, status = &quot;${colour}&quot;, background = &quot;${background}&quot;, width = ${width}">
              <div class="card bs4Dash ${colour_class} ${background_class}">
                <div class="card-header">
                  <h3 class="card-title">${label}</h3>
                  <div class="card-tools float-right">
                    <button class="btn btn-tool btn-sm ${background_class}" type="button" data-card-widget="collapse">
                      <i class="fa fa-minus" role="presentation" aria-label="minus icon"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body"></div>
                </div>
              <script type="application/json">{"solidHeader":true,"width":6,"collapsible":true,"closable":false,"maximizable":false,"gradient":false,"background":"${background}","status":"${colour}"}</script>
            </div>`;
  },

  value_box: function() {
    var value = $("#sidebar-value_box-value").val();
    var subtitle = $("#sidebar-value_box-subtitle").val();
    var width = $("#sidebar-value_box-width").val();
    var colour = $("#sidebar-value_box-colour").val();

    var width_class = "";
    if (width > 0) {
      width_class = `col-sm col-sm-${width}`;
    } else {
      width = "NULL";
    }

    var colour_class = "";
    if (colour !== "white") {
      colour_class = "bg-" + colour;
    }

    return `<div class="${width_class} designer-element"
                 data-shinyfunction="bs4Dash::bs4ValueBox"
                 data-shinyattributes="value = &quot;${value}&quot;, subtitle = &quot;${subtitle}&quot;, color = &quot;${colour}&quot;, width = ${width}">
              <div class="small-box ${colour_class}">
                <div class="inner">${value}<p class="small-box-subtitle">${subtitle}</p></div>
                <div class="small-box-footer" style="height: 30px;"></div>
              </div>
            </div>`;
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
  box: {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !clone.classList.contains("col-sm");
      }
    }
  }
};
