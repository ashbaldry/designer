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
    getComponent($(el.target).data('shinyelement'))
  })
};
