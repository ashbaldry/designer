import { Component } from './Component'

export class ValueBox extends Component {
  html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4ValueBox"
             data-shinyattributes="value = &quot;$value$&quot;, subtitle = &quot;$label$&quot;$icon_r$, color = &quot;$colour$&quot;, width = $width_r$">
            <div class="small-box $colour_class$">
                <div class="inner">
                    $value$
                    <p class="small-box-subtitle">
                        $label$
                    </p>
                </div>
                $icon_html$
                <div class="small-box-footer" style="height: 30px;"></div>
            </div>
        </div>
    `

  constructor () {
    super()
    this.updateComponent(true)
  }

  createComponent () {
    const value = $('#sidebar-value_box-value').val()
    const label = $('#sidebar-value_box-label').val()

    const width = $('#sidebar-value_box-width_num').val()
    const width_class = width > 0 ? `col-sm col-sm-${width}` : ''
    const width_r = width > 0 ? width : 'NULL'

    const tab_icon = $('#sidebar-value_box-icon').val()
    const icon_r = tab_icon === '' ? '' : `, icon = icon(&quot;${tab_icon}&quot;)`
    const icon_class = tab_icon === '' ? '' : $('#sidebar-value_box-icon option').html().includes('fab') ? 'fab' : 'fa'
    const icon_html = tab_icon === '' ? '' : `<div class="icon"><i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i></div>`

    const background = $('#sidebar-value_box-background').val()
    const background_class = `bg-${background}`

    return this.replaceHTMLPlaceholders(this.html, {
      value,
      label,
      width_class,
      width_r,
      icon_html,
      icon_r,
      colour: background,
      colour_class: background_class
    })
  };
}
