import { Component } from './Component';

export class Input extends Component {
    types = [
        {value: "text", label: "Text", r_func: "textInput"}, 
        {value: "textarea", label: "Textarea", r_func: "textAreaInput"}, 
        {value: "number", label: "Numeric", r_func: "numericInput"},
        {value: "password", label: "Password", r_func: "passwordInput"}
    ];

    html = `
        <div class="designer-element form-group shiny-input-container" 
             $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;label&quot;$width_str$"
             data-shinyfunction="$r_func$"><label class="control-label">$label$</label>$input_tag$</div>
    `;

    createComponent() {
        const label = $("#sidebar-input-label").val();

        let id = $("#sidebar-input-id").val();
        id = id === "" ? this.createID("input") : id;

        const input_type = $("#sidebar-input-type").val();
        const input_info = this.types.find(x => x.value === input_type);
        if (!input_info) return;
        const r_func = input_info.r_func;

        let input_tag;
        if (input_type === "textarea") {
            input_tag = `<textarea class="form-control" placeholder="Textarea input"></textarea>`;
        } else {
            input_tag = `<input class="form-control" type="${input_type}" placeholder="${input_info.label} input">`;
        }

        const width = this.validateCssUnit($("#sidebar-input-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
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
