export function initSettings () {
  $('#settings-page_type').on('click', () => $('.canvas-modal').css('display', 'none'))

  $('.copy-ui-button').on('click', copyUICode)
  $('#css_style').on('change', applyCustomStyle)

  $('#remove_label').on('change', toggleComponentLabels)
  $('#remove_colour').on('change', toggleBackgroundColours)
  $('#remove_border').on('change', toggleBorders)
  $('#canvas_clear').on('click', showClearWarning)
  $('#confirm_clear').on('click', clearCanvas)

  $('.component-accordion .card-header button').on('click', scrollToComponent)

  $('body').on('click', () => {
    if (document.querySelector('body').classList.contains('sidebar-mini')) {
      document.querySelector('body').classList.remove('sidebar-mini')
    }
  })

  $(document).on('click', '.clickable-dropdown', e => { e.stopPropagation() })
  $('#preview').on('click', () => { $('.page-canvas-shell').addClass('preview') })
  $('#canvas-close_preview').on('click', () => { $('.page-canvas-shell').removeClass('preview') })

  Shiny.addCustomMessageHandler('toggleBS4DashDeps', toggleBS4DashDeps)
  // eslint-disable-next-line no-eval
  Shiny.addCustomMessageHandler('runjs', function (message) { (0, eval)(message.script) })

  $('body').on('click contextmenu', closeCanvasMenu)
  $('#canvas-canvas').on('contextmenu', showCanvasMenu)
  $('#canvas-menu').on('contextmenu', e => { e.preventDefault() })
  $('#sidebar-container').on('mousedown', closeCanvasMenu)

  $('#canvas-delete').on('click', deleteDesignerElement)

  $('.template-option').on('click', sendSavedTemplateID)
};

function toggleComponentLabels () {
  if (this.checked) {
    $('.designer-page-template').removeClass('hidden-after-label')
  } else {
    $('.designer-page-template').addClass('hidden-after-label')
  }
};

function toggleBackgroundColours () {
  if (this.checked) {
    $('.designer-page-template').removeClass('hidden-colour')
  } else {
    $('.designer-page-template').addClass('hidden-colour')
  }
};

function toggleBorders () {
  if (this.checked) {
    $('.designer-page-template').removeClass('hidden-borders')
  } else {
    $('.designer-page-template').addClass('hidden-borders')
  }
};

function showClearWarning () {
  if ($('#canvas-page').html() === '' || $('#canvas-page.wrapper .tab-content').html() === '') {
    return null
  } else {
    $('#clear_modal').modal()
  }
};

function clearCanvas () {
  $('#canvas-page').html('')
};

function copyUICode () {
  const copyText = document.getElementById('settings-code-code').textContent
  navigator.clipboard.writeText(copyText)
  $('#copy_toast').toast('show')
};

function toggleBS4DashDeps (toggle) {
  const stylesheets = document.styleSheets
  for (let i = 0; i < stylesheets.length; i++) {
    const stylesheet = stylesheets.item(i)
    if (stylesheet.href && (stylesheet.href.includes('AdminLTE') || stylesheet.href.includes('bs4Dash'))) {
      stylesheet.disabled = toggle === 'hide'
    }
  }
};

function scrollToComponent () {
  const cardHeader = this.closest('.card-header').id
  setTimeout(
    () => {
      document.getElementById(cardHeader).scrollIntoView({ behavior: 'smooth', block: 'start' })
      $(this).trigger('blur')
    },
    250
  )
}

let selectedElement

function showCanvasMenu (event) {
  if ($(event.target).closest('.designer-element').length === 0) {
    return
  }
  event.preventDefault()

  const { clientX: mouseX, clientY: mouseY } = event
  const { normalizedX, normalizedY } = normalizeMenuPosition(mouseX, mouseY)

  selectedElement = $(event.target).closest('.designer-element')

  $('#canvas-menu').css('top', `${normalizedY}px`)
  $('#canvas-menu').css('left', `${normalizedX}px`)
  $('#canvas-menu').removeClass('visible')

  setTimeout(() => { $('#canvas-menu').addClass('visible') })
};

function normalizeMenuPosition (mouseX, mouseY) {
  const scope = document.getElementById('canvas-canvas')
  const contextMenu = document.getElementById('canvas-menu')

  let { left: scopeOffsetX, top: scopeOffsetY } = scope.getBoundingClientRect()

  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY

  const scopeX = mouseX - scopeOffsetX
  const scopeY = mouseY - scopeOffsetY

  const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth
  const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight

  let normalizedX = mouseX
  let normalizedY = mouseY

  if (outOfBoundsOnX) {
    normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth
  }
  if (outOfBoundsOnY) {
    normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight
  }

  return { normalizedX, normalizedY }
};

function closeCanvasMenu () {
  $('#canvas-menu').removeClass('visible')
};

function deleteDesignerElement (event) {
  selectedElement.remove()
};

function applyCustomStyle (event) {
  const cssFile = event.target.files[0]
  const canvasStyle = document.getElementById('canvas-style')
  canvasStyle.innerHTML = ''

  const reader = new FileReader()
  reader.onload = (e) => {
    const file = e.target.result
    const lines = file.split(/\r\n|\n/)
    canvasStyle.innerHTML = lines.join('\n')

    const cssRules = canvasStyle.sheet.cssRules
    for (let i = 0; i < cssRules.length; i++) {
      if (cssRules[i].selectorText) {
        cssRules[i].selectorText = addCanvasPageSelector(cssRules[i].selectorText)
      } else if (cssRules[i].media) {
        const cssMediaRules = cssRules[i].cssRules
        for (let j = 0; j < cssMediaRules.length; j++) {
          cssMediaRules[j].selectorText = addCanvasPageSelector(cssMediaRules[j].selectorText)
        }
      }
    }
  }

  reader.onerror = (e) => alert(e.target.error.name)
  reader.readAsText(cssFile)
};

function addCanvasPageSelector (selectors) {
  return selectors.split(/, */g).map((x) => {
    if (x === 'body') {
      return '#canvas-page'
    } else if (/^\.wrapper\.sidebar/.test(x)) {
      return x.replace('.wrapper', '')
    } else {
      return '#canvas-page ' + x
    }
  }).join(', ')
};

let template_selected = false
export function selectedTemplate () {
  return template_selected
};

function sendSavedTemplateID (event) {
  const selected_template = $(event.target).closest('.template-option')
  const page_choice = selected_template.data('page')
  template_selected = true

  $('#settings-page_type').find(`input[value='${page_choice}']`).trigger('click')
  Shiny.setInputValue('settings-template-select', selected_template.data('value'))
  template_selected = false
};
