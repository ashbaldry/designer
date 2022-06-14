import { Component } from './Component';

export class Column extends Component {
    name = "Column";
    parameters = ["width_num", "offset"];
    updatable = false;
    html = `
        <div class="designer-element col-sm col-sm-$width$$offset_class$"
             data-shinyfunction="column"
             data-shinyattributes="width = $width$$offset_r$"></div>
    `;
    notes = [
        "Columns can only be included in <b>rows</b>.",
        "Rows are split into 12 column units, if the sum of columns' width exceeds 12, they get wrapped onto a new line."
    ]
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
        $("#sidebar-width_num").attr("min", 1);
    }

    createComponent() {
        const width = $("#sidebar-width_num").val();
        const offset = $("#sidebar-offset").val();

        const offset_class = offset > 0 ? ` offset-md-${offset}` : "";
        const offset_r = offset > 0 ? `, offset = ${offset}` : "";

        return this.replaceHTMLPlaceholders(this.html, {width: width, offset_class: offset_class, offset_r: offset_r});
    }
}
