$(document).ready(function() {
  $("#sidebar-page_type").on("change", updateCanvasCheck);

  $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
  enableDroppablePage();

  $("#confirm_reset").on("click", () => {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableDroppablePage();
  });
});

enableDroppablePage = function() {
    $(".designer-page-template").droppable({
      tolerance: "pointer",
    drop: function(e, ui) {
      if (ui.draggable.parent().hasClass("component-container")) {
        $(ui.draggable).clone().appendTo($(this));
      }
      $(".designer-page-template .designer-element").draggable({
        cancel : ".no-drag",
        snap: "both",
        containment: "document",
      });
    },
    out: function(e, ui) {
      $(ui.draggable).remove();
    }
  });
};

updateCanvasCheck = function() {
  console.log("Hi");
  if ($(".page-canvas").html() !== "") {
    $("#warning_modal").modal();
  } else {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableDroppablePage();
  }
};

createCanvasPage = function(page) {
  const el = document.createElement("div");
  $(el).addClass("designer-page-template");
  $(el).attr("data-shinyfunction", page);

  if (page === "fixedPage") {
    $(el).addClass("container");
  } else if (page !== "fillPage") {
    $(el).addClass("container-fluid");
  }

  return el;
};
