import { Component } from './Component';

export class Box extends Component {
    name = "Box";
    parameters = ["label", "colour", "background", "width_num"];
    notes = [
        "If the width > 0, then the box is included in a column and can only be included in <b>rows</b>",
        "Rows are split into 12 column units, if the sum of boxs' width exceeds 12, they get wrapped onto a new line"
    ];

    html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4Card"
             data-shinyattributes="title = &quot;$label$&quot;, status = &quot;$colour$&quot;, background = &quot;$background$&quot;, width = $width_r$">
            <div class="card bs4Dash $colour_class$ $background_class$">
                <div class="card-header">
                    <h3 class="card-title">$label$</h3>
                    <div class="card-tools float-right">
                        <button class="btn btn-tool btn-sm $background_class$" type="button" data-card-widget="collapse">
                            <i class="fa fa-minus" role="presentation" aria-label="minus icon"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body"></div>
            </div>
            <script type="application /json">{
                "solidHeader":true,"width":$width$,"collapsible":true,"closable":false,"maximizable":false,
                "gradient":false,"background":"$background$","status":"$colour$"
            }</script>
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
        this.updateTextInput("label", "Label");
        this.updateTextInput("width_num", 6);
        $("#sidebar-width_num").attr("min", 0);
    }

    createComponent() {
        const label = $("#sidebar-label").val();
        
        const width = $("#sidebar-width_num").val();   
        const width_class = width > 0 ? `col-sm col-sm-${width}` : "";
        const width_r = width > 0 ? width : "NULL";

        const colour = $("#sidebar-colour").val();
        const colour_class = colour === "white" ? "" : `card-outline card-${colour}`;

        const background = $("#sidebar-background").val();
        const background_class = background === "white" ? "" : `bg-${background}`;

        return this.replaceHTMLPlaceholders(this.html, {
            label: label, 
            width_class: width_class,
            width_r: width_r,
            colour: colour,
            colour_class: colour_class,
            background: background,
            background_class: background_class
        });
    };   
}
