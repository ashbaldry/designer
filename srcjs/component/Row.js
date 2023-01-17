import { Component } from './Component'

export class Row extends Component {
  updatable = false
  html = '<div class="designer-element row row-designer" data-shinyfunction="fluidRow"></div>'

  constructor (update_component = true) {
    super()

    if (update_component) {
      this.updateComponent(true)
    }
  }

  sortable_settings = {
    group: {
      name: 'shared',
      put: function (_to, _from, clone) {
        return clone.classList.contains('col-sm')
      }
    }
  }
}
