$(document).ready(function() {
  $("#settings-page_type").on("change", updateCanvasCheck);
  updatePage();

  $("#confirm_reset").on("click", updatePage);
  $(".copy-ui-button").on("click", copyUICode);

  $(document).on("click", ".clickable-dropdown", e => { e.stopPropagation(); });

  $("#remove_label").change(toggleComponentLabels);
  $("#remove_colour").change(toggleBackgroundColours);
  $("#remove_border").change(toggleBorders);

  $("#app_name").on("change", el => {
    const title = $(el.target).val();
    var shiny_atts = $("#canvas-page").data("shinyattributes").replace(/"[^"]+"/, `"${title}"`);
    $("#canvas-title").html(title);
    $(".navbar-brand").html(title);
    $("#canvas-page").attr("data-shinyattributes", shiny_atts);
  });

  Sortable.create(document.getElementById("sidebar-bin"), {
    group: {
      name: "shared",
      pull: false
    },
    handle: ".designer-element",
    draggable: ".designer-element",
    onAdd: function (evt) {
      this.el.removeChild(evt.item);
    }
  });
});
