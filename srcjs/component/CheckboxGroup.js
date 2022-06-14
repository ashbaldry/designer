import { Component } from './Component';

export class CheckboxGroupInput extends Component {
    name = "Checkbox Group";
    parameters = ["type", "id", "label", "choices", "inline", "width"];
    types = [
        {value: "radio", label: "Radio", r_func: "radioButtons", role: "radiogroup"}, 
        {value: "checkbox", label: "Checkbox", r_func: "checkboxGroupInput", role: "group"}
    ];

    html = `
        <div class="designer-element form-group shiny-input-container $css_class$" $style_str$
             data-shinyfunction="$r_func$" 
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;$choices_str$$width_str$"
             role="$role">
            <label class="control-label">$label$</label>
            <div class="shiny-options-group">
                $choices$
            </div>
        </div>
    `;

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateType();
        this.updateTextInput("id", "");
        this.updateTextInput("label", "Label");
        this.updateTextInput("choices", "Choice 1\nChoice 2");
        this.updateTextInput("width", "");
    }

    createComponent() {
        const label = $("#sidebar-label").val();

        let id = $("#sidebar-id").val();
        id = id === "" ? this.createID("checkbox") : id;

        var type = $("#sidebar-type").val();
        const input_info = this.types.find(x => x.value === type);
        if (!input_info) return;
        const r_func = input_info.r_func;
        const role = input_info.role;

        const width = this.validateCssUnit($("#sidebar-width").val());
        const style_str = width ? `width: ${width};` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        var inline = document.getElementById("sidebar-inline").checked;
        const inline_class = inline ? "-inline" : "";
        const css_class = `shiny-input-${type}group${inline_class}`;

        const choices = $("#sidebar-choices").val();
        const choices_str = `, choices = c(&quot;${choices.replace(/\n/g, '&quot;, &quot;')}&quot;)`
        const choices_html = choices.split("\n").map(x => this.createCheckbox(x, id = id, type = type, inline = inline)).join("");

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            css_class: css_class,
            r_func: r_func, 
            role: role,
            choices: choices_html,
            choices_str: choices_str, 
            style_str: style_str, 
            width_str: width_str
        });
    };

    createCheckbox (x, id = "", type = "checkbox", inline = false) {
        var check_class = inline ? type + "-inline" : type;
        return `<label class="${check_class}"><input type="${type}"><span>${x}</span></label>`;
    };
}
