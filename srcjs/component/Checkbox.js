import { Component } from './Component';

export class CheckboxInput extends Component {
    name = "Checkbox";
    parameters = ["id", "label", "width"];

    html = `
        <div class="designer-element form-group shiny-input-container" $style_str$
                 data-shinyfunction="checkboxInput"
                 data-shinyattributes="inputId = &quot;$id&quot;, label = &quot;$label&quot;$width_str$">
            <div class="checkbox">
                <label>
                    <input type="checkbox"><span>$label$</span>
                </label>
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
        id = id === "" ? this.createID("checkbox") : id;

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
}
