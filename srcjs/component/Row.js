import { Component } from './Component';

export class Row extends Component {
    name = "row";
    parameters = [];
    html = `<div class="designer-element row row-designer" data-shinyfunction="fluidRow"></div>`;
    updatable = false;
    sortable_settings = {
        group: {
            name: "shared",
            put: function (_to, _from, clone) {
                return clone.classList.contains("col-sm");
            }
        }
    };

    constructor() {
        super();
        this.showRelevantOptions();
    }
}
