import { Component } from './Component'

export class Input extends Component {
  constructor (type) {
    super()
    this.type = type
  }

  types = [
    { value: 'text_input', label: 'Text', r_func: 'textInput' },
    { value: 'textarea', label: 'Textarea', r_func: 'textAreaInput' },
    { value: 'numeric', label: 'Numeric', r_func: 'numericInput' },
    { value: 'password', label: 'Password', r_func: 'passwordInput' }
  ]

  html = `
        <div class="designer-element form-group shiny-input-container" 
             $style_str$
             data-shinyattributes="inputId = &quot;$id$&quot;, label = &quot;label&quot;$width_str$"
             data-shinyfunction="$r_func$"><label class="control-label">$label$</label>$input_tag$</div>
    `

  createComponent () {
    const label = $(`#sidebar-${this.type}-label`).val()

    let id = $(`#sidebar-${this.type}-id`).val()
    id = id === '' ? this.createID('input') : id

    const input_info = this.types.find(x => x.value === this.type)
    if (!input_info) return
    const r_func = input_info.r_func

    let input_tag
    if (this.type === 'textarea') {
      input_tag = '<textarea class="form-control" placeholder="Textarea input"></textarea>'
    } else {
      input_tag = `<input class="form-control" type="${this.type}" placeholder="${input_info.label} input">`
    }

    const width = this.validateCssUnit($(`#sidebar-${this.type}-width`).val())
    const style_str = width ? `style="width: ${width};"` : ''
    const width_str = width ? `, width = &quot;${width}&quot;` : ''

    return this.replaceHTMLPlaceholders(this.html, {
      id,
      label,
      r_func,
      input_tag,
      style_str,
      width_str
    })
  }
}
