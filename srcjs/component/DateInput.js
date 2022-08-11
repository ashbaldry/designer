import { Component } from './Component';

export class DateInput extends Component {
    html = `
        <div class="designer-element form-group shiny-input-container $date_class$" $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;$width_str$"
             data-shinyfunction="$r_func$">
             <label class="control-label">$label$</label>
             $input_tag$
        </div>
    `;

    date_input_html = `
        <input class="form-control" type="text" title="Date format: yyyy-mm-dd" placeholder="date input"
               data-date-language="en" data-date-week-start="0" data-date-format="yyyy-mm-dd"
               data-date-start-view="month" data-date-autoclose="true"/>
    `;

    date_range_input_html = `
        <div class="input-daterange input-group input-group-sm">
            <input class="form-control" type="text" title="Date format: yyyy-mm-dd" placeholder="date input"
                   data-date-language="en" data-date-week-start="0" data-date-format="yyyy-mm-dd"
                   data-date-start-view="month" data-date-autoclose="true"/>
            <span class="input-group-addon input-group-prepend input-group-append">
                <span class ="input-group-text"> to </span>
            </span>               
            <input class="form-control" type="text" title="Date format: yyyy-mm-dd" placeholder="date input"
                   data-date-language="en" data-date-week-start="0" data-date-format="yyyy-mm-dd"
                   data-date-start-view="month" data-date-autoclose="true"/>        
        </div>       
    `;

    createComponent() {
        const label = $("#sidebar-date-label").val();

        let id = $("#sidebar-date-id").val();
        id = id === "" ? this.createID("input") : id;

        const width = this.validateCssUnit($("#sidebar-date-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        const range = document.getElementById("sidebar-date-range").checked;
        const r_func = range ? "dateRangeInput" : "dateInput";
        const date_class = range ? "shiny-date-range-input" : "shiny-date-input";
        const input_tag = range ? this.date_range_input_html : this.date_input_html;

        return this.replaceHTMLPlaceholders(this.html, {
            id: id,
            label: label, 
            r_func: r_func,
            date_class: date_class,
            input_tag: input_tag,
            style_str: style_str, 
            width_str: width_str
        });
    };   

    updateComponent(update_sortable = false) {
        super.updateComponent(update_sortable);
        $(".component-container").find("input").bsDatepicker();
    };
}
