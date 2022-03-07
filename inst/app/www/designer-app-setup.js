$(document).ready(function() {
  $("#sidebar-page_type").on("change", updateCanvasCheck);

  $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
  enableSortablePage(document.getElementById("canvas-page"));

  $("#confirm_reset").on("click", () => {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableSortablePage(document.getElementById("canvas-page"));
  });

  $(".copy-ui-button").on("click", copyUICode);

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
