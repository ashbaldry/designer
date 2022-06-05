import { Component } from './Component';

export class SelectInput extends Component {
    name = "Dropdown";
    parameters = ["id", "label", "width"];
    notes = [
        "To position several inputs horizontally, they must be put within an input panel."
    ];

    html = `
        <div class="designer-element form-group shiny-input-container" $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;, choices = NULL$width_str$"
             data-shinyfunction="selectInput">
             <label class="control-label">$label$</label>
             <div>
                <select>
            </div>
        </div>
    `;

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateTextInput("id", "");
        this.updateTextInput("label", "Label");
        this.updateTextInput("width", "");
    }

    createComponent() {
        const label = $("#sidebar-label").val();

        let id = $("#sidebar-id").val();
        id = id === "" ? this.createID("input") : id;

        const width = this.validateCssUnit($("#sidebar-width").val());
        const style_str = width ? `width: ${width};` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            style_str: style_str, 
            width_str: width_str
        });
    };   

    updateComponent(update_sortable = false) {
        super.updateComponent(update_sortable);

        $(".component-container").find("select").selectize({
            labelField: "label",
            valueField: "value",
            searchField: ["label"],
            placeholder: "select input"
        });
    };
}
