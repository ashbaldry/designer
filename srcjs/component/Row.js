import { Component } from './Component';

export class Row extends Component {
    name = "row";
    parameters = [];
    html = `<div class="designer-element row row-designer" data-shinyfunction="fluidRow"></div>`;

    constructor() {
        super();
        this.showRelevantOptions();
    }

    createComponent() {
        return this.html;
    }
}
