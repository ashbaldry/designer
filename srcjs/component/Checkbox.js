import { Component } from './Component';

export class CheckboxInput extends Component {
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

    createComponent() {
        const label = $("#sidebar-checkbox-label").val();

        let id = $("#sidebar-checkbox-id").val();
        id = id === "" ? this.createID("checkbox") : id;

        const width = this.validateCssUnit($("#sidebar-checkbox-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            style_str: style_str, 
            width_str: width_str
        });
    };   
}
