import { Component } from './Component';

export class Input extends Component {
    name = "Input";
    parameters = ["type", "id", "label", "width"];
    types = [
        {value: "text", label: "Text", r_func: "textInput"}, 
        {value: "textarea", label: "Text Area", r_func: "textAreaInput"}, 
        {value: "number", label: "Numeric", r_func: "numericInput"},
        {value: "password", label: "Password", r_func: "passwordInput"}
    ];
    notes = [
        "To position several inputs horizontally, they must be put within an input panel."
    ];

    html = `
        <div class="designer-element form-group shiny-input-container" 
             $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;label&quot;$style_str$"
             data-shinyfunction="$r_func$"><label class="control-label">$label$</label>$input_tag$</div>
    `;

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateType();
        this.updateTextInput("id", "");
        this.updateTextInput("label", "Label");
        this.updateTextInput("width", "");
    }

    createComponent() {
        const label = $("#sidebar-label").val();

        let id = $("#sidebar-id").val();
        id = id === "" ? this.createID("input") : id;

        const input_type = $("#sidebar-type").val();
        const input_info = this.types.find(x => x.value === input_type);
        const r_func = input_info.r_func;

        let input_tag;
        if (input_type === "textarea") {
            input_tag = `<textarea class="form-control" placeholder="textarea input"></textarea>`;
        } else {
            input_tag = `<input class="form-control" type="${input_type}" placeholder="${input_info.label} input">`;
        }

        const width = this.validateCssUnit($("#sidebar-width").val());
        const style_str = width ? `width: ${width};` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            r_func: r_func, 
            input_tag: input_tag, 
            style_str: style_str, 
            width_str: width_str
        });
    }    
}
