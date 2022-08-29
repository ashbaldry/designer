import { getComponent } from './utils'

export let component

export function initComponents () {
  component = getComponent('header')
  component.updateComponent(true)

  $('.component-settings').on('change keyup', () => component.updateComponent())
  $('.component-comments').on('change blur', () => component.updateComponent())
  $('.component-container').on('mouseover', () => { $(':focus').trigger('blur') })

  $('.add-tab-button').on('click', () => component.addPage())
  $('.delete-tab-button').on('click', () => component.deletePage())

  $('.accordion .card-header .btn').on('click', (el) => {
    $(el.target).closest('.card').find('form').trigger('reset')
    component = getComponent($(el.target).data('shinyelement'))
    component.updateComponent(true)
  })
};
