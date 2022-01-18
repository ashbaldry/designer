$(document).ready(function() {
  $("#sidebar-page_type").on("change", updateCanvasPage);
});

updateCanvasPage = function() {
  console.log("Hi");
  if ($(".canvas").html() !== "") {
    alert("Removing contents of blah. Confirm");
  }

  $('.canvas').html(createCanvasPage($('#sidebar-page_type').val()));
};

createCanvasPage = function(page) {
  if (page === "fixedPage") {
    return "<div class='designer-page-template container'>fixedPage</div>";
  } else if (page === "fillPage") {
    return "<div class='designer-page-template designer-fill-page-template'>fillPage</div>";
  } else {
    return "<div class='designer-page-template container-fluid'>Standard Page</div>";
  }
};
