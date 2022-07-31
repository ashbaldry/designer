import { Component } from './Component';

export class Box extends Component {
    name = "Box";

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

    createComponent() {
        const label = $("#sidebar-box-label").val();
        
        const width = $("#sidebar-box-width_num").val();   
        const width_class = width > 0 ? `col-sm col-sm-${width}` : "";
        const width_r = width > 0 ? width : "NULL";

        const colour = $("#sidebar-box-colour").val();
        const colour_class = colour === "white" ? "" : `card-outline card-${colour}`;

        const background = $("#sidebar-box-background").val();
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
