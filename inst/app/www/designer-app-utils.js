updatePage = function() {
  var page_type = $('#settings-page_type input:radio:checked').val();
  $(".page-canvas").html(createCanvasPage(page_type));
  enableSortablePage(document.getElementById("canvas-page"));
};

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
  if ($("#canvas-page").html() === "") {
    $("#canvas-page").html("<div></div>");
    updatePage();
  } else {
    $("#warning_modal").modal();
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

copyUICode = function() {
  var copy_text = document.getElementById("code-code");
  var text_area = document.createElement("textarea");
  text_area.textContent = copy_text.textContent;
  document.body.append(text_area);
  text_area.select();
  document.execCommand("copy");
  text_area.remove();
};
