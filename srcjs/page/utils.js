import { BasicPage } from './BasicPage'
import { FillPage } from './FillPage'
import { FixedPage } from './FixedPage'
import { FluidPage } from './FluidPage'
import { BootstrapPage } from './BootstrapPage'
import { NavbarPage } from './NavbarPage'
import { DashboardPage } from './DashboardPage'
import { selectedTemplate, templateUpated } from '../app/settings'

export let page

export function createPage () {
  const page_type = $('#settings-page_type input:radio:checked').val()

  if (page_type === 'basicPage') {
    page = new BasicPage()
  } else if (page_type === 'fillPage') {
    page = new FillPage()
  } else if (page_type === 'fixedPage') {
    page = new FixedPage()
  } else if (page_type === 'fluidPage') {
    page = new FluidPage()
  } else if (page_type === 'bootstrapPage') {
    page = new BootstrapPage()
  } else if (page_type === 'navbarPage') {
    page = new NavbarPage()
  } else if (page_type === 'dashboardPage') {
    page = new DashboardPage()
  } else {
    page = new BasicPage()
  }

  page.updatePage()
  if (page.enable_on_load) {
    page.enableSortablePage('canvas-page')
  }
  page.updateComponentDropdown()
  return page
};

export function selectPage () {
  let button_el = $(this)
  if (!$(this).hasClass('canvas-page-choice')) {
    button_el = $(this).closest('.canvas-page-choice')
  }

  button_el.closest('.canvas-modal').css('display', 'none')

  const page_choice = button_el.data('page')
  $('#settings-page_type').find(`input[value='${page_choice}']`).trigger('click')
}

export function changePageCheck () {
  if (selectedTemplate()) {
    createPage()
    templateUpated()
    return
  }

  if ($('#canvas-page').html() === '' || $('#canvas-page.wrapper .tab-content').html() === '') {
    $('#canvas-page').html('<div></div>')
    createPage()
  } else {
    $('#warning_modal').modal()
  }
};

export function revertPageSelection () {
  $(`#settings-page_type input[value="${page.name}"]`).trigger('click')
}

export function updateTitle (el) {
  const title = $(el.target).val()
  $('#canvas-title').html(title)
  $('.navbar-brand').html(title)
  $('.brand-link').html(title)

  if ($('#canvas-page').data('shinyattributes')) {
    const shiny_atts = $('#canvas-page').data('shinyattributes').replace(/"[^"]+"/, `"${title}"`)
    $('#canvas-page').attr('data-shinyattributes', shiny_atts)
  }

  if ($('#canvas-page>.main-header').data('shinyattributes')) {
    const shiny_atts2 = $('#canvas-page>.main-header').data('shinyattributes').replace(/"[^"]+"/, `"${title}"`)
    $('#canvas-page>.main-header').attr('data-shinyattributes', shiny_atts2)
  }
}
