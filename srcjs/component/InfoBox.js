import { Component } from './Component'

export class InfoBox extends Component {
  html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4InfoBox"
             data-shinyattributes="value = &quot;$value$&quot;, subtitle = &quot;$label$&quot;$icon_r$, color = &quot;$colour$&quot;$fill_r$, width = $width_r$">
            <div class="info-box $colour_class$">
                <span class="info-box-icon $colour_class2$">
                    $icon_html$
                </span>
                <div class="info-box-content">
                    <span class="info-box-text">$label$</span>
                    <span class="info-box-number">$value$</span>
                </div>
                <div class="small-box-footer" style="height: 30px;"></div>
            </div>
        </div>
    `

  createComponent () {
    const value = $('#sidebar-info_box-value').val()
    const label = $('#sidebar-info_box-label').val()

    const width = $('#sidebar-info_box-width_num').val()
    const width_class = width > 0 ? `col-sm col-sm-${width}` : ''
    const width_r = width > 0 ? width : 'NULL'

    const tab_icon = $('#sidebar-info_box-icon').val()
    const icon_r = tab_icon === '' ? '' : `, icon = icon(&quot;${tab_icon}&quot;)`
    const icon_class = tab_icon === '' ? '' : $('#sidebar-info_box-icon option').html().includes('fab') ? 'fab' : 'fa'
    const icon_html = tab_icon === '' ? '' : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i>`

    const background = $('#sidebar-info_box-background').val()
    const background_class = `bg-${background}`
    const fill_box = document.getElementById('sidebar-info_box-fill').checked
    const fill_r = fill_box ? ', fill = TRUE' : ''

    return this.replaceHTMLPlaceholders(this.html, {
      value,
      label,
      width_class,
      width_r,
      icon_html,
      icon_r,
      colour: background,
      colour_class: fill_box ? background_class : '',
      colour_class2: fill_box ? '' : background_class,
      fill_r
    })
  };
}
