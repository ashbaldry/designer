import { Component } from './Component';

export class CheckboxGroupInput extends Component {
    types = [
        {value: "radio", label: "Radio", r_func: "radioButtons", role: "radiogroup"}, 
        {value: "checkbox", label: "Checkbox", r_func: "checkboxGroupInput", role: "group"}
    ];

    html = `
        <div class="designer-element form-group shiny-input-container $css_class$" $style_str$
             data-shinyfunction="$r_func$" 
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;$choices_str$$inline_str$$width_str$"
             role="$role">
            <label class="control-label">$label$</label>
            <div class="shiny-options-group">
                $choices$
            </div>
        </div>
    `;

    createComponent() {
        const label = $("#sidebar-radio-label").val();

        let id = $("#sidebar-radio-id").val();
        id = id === "" ? this.createID("checkbox") : id;

        var type = $("#sidebar-radio-type").val();
        const input_info = this.types.find(x => x.value === type);
        if (!input_info) return;
        const r_func = input_info.r_func;
        const role = input_info.role;

        const width = this.validateCssUnit($("#sidebar-radio-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        var inline = document.getElementById("sidebar-radio-inline").checked;
        const inline_class = inline ? "-inline" : "";
        const inline_str = inline ? ", inline = TRUE" : "";
        const css_class = `shiny-input-${type}group${inline_class}`;

        const choices = $("#sidebar-radio-choices").val();
        const choices_str = `, choices = c(&quot;${choices.replace(/\n/g, '&quot;, &quot;')}&quot;)`
        const choices_html = choices.split("\n").map(x => this.createCheckbox(x, type = type, inline = inline)).join("");

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            css_class: css_class,
            r_func: r_func, 
            role: role,
            choices: choices_html,
            choices_str: choices_str, 
            inline_str: inline_str,
            style_str: style_str, 
            width_str: width_str
        });
    };

    createCheckbox(x, type = "checkbox", inline = false) {
        var check_class = inline ? type + "-inline" : type;
        return `<label class="${check_class}"><input type="${type}"><span>${x}</span></label>`;
    };
}
