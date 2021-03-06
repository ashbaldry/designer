import { Component } from './Component';

export class InputPanel extends Component {
    name = "Input Panel";
    parameters = [];
    updatable = false;
    html = `<div class="designer-element shiny-input-panel shiny-flow-layout" data-shinyfunction="inputPanel"></div>`;
    notes = [
        "By default inputs will be aligned vertically, input panels enable the inputs to be aligned horizontally."
    ]
    sortable_settings = {
        group: {
            name: "shared",
            put: function (_to, _from, clone) {
                return clone.classList.contains("form-group") || clone.classList.contains("btn");
            }
        }
    };

    constructor() {
        super();
        this.showRelevantOptions();
    }
}
