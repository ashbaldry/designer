import { getComponent } from './utils'
import { component } from './Component'

export function initComponents () {
  getComponent('header')

  $('.component-settings').on('change keyup', () => component.updateComponent())
  $('.component-comments').on('change blur', () => component.updateComponent())
  $('.component-container').on('mouseover', () => { $(':focus').trigger('blur') })

  $('.add-tab-button').on('click', () => component.addPage())
  $('.delete-tab-button').on('click', () => component.deletePage())

  $('.accordion .card-header .btn').on('click', (el) => {
    $(el.target).closest('.card').find('form').trigger('reset')

    const new_component = $(el.target).data('shinyelement')
    getComponent(new_component)
    document.getElementById('sidebar-container').style.display = new_component === 'tab_panel' ? 'none' : null
  })
};
