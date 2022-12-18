export let component

export class Component {
  updatable = true
  display_comments = true
  display_container = true
  has_card_body = false
  is_tab = false
  tags
  types
  notes
  sortable_settings
  html

  constructor () {
    document.getElementById('sidebar-container').style.display = null
    component = this
  }

  createComponent () {
    return this.html
  };

  replaceHTMLPlaceholders (html, options) {
    for (const property in options) {
      html = html.replaceAll('$' + property + '$', options[property])
    }
    return html
  };

  updateComponent (update_sortable = false) {
    $('.component-container').html(null)
    const html = this.createComponent()
    $('.component-container').html(html)
    this.addComments()
    if (update_sortable) {
      this.enableSortable()
    }
  };

  enableSortable () {
    Sortable.create(
      document.getElementById('sidebar-container'), {
        group: {
          name: 'shared',
          pull: 'clone',
          put: false
        },
        onClone: function (evt) {
          if (component.sortable_settings) {
            if (component.has_card_body) {
              Sortable.create($(evt.item).find('.card-body')[0], component.sortable_settings)
            } else if (component.is_tab) {
              Sortable.create($(evt.item).find('.tab-content'), component.sortable_settings)
            } else {
              Sortable.create(evt.item, component.sortable_settings)
            }
          }
        },
        onEnd: function (_evt) {
          $('.page-canvas [data-toggle="tooltip"]').tooltip()
          if (component.updatable || $('#sidebar-comments').val() !== '') {
            $('#sidebar-comments').val('')
            component.updateComponent()
          }
        }
      })
  };

  addComments () {
    const comments = $('#sidebar-comments').val()
    if (comments) {
      $('.component-container>.designer-element').attr('data-shinycomments', comments)
      $('.component-container>.designer-element').attr('title', comments)
      $('.component-container>.designer-element').attr('data-toggle', 'tooltip')
    }
  };

  createID (prefix = '') {
    prefix = prefix ? prefix + '_' : prefix
    return prefix + Math.random().toString(36).substring(2, 12)
  };

  validateCssUnit (x, fallback) {
    if (this._regex.test(x)) {
      return x
    } else if (/^\d+$/.test(x)) {
      return x + 'px'
    } else {
      return fallback
    }
  };

  _regex = /^(auto|inherit|fit-content|calc\(.*\)|((\.\d+)|(\d+(\.\d+)?))(%|in|cm|mm|ch|em|ex|rem|pt|pc|px|vh|vw|vmin|vmax))$/
};
