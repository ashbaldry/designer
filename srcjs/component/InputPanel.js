import { Component } from './Component';

export class InputPanel extends Component {
    updatable = false;
    html = '<div class="designer-element shiny-input-panel shiny-flow-layout" data-shinyfunction="inputPanel"></div>';
    
    sortable_settings = {
        group: {
            name: "shared",
            put: function (_to, _from, clone) {
                return clone.classList.contains("form-group") || clone.classList.contains("btn");
            }
        }
    };
}
