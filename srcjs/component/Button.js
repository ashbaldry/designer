import { Component } from './Component';

export class Button extends Component {
    types = [
        {value: "default", css_class: "btn-default"}, 
        {value: "primary", css_class: "btn-primary"}, 
        {value: "secondary", css_class: "btn-secondary"},
        {value: "success", css_class: "btn-success"},
        {value: "danger", css_class: "btn-danger"}, 
        {value: "warning", css_class: "btn-warning"}, 
        {value: "info", css_class: "btn-info"},
        {value: "light", css_class: "btn-light"}, 
        {value: "dark", css_class: "btn-dark"}
    ];

    html = `
        <button class="btn $btn_class$ action-button designer-element"
                type="button" $style_str$
                data-shinyfunction="$r_func$"
                data-shinyattributes="$id_arg$ = &quot;$id$&quot;$icon_r$$class_str$$width_str$">
            $icon_html$
            $label$
        </button>
    `;

    createComponent() {
        const label = $("#sidebar-button-label").val();

        let id = $("#sidebar-button-id").val();
        id = id === "" ? this.createID("input") : id;

        const input_type = $("#sidebar-button-type").val();
        const input_info = this.types.find(x => x.value === input_type);
        if (!input_info) return;
        const btn_class = input_info.css_class;
        const class_str = input_type === "default" ? "" : `, class = &quot;${btn_class}&quot;`;      

        const downloadable = document.getElementById("sidebar-button-download").checked;
        const r_func = downloadable ? "downloadButton" : "actionButton";
        let icon_html = downloadable ? `<i class="fa fa-download" role="presentation" aria-label="download icon"></i>` : "";
        const id_arg = downloadable ? "outputId" : "inputId";

        const tab_icon = $("#sidebar-button-icon").val();
        const icon_r = tab_icon === "" || downloadable ? "" : `, icon = icon(&quot;${tab_icon}&quot;)`;
        const icon_class = tab_icon === "" || downloadable ? "" : $("#sidebar-button-icon option").html().includes("fab") ? "fab" : "fa";
        icon_html = tab_icon === "" || downloadable ? icon_html : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i>`;          

        const width = this.validateCssUnit($("#sidebar-button-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            id_arg: id_arg,
            label: label, 
            r_func: r_func, 
            icon_r: icon_r,
            icon_html: icon_html,
            btn_class: btn_class,
            class_str: class_str,
            style_str: style_str, 
            width_str: width_str
        });
    }    
}
