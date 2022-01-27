$(document).ready(function() {
  $("#sidebar-page_type").on("change", updateCanvasCheck);

  $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
  enableSortablePage(document.getElementById("canvas-page"));

  $("#confirm_reset").on("click", () => {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableSortablePage(document.getElementById("canvas-page"));
  });
});

enableSortablePage = function(el) {
  Sortable.create(el, {
    group: "shared"
  });
};

updateCanvasCheck = function() {
  console.log("Hi");
  if ($(".page-canvas").html() !== "") {
    $("#warning_modal").modal();
  } else {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableSortablePage();
  }
};

createCanvasPage = function(page) {
  const el = document.createElement("div");
  $(el).attr("id", "canvas-page");
  $(el).addClass("designer-page-template");
  $(el).attr("data-shinyfunction", page);

  if (page === "fixedPage") {
    $(el).addClass("container");
  } else if (page !== "fillPage") {
    $(el).addClass("container-fluid");
  }

  return el;
};
