import { Component } from './Component';

export class Button extends Component {
    name = "Button";
    parameters = ["type", "id", "label", "download", "width"];
    types = [
        {value: "default", label: "Default", css_class: "btn-default"}, 
        {value: "primary", label: "Primary", css_class: "btn-primary"}, 
        {value: "secondary", label: "Secondary", css_class: "btn-secondary"},
        {value: "success", label: "Success", css_class: "btn-success"},
        {value: "danger", label: "Danger", css_class: "btn-danger"}, 
        {value: "warning", label: "Warning", css_class: "btn-warning"}, 
        {value: "info", label: "Info", css_class: "btn-info"},
        {value: "light", label: "Light", css_class: "btn-light"}, 
        {value: "dark", label: "Dark", css_class: "btn-dark"}
    ];

    html = `
        <button class="btn $btn_class$ action-button designer-element"
                type="button" $style_str$
                data-shinyfunction="$r_func$"
                data-shinyattributes="$id_arg$ = &quot;$id$&quot;$class_str$$width_str$">
            $download_icon$
            $label$
        </button>
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
        const btn_class = input_info.css_class;
        const class_str = input_type === "default" ? "" : `, class = &quot;${btn_class}&quot;`;

        const downloadable = document.getElementById("sidebar-download").checked;
        const r_func = downloadable ? "downloadButton" : "actionButton";
        const download_icon = downloadable ? `<i class="fa fa-download" role="presentation" aria-label="download icon"></i>` : "";
        const id_arg = downloadable ? "outputId" : "inputId";

        const width = this.validateCssUnit($("#sidebar-width").val());
        const style_str = width ? `width: ${width};` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            id_arg: id_arg,
            label: label, 
            r_func: r_func, 
            download_icon: download_icon,
            btn_class: btn_class,
            class_str: class_str,
            style_str: style_str, 
            width_str: width_str
        });
    }    
}
