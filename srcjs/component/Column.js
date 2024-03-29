import { Component } from './Component'

export class Column extends Component {
  updatable = false
  html = '<div class="designer-element col-sm col-sm-$width$$offset_class$" data-shinyfunction="column" data-shinyattributes="width = $width$$offset_r$"></div>'
  sortable_settings = {
    group: {
      name: 'shared',
      put: function (_to, _from, clone) {
        return !clone.classList.contains('col-sm')
      }
    }
  }

  constructor (update_component = true) {
    super()

    if (update_component) {
      this.updateComponent(true)
    }
  }

  createComponent () {
    const width = $('#sidebar-column-width_num').val()
    const offset = $('#sidebar-column-offset').val()

    const offset_class = offset > 0 ? ` offset-md-${offset}` : ''
    const offset_r = offset > 0 ? `, offset = ${offset}` : ''

    return this.replaceHTMLPlaceholders(this.html, { width, offset_class, offset_r })
  }
}
