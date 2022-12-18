import { Component } from './Component'

export class Callout extends Component {
  html = `
        <div class="designer-element $width_class$">
        <div class="callout callout-$status$" data-shinyfunction="bs4Dash::bs4Callout" 
             data-shinyattributes="title = &quot;$title$&quot;, status = &quot;$colour$&quot;, width = $width_r$">
           <h5>$title$</h5>
           $value$
        </div>
    `
  constructor () {
    super()
    this.updateComponent(true)
  }

  createComponent () {
    const title = $('#sidebar-callout-label').val()
    const status = $('#sidebar-callout-colour').val()
    const value = $('#sidebar-callout-textarea').val()

    const width = $('#sidebar-callout-width_num').val()
    const width_class = width > 0 ? `col-sm col-sm-${width}` : ''
    const width_r = width > 0 ? width : 'NULL'

    return this.replaceHTMLPlaceholders(this.html, {
      title,
      status,
      value,
      width_r,
      width_class
    })
  }
}
