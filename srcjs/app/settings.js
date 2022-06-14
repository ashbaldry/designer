export function initSettings() {
    $(".copy-ui-button").on("click", copyUICode);

    $("#remove_label").on("change", toggleComponentLabels);
    $("#remove_colour").on("change", toggleBackgroundColours);
    $("#remove_border").on("change", toggleBorders);

    $(document).on("click", ".clickable-dropdown", e => { e.stopPropagation(); });
    $("#preview").on("click", () => { $(".page-canvas-shell").addClass("preview"); });
    $("#canvas-close_preview").on("click", () => { $(".page-canvas-shell").removeClass("preview"); });

    Shiny.addCustomMessageHandler("toggleBS4DashDeps", toggleBS4DashDeps)
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

function copyUICode () {
    var copy_text = document.getElementById("settings-code-code").textContent;
    navigator.clipboard.writeText(copy_text);
    return;
  };

function toggleBS4DashDeps(toggle) {
    const stylesheets = document.styleSheets;
    for (var i = 0; i < stylesheets.length; i++) {
        var stylesheet = stylesheets.item(i);
        if (stylesheet.href.includes("AdminLTE") || stylesheet.href.includes("bs4Dash")) {
            stylesheet.disabled = toggle === "hide";
        }
        
    }
    
};