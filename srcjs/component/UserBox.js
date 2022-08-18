import { Component } from './Component';

export class UserBox extends Component {
    has_card_body = true;
    html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4UserCard"
             data-shinyattributes="title = bs4Dash::bs4userDescription(title = &quot;$label$&quot;, image = NULL, type = $type$), status = &quot;$colour$&quot;, background = &quot;$background$&quot;, type = $type$, width = $width_r$">
            <div class="card bs4Dash $background_class$ card-widget user-card widget-user">
                <div class="widget-user-header $colour_class$">
                    <div class="card-tools float-right">
                        <button class="btn btn-tool btn-sm btn-$colour$" type="button" data-card-widget="collapse">
                            <i class="fa fa-minus" role="presentation" aria-label="minus icon"></i>
                        </button>
                    </div>
                    <h3 class="widget-user-username">$label$</h3>
                </div>
                <div class="widget-user-image">
                    <img class="img-circle" alt="User Avatar"/>
                </div>                
                <div class="card-body" type="$type$"></div>
                <div class="card-footer"></div>
            </div>
            <script type="application /json">{
                "title":"&lt;div class=\"widget-user-header\"&gt;\n  &lt;h3 class=\"widget-user-username\"&gt;$label$&lt;\/h3&gt;\n&lt;\/div&gt;\n&lt;div class=\"widget-user-image\"&gt;\n  &lt;img class=\"img-circle\" alt=\"User Avatar\"/&gt;\n&lt;\/div&gt;"
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
        const label = $("#sidebar-user_box-label").val();
        
        const width = $("#sidebar-user_box-width_num").val();   
        const width_class = width > 0 ? `col-sm col-sm-${width}` : "";
        const width_r = width > 0 ? width : "NULL";

        const colour = $("#sidebar-user_box-colour").val();
        const colour_class = colour === "white" ? "" : `card-outline card-${colour}`;

        const background = $("#sidebar-user_box-background").val();
        const background_class = background === "white" ? "" : `bg-${background}`;

        const type = $("#sidebar-user_box-type").val();

        return this.replaceHTMLPlaceholders(this.html, {
            label: label, 
            width_class: width_class,
            width_r: width_r,
            colour: colour,
            colour_class: colour_class,
            background: background,
            background_class: background_class,
            type: type
        });
    };   
}
