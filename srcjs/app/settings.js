export function initSettings () {
    $(".copy-ui-button").on("click", copyUICode);

    $("#remove_label").on("change", toggleComponentLabels);
    $("#remove_colour").on("change", toggleBackgroundColours);
    $("#remove_border").on("change", toggleBorders);

    $(document).on("click", ".clickable-dropdown", e => { e.stopPropagation(); });
    $("#preview").on("click", () => { $(".page-canvas-shell").addClass("preview"); });
    $("#canvas-close_preview").on("click", () => { $(".page-canvas-shell").removeClass("preview"); });

    Shiny.addCustomMessageHandler("toggleBS4DashDeps", toggleBS4DashDeps);
    Shiny.addCustomMessageHandler("runjs", function(message) { console.log(message); (0, eval)(message.script); });

    $("#canvas-canvas").on("contextmenu", showCanvasMenu);
    $("#canvas-menu").on("contextmenu", e => { e.preventDefault(); });
    $("body").on("click", closeCanvasMenu);
    $("#sidebar-container").on("mousedown", closeCanvasMenu);

    $("#canvas-delete").on("click", deleteDesignerElement);
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
    $("#copy_toast").toast("show");
    return;
};

function toggleBS4DashDeps (toggle) {
    const stylesheets = document.styleSheets;
    for (var i = 0; i < stylesheets.length; i++) {
        var stylesheet = stylesheets.item(i);
        if (stylesheet.href.includes("AdminLTE") || stylesheet.href.includes("bs4Dash")) {
            stylesheet.disabled = toggle === "hide";
        }
        
    }
    
};

let selected_element;

function showCanvasMenu (event) {
    event.preventDefault();
    
    const { clientX: mouseX, clientY: mouseY } = event;
    const { normalizedX, normalizedY } = normalizeMenuPosition(mouseX, mouseY);

    selected_element = $(event.target).closest(".designer-element");

    $("#canvas-menu").css("top", `${normalizedY}px`);
    $("#canvas-menu").css("left", `${normalizedX}px`);
    $("#canvas-menu").removeClass("visible");

    setTimeout(() => { $("#canvas-menu").addClass("visible"); });
};

function normalizeMenuPosition (mouseX, mouseY) {
    const scope = document.getElementById("canvas-canvas");
    const contextMenu = document.getElementById("canvas-menu");

    let { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect();
      
      scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
      scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
     
      const scopeX = mouseX - scopeOffsetX;
      const scopeY = mouseY - scopeOffsetY;

      const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth;

      const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight;

      let normalizedX = mouseX;
      let normalizedY = mouseY;

      if (outOfBoundsOnX) {
        normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
      }

      if (outOfBoundsOnY) {
        normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
      }

      return { normalizedX, normalizedY };
};

function closeCanvasMenu () {
    $("#canvas-menu").removeClass("visible");
};

function deleteDesignerElement (event) {
    selected_element.remove();
};

function editDesignerElement (event) {
    
};
