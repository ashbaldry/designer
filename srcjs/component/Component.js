import { component } from "./init";

export class Component {
    updatable = true;
    name;
    parameters;
    tags;
    types;
    notes;
    sortable_settings;
    html;

    constructor() {};

    showRelevantOptions() {
        $(".component-settings").css("display", "");
        for (let i = 0; i < this.parameters.length; i++) {
            $(".component-settings[data-component= '" + this.parameters[i] + "']").css("display", "unset");
        }
        this.updateTitle();
        this.updateNotes();
    };

    updateTitle() {
        const title = this.name ? `${this.name} Settings` : null;
        $("#sidebar-title").html(title);
    }

    updateNotes() {
        $("#sidebar-notes").html(null);
        if (this.notes) {
            $("#sidebar-notes").html("<h3>Notes</h3><ul></ul>");
            for (let i = 0; i < this.notes.length; i++) {
                $("#sidebar-notes ul").append("<li>" + this.notes[i] + "</li>");
            }
        }
    };

    createComponent() {
        return this.html;
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
        Sortable.create(
            document.getElementById("sidebar-container"), {
            group: {
              name: "shared",
              pull: "clone",
              put: false
            },
            onClone: function(evt) {
                if (component.sortable_settings) {
                    Sortable.create(evt.item, component.sortable_settings);
                }
            },
            onEnd: function(_evt) {
                $('.page-canvas [data-toggle="tooltip"]').tooltip();
                if (component.updatable || $("#sidebar-comments").val() !== "") {
                    $("#sidebar-comments").val("");
                    component.updateComponent();
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

    updateType() {
        if (this.types) {
            var selectize = $("#sidebar-type").selectize()[0].selectize;
            selectize.clearOptions(true);
            selectize.addOption(this.types);
            selectize.refreshOptions(false);
            selectize.addItem(this.types[0].value);
        }
    };
    
    updateTextInput(id, text = "") {
        $(`#sidebar-${id}`).val(text);
    };

    updateText(text = "") {
        $("#sidebar-text").val(text);
    };

    updateTextArea(text = "") {
        $("#sidebar-textarea").val(text);
    };

    updateTextLabel(text = "label") {
        $("#sidebar-label").val(text);
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
