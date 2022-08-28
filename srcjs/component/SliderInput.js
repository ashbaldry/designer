import { Component } from './Component';

export class SliderInput extends Component {
    html = `
        <div class="designer-element form-group shiny-input-container" $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;$value_str$$width_str$"
             data-shinyfunction="sliderInput">
            <label class="control-label">$label$</label>
            <input class="js-range-slider"
                   data-data-type="$format$" data-skin="shiny" data-grid="true" data-grid-num="10"
                   data-grid-snap="false" data-prettifyed-enabled="true" data-prettifyed-separator=","
                   data-keyboard="true" $range_attr$ data-time-format="$time_format$"
                   data-step="$step$" data-min="$min$" data-max="$max$" data-from="$from$">
        </div>
    `;

    createComponent() {
        const label = $("#sidebar-slider-label").val();

        let id = $("#sidebar-slider-id").val();
        id = id === "" ? this.createID("slider") : id;

        const format = $("#sidebar-slider-type").val();  

        const width = this.validateCssUnit($("#sidebar-slider-width").val());
        const style_str = width ? `style="width: ${width};"` : "";
        const width_str = width ? `, width = &quot;${width}&quot;` : "";

        const ranged = document.getElementById("sidebar-slider-range").checked;
        const values = this.getValues(format, ranged);
        const range_attr = ranged ? `data-type="double" data-drag-interval="true" data-to="$to$"` : "";

        return this.replaceHTMLPlaceholders(this.html, {
            range_attr: range_attr,
            id: id,
            label: label, 
            format: format,
            min: values.min,
            max: values.max,
            step: values.step,
            from: values.from,
            to: values.to,
            style_str: style_str, 
            width_str: width_str,
            value_str: values.value_str,
            time_format: values.time_format
        });
    };

    getValues(format, range = false) {
        if (format === "number") {
            return {
                step: 1, min: 0, max: 10, from: 5, to: 7,
                value_str: `, min = 0, max = 10, value = ${range ? "c(5, 7)" : 5}`
            };
        }

        let curr_time, curr_date = new Date();
        if (format === "date") {
            curr_date.setHours(0, 0, 0, 0);
        }

        const step = format === "date" ? 1000 * 60 * 60 * 24 : 1000;
        curr_time = curr_date.getTime();
          
        const min = curr_time - 5 * step;
        const max = curr_time + 5 * step;
        const from = curr_time;
        const to = curr_time + 2 * step;
    
        const r_datefunc = format === "date" ? "Sys.Date()" : "Sys.time()";
        const r_mult = format === "date" ? "" : "000";
        const input_value_str = range ? `"c(${r_datefunc}, ${r_datefunc} + 2${r_mult})"` : r_datefunc;

        return {
            step: step, 
            min: min, 
            max: max, 
            from: from, 
            to: to,
            time_format: format === "date" ? "%F" : "%F %T",
            value_str: `, min = ${r_datefunc} - 5${r_mult}, max = ${r_datefunc} + 5${r_mult}, value = ${input_value_str}`
        };
    }

    updateComponent(update_sortable = false) {
        super.updateComponent(update_sortable);

        const slider_type = $("#sidebar-slider-type").val();
        $(".component-container").find("input").ionRangeSlider({ prettify: this.getSliderPrettifier(slider_type)});
    };

    getSliderPrettifier(type) {
        if (type === "date") {
            return function (num) {
                var sel_date = new Date(num);
                return sel_date.getFullYear() + "-" + (sel_date.getMonth() + 1) + "-" + sel_date.getDate();
            }
        } else if (type === "datetime") {
            return function (num) {
                var sel_date = new Date(num);
                return sel_date.getFullYear() + "-" + (sel_date.getMonth() + 1) + "-" + sel_date.getDate() + " " +
                sel_date.getHours() + ":" + sel_date.getMinutes() + ":" + sel_date.getSeconds();
            }
        } else {
            return null;
        }
    }
}
