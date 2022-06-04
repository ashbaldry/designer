export function initSettings() {
    $("#remove_label").on("change", toggleComponentLabels);
    $("#remove_colour").on("change", toggleBackgroundColours);
    $("#remove_border").on("change", toggleBorders);

    $(document).on("click", ".clickable-dropdown", e => { e.stopPropagation(); });
    $("#preview").on("click", () => { $(".page-canvas-shell").addClass("preview"); });
    $("#canvas-close_preview").on("click", () => { $(".page-canvas-shell").removeClass("preview"); });
};

function toggleComponentLabels () {
    if (this.checked) {
        $(".designer-page-template").removeClass("hidden-after-label");
    } else {
        $(".designer-page-template").addClass("hidden-after-label");
    }
  };
  
function toggleBackgroundColours () {
    if (this.checked) {
        $(".designer-page-template").removeClass("hidden-colour");
    } else {
        $(".designer-page-template").addClass("hidden-colour");
    }
};
  
function toggleBorders () {
    if (this.checked) {
        $(".designer-page-template").removeClass("hidden-borders");
    } else {
        $(".designer-page-template").addClass("hidden-borders");
    }
};
