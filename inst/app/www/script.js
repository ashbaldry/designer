$(document).ready(function() {
  $("#sidebar-page_type").on("change", updateCanvasCheck);

  $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
  enableSortablePage(document.getElementById("canvas-page"));

  $("#confirm_reset").on("click", () => {
    $(".page-canvas").html(createCanvasPage($("#sidebar-page_type").val()));
    enableSortablePage(document.getElementById("canvas-page"));
  });

  Sortable.create(document.getElementById("sidebar-bin"), {
    group: {
      name: "shared",
      pull: false
    },
    onAdd: function (evt) {
      this.el.removeChild(evt.item);
    }
  });
});

enableSortablePage = function(el) {
  Sortable.create(el, {
    group: {
      name: "shared",
      put: function (to, from, clone) {
        return !clone.classList.contains("col-sm");
      }
    }
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

htmlToJSON = function(el, inner = false) {
  var children = [];
  for (var i = 0; i < el.children.length; i++) {
    children.push(htmlToJSON(el.children[i], true));
  }

  var el_json = {
    tagName: el.tagName,
    RFunction: el.dataset.shinyfunction,
    htmlclass: el.className,
    children: children
  };

  if (inner) {
    return el_json;
  } else {
    return JSON.stringify(el_json);
  }
};
