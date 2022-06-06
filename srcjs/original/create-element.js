function updateDesignerElement (update_sortable = false) {
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
