import { Component } from './Component';

export class Column extends Component {
    name = "column";
    parameters = ["width_num", "offset"];
    html = `
        <div class="designer-element col-sm col-sm-$width$$offset_class$"
             data-shinyfunction="column"
             data-shinyattributes="width = $width$$offset_r$"></div>
    `;
    updatable = false;
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
    }

    createComponent() {
        const width = $("#sidebar-width_num").val();
        const offset = $("#sidebar-offset").val();

        var offset_class = offset > 0 ? ` offset-md-${offset}` : "";
        var offset_r = offset > 0 ? `, offset = ${offset}` : "";

        return this.replaceHTMLPlaceholders(this.html, {width: width, offset_class: offset_class, offset_r: offset_r});
    }
}
