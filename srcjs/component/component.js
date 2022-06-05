export class Component {
    updatable = true;
    name;
    parameters;
    tags;
    sortable_settings;
    html;

    constructor() {};

    showRelevantOptions() {
        $(".component-settings").css("display", "");
        for (let i = 0; i < this.parameters.length; i++) {
            $(".component-settings[data-component= '" + this.parameters[i] + "']").css("display", "unset");
        }
    };

    createComponent() {
        throw new Error("Method not implemented");
    };

    replaceHTMLPlaceholders(html, options) {
        for (const property in options) {
            html = html.replaceAll("$" + property + "$", options[property]);
        } 
        return html;
    };

    updateComponent(update_sortable = false) {
        $(".component-container").html(null);
        const html = this.createComponent();
        $(".component-container").html(html);
        this.addComments();
        if (update_sortable) {
            this.enableSortable();
        }
    };

    enableSortable() {
        var self = this;
        Sortable.create(
            document.getElementById("sidebar-container"), {
            group: {
              name: "shared",
              pull: "clone",
              put: false
            },
            onClone: function(evt) {
              if (this.sortable_settings) {
                Sortable.create(evt.item, this.sortable_settings);
              }
            },
            onEnd: function(evt) {
              $('.page-canvas [data-toggle="tooltip"]').tooltip();
              if (this.updatable || $("#sidebar-comments").val() !== "") {
                $("#sidebar-comments").val("");
                self.updateComponent();
              }
            }
        });
    };

    addComments() {
        const comments = $("#sidebar-comments").val();
        if (comments) {
            $(".component-container>.designer-element").attr("data-shinycomments", comments);
            $(".component-container>.designer-element").attr("title", comments);
            $(".component-container>.designer-element").attr("data-toggle", "tooltip");
        }       
    };

    updateTag() {
        if (this.tags) {
            var selectize = $("#sidebar-tag").selectize()[0].selectize;
            selectize.clearOptions(true);
            selectize.addOption(this.tags);
            selectize.refreshOptions(false);
            selectize.addItem(this.tags[0].value);
        }
    };

    updateText(text) {
        $("#sidebar-text").val(text);
    };

    createID(prefix = "") {
        prefix = prefix ? prefix + "_" : prefix;
        return prefix + Math.random().toString(36).substring(2, 12);
    };

    validateCssUnit (x, fallback) {
        if (this._regex.test(x)) {
            return x;
        } else if (/^\d+$/.test(x)) {
            return x + "px";
        } else {
            return fallback;
        }
    };

    _regex = /^(auto|inherit|fit-content|calc\(.*\)|((\.\d+)|(\d+(\.\d+)?))(%|in|cm|mm|ch|em|ex|rem|pt|pc|px|vh|vw|vmin|vmax))$/;
};
