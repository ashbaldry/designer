import { Component } from './Component';

export class ValueBox extends Component {
    name = "Value Box";
    parameters = ["value", "label", "background", "width_num"];
    notes = [
        "If the width > 0, then the box is included in a column and can only be included in <b>rows</b>",
        "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line"
    ];

    html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4ValueBox"
             data-shinyattributes="value = &quot;$value$&quot;, subtitle = &quot;$label$&quot;, color = &quot;$background$&quot;, width = $width$">
            <div class="small-box $colour_class$">
                <div class="inner">
                    $value$
                    <p class="small-box-subtitle">
                        $label$
                    </p>
                </div>
                <div class="small-box-footer" style="height: 30px;"></div>
            </div>
        </div>
    `;
    
    sortable_settings = {
        group: {
            name: "shared",
            put: function (_to, _from, clone) {
                return !clone.classList.contains("col-sm");
            }
        }
    };

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateTextInput("value", "-");        
        this.updateTextInput("label", "Label");
        this.updateTextInput("width_num", 3);
    }

    createComponent() {
        const value = $("#sidebar-value").val();
        const label = $("#sidebar-label").val();
        
        const width = $("#sidebar-width_num").val();   
        const width_class = width > 0 ? `col-sm col-sm-${width}` : "";
        const width_r = width > 0 ? width : "NULL";

        const background = $("#sidebar-background").val();
        const background_class = background === "white" ? "" : `bg-${background}`;

        return this.replaceHTMLPlaceholders(this.html, {
            value: value,
            label: label, 
            width_class: width_class,
            width_r: width_r,
            colour: background,
            colour_class: background_class
        });
    };   
}
