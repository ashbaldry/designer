import { page, createPage } from '../page/utils'
import { Column } from '../component/Column'
import { Row } from '../component/Row'
import { InputPanel } from '../component/InputPanel'

export const canvasBinding = new Shiny.InputBinding()

$.extend(canvasBinding, {
  find: function (scope) {
    return $(scope).find('.page-canvas-shell')
  },
  getValue: function (el) {
    return $(el).find('.page-canvas').html()
  },
  setValue: function (el, value) {
    $(el).find('.page-canvas').html(value)
  },
  subscribe: function (el, callback) {
    const observer = new MutationObserver(function () { callback() })
    observer.observe(el, { subtree: true, childList: true, attributes: true })
  },
  unsubscribe: function (el) {
    $(el).off('.page-canvas-shell')
  },
  receiveMessage (el, data) {
    $('.canvas-modal').css('display', 'none')

    createPage()
    page.updatePage()

    this.setValue(el, data)

    const sortableSettings = new Column(update_component = false).sortable_settings
    const sortableRowSettings = new Row(update_component = false).sortable_settings
    const sortableInputPanelSettings = new InputPanel(update_component = false).sortableSettings

    PARENT_DESIGNER_CLASSES.map(x => enableSortableComponent(x, sortableSettings))
    enableSortableComponent('designer-element row', sortableRowSettings)
    enableSortableComponent('designer-element shiny-input-panel', sortableInputPanelSettings)

    if (page.enable_on_load) {
      page.enableSortablePage('canvas-page')
    }
    page.updateComponentDropdown()
  }
})

const PARENT_DESIGNER_CLASSES = ['tab-pane', 'designer-element col-sm', 'designer-element card-body']

function enableSortableComponent (selector, settings) {
  document.getElementsByClassName(selector).forEach(el => {
    Sortable.create(el, settings)
  })
}
