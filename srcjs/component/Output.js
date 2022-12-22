import { Component } from './Component'

export class Output extends Component {
  types = [
    { value: 'text', label: 'Text', css_class: 'text-output-element shiny-text-output', r_func: 'textOutput', placeholder: 'Text Output: ' },
    { value: 'verbatim', label: 'Verbatim Text', css_class: 'verbatimtext-output-element shiny-text-output', r_func: 'verbatimTextOutput', placeholder: 'Verbatim Text Output: ' },
    { value: 'plot', label: 'Plot', css_class: 'plot-output-element shiny-plot-output', r_func: 'plotOutput' },
    { value: 'image', label: 'Image', css_class: 'image-output-element shiny-image-output', r_func: 'imageOutput' },
    { value: 'table', label: 'Table', css_class: 'table-output-element shiny-datatable-output', r_func: 'DT::DTOutput' },
    { value: 'html', label: 'HTML', css_class: 'html-output-element shiny-html-output', r_func: 'uiOutput', placeholder: 'Placeholder for HTML Output' }
  ]

  html = `
        <$html_tag$ $id_str$ class="designer-element output-element $css_class$"
            style="$style_str$"
            data-shinyfunction="$r_func$"
            data-shinyattributes="outputId = &quot;$id$&quot;$inline_str$$dim_str$">
            $output_tag$
        </$html_tag$>
    `

  constructor () {
    super()
    this.updateComponent(true)
  }

  createComponent () {
    const label = $('#sidebar-output-label').val()

    let id = $('#sidebar-output-id').val()
    id = id === '' ? this.createID('output') : id

    const output_type = $('#sidebar-output-type').val()
    const output_info = this.types.find(x => x.value === output_type)
    if (!output_info) return
    const r_func = output_info.r_func
    let html_tag = output_type === 'verbatim' ? 'pre' : 'div'
    const css_class = output_info.css_class

    let id_str = ''
    if (['plot', 'image', 'table'].includes(output_type)) {
      const designer_id = this.createID('output')
      Shiny.setInputValue('sidebar-outputid', designer_id)
      id_str = `id="sidebar-${designer_id}"`
    }

    const inline = document.getElementById('sidebar-output-inline').checked
    const inline_str = inline && !['verbatim', 'table'].includes(output_type) ? ', inline = TRUE' : ''
    if (inline_str !== '') {
      html_tag = 'span'
    }

    let dim_str = ''
    let style_str = ''

    if (['plot', 'image'].includes(output_type)) {
      const width = this.validateCssUnit($('#sidebar-output-width').val(), '100%')
      style_str = `width: ${width};`
      dim_str = width === '100%' ? '' : `, width = &quot;${width}&quot;`

      const height = this.validateCssUnit($('#sidebar-output-height').val(), '400px')
      style_str = style_str + ` height: ${height};`
      dim_str = dim_str + (height === '400px' ? '' : `, height = &quot;${height}&quot;`)
    }

    let output_tag = ''
    if (output_info.placeholder) {
      if (output_type === 'html') {
        output_tag = `<span>${output_info.placeholder}</span>`
      } else {
        output_tag = `<span>${output_info.placeholder} ${$('#sidebar-output-textarea').val()}</span>`
      }
    }

    return this.replaceHTMLPlaceholders(this.html, {
      html_tag,
      id,
      label,
      id_str,
      r_func,
      css_class,
      style_str,
      dim_str,
      inline_str,
      output_tag
    })
  };

  updateComponent (update_sortable = false) {
    super.updateComponent(update_sortable)

    if (typeof (window) === 'undefined') {
      return null
    }
    Shiny.bindAll()
  };
}
