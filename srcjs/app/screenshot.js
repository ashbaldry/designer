Shiny.addCustomMessageHandler('prepare_canvas_screenshot', (message) => {
  $('.designer-page-template').addClass('hidden-after-label')
  $('.designer-page-template').addClass('hidden-colour')
  $('.designer-page-template').addClass('hidden-borders')
})

Shiny.addCustomMessageHandler('revert_canvas_screenshot', (message) => {
  $('#remove_label').trigger('change')
  $('#remove_colour').trigger('change')
  $('#remove_border').trigger('change')
})
