import { Component } from './Component';

export class Row extends Component {
    parameters = [];
    updatable = false;
    html = `<div class="designer-element row row-designer" data-shinyfunction="fluidRow"></div>`;
    notes = [
        "The only component that can be a direct child of a row are columns.",
        "By default, a row will have no height and is determined by the contents inside. To easily drop elements into the rows, they have a minimum height of 50px in this app."
    ];
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
