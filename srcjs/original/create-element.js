function updateDesignerElement (update_sortable = false) {
  if (component === "output") {
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

const designerElements = {
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
