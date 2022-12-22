import { Component } from './Component'

export class SelectInput extends Component {
  html = `
        <div class="designer-element form-group shiny-input-container" $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;$label$&quot;, choices = NULL$width_str$"
             data-shinyfunction="selectInput">
             <label class="control-label">$label$</label>
             <div>
                <select>
            </div>
        </div>
    `

  constructor () {
    super()
    this.updateComponent(true)
  }

  createComponent () {
    const label = $('#sidebar-dropdown-label').val()

    let id = $('#sidebar-dropdown-id').val()
    id = id === '' ? this.createID('input') : id

    const width = this.validateCssUnit($('#sidebar-dropdown-width').val())
    const style_str = width ? `style="width: ${width};"` : ''
    const width_str = width ? `, width = &quot;${width}&quot;` : ''

    return this.replaceHTMLPlaceholders(this.html, {
      id,
      label,
      style_str,
      width_str
    })
  };

  updateComponent (update_sortable = false) {
    super.updateComponent(update_sortable)

    if (typeof (window) === 'undefined') {
      return null
    }
    $('.component-container').find('select').selectize({
      labelField: 'label',
      valueField: 'value',
      searchField: ['label'],
      placeholder: 'select input'
    })
  };
}
