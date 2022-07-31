import { Component } from './Component';

export class FileInput extends Component {
    html = `
        <div class="designer-element form-group shiny-input-container"
             data-shinyfunction="fileInput" $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;$width_str$">
            <label class="control-label">$label$</label>
            <div class="input-group">
                <label class="input-group-btn input-group-prepend">
                    <span class="btn btn-default btn-file">
                        Browse...
                        <input type="file" style="position: absolute !important; top: -99999px !important; left: -99999px !important;"/>
                    </span>
                </label>
                <input type="text" class="form-control" placeholder="No file selected" readonly="readonly"/>
            </div>
        </div>
    `;

    createComponent() {
        const label = $("#sidebar-file-label").val();

        let id = $("#sidebar-file-id").val();
        id = id === "" ? this.createID("input") : id;

        const width = this.validateCssUnit($("#sidebar-file-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            style_str: style_str, 
            width_str: width_str
        });
    }    
}
