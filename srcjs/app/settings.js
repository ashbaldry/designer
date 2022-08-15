export function initSettings () {
    $(".copy-ui-button").on("click", copyUICode);
    $("#css_style").on("change", applyCustomStyle);

    $("#remove_label").on("change", toggleComponentLabels);
    $("#remove_colour").on("change", toggleBackgroundColours);
    $("#remove_border").on("change", toggleBorders);

    $(".component-accordion .card-header button").on("click", scrollToComponent)

    $("body").on("click", () => {
        if (document.querySelector("body").classList.contains("sidebar-mini")) {
            document.querySelector("body").classList.remove("sidebar-mini");
        }
    });

    $(document).on("click", ".clickable-dropdown", e => { e.stopPropagation(); });
    $("#preview").on("click", () => { $(".page-canvas-shell").addClass("preview"); });
    $("#canvas-close_preview").on("click", () => { $(".page-canvas-shell").removeClass("preview"); });

    Shiny.addCustomMessageHandler("toggleBS4DashDeps", toggleBS4DashDeps);
    Shiny.addCustomMessageHandler("runjs", function(message) { console.log(message); (0, eval)(message.script); });

    $("body").on("click contextmenu", closeCanvasMenu);
    $("#canvas-canvas").on("contextmenu", showCanvasMenu);
    $("#canvas-menu").on("contextmenu", e => { e.preventDefault(); });
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
        if (stylesheet.href && (stylesheet.href.includes("AdminLTE") || stylesheet.href.includes("bs4Dash"))) {
            stylesheet.disabled = toggle === "hide";
        }
    }
};

function scrollToComponent () {
    const card_header = this.closest(".card-header").id;
    setTimeout(
        () => {
            document.getElementById(card_header).scrollIntoView({ behavior: 'smooth', block: 'start' });
            $(this).trigger("blur");
        },
        250
     )
}

let selected_element;

function showCanvasMenu (event) {
    if ($(event.target).closest(".designer-element").length === 0) {
        return;
    }
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

function applyCustomStyle(event) {
    const css_file = event.target.files[0];
    const canvas_style = document.getElementById("canvas-style");
    canvas_style.innerHTML = "";

    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        canvas_style.innerHTML = lines.join('\n');

        const css_rules = canvas_style.sheet.cssRules;
        for (let i = 0; i < css_rules.length; i++) {
            if (css_rules[i].selectorText) {
                css_rules[i].selectorText = addCanvasPageSelector(css_rules[i].selectorText);
            } else if (css_rules[i].media) {
                let media_css_rules = css_rules[i].cssRules;
                for (let j = 0; j < media_css_rules.length; j++) {
                    media_css_rules[j].selectorText = addCanvasPageSelector(media_css_rules[j].selectorText);
                }
            }
        }
    };
  
  reader.onerror = (e) => alert(e.target.error.name);
  reader.readAsText(css_file); 
};

function addCanvasPageSelector(selectors) {
    return selectors.split(/, */g).map((x) => {
        if (x === "body") {
            return "#canvas-page";
        } else if (/^\.wrapper\.sidebar/.test(x)) {
            return x.replace(".wrapper", "");
        } else {
            return "#canvas-page " + x;
        }
    }).join(", ");
};
