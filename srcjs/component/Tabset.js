import { Component } from './Component'

export class Tabset extends Component {
  _item = 1
  id
  html
  is_tab = true

  constructor () {
    super()
    this.id = this.getTabID()

    if (this.isDashPage()) {
      this.html = `
            <div class="designer-element $width_class$">
                <div class="card bs4Dash card-$colour$ card-outline card-outline-tabs tabset-designer-component">
                    <div class="card-header p-0 border-bottom-0">
                        <ul class="nav nav-tabs" data-tabsetid="$id$">$title$</ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" data-tabsetid="$id$" data-shinyfunction="bs4Dash::bs4TabCard" 
                             data-shinyattributes="$title_r$status = &quot;$colour$&quot;, width = $width_r$"></div>
                    </div>
                </div>
                <script type="application /json">{
                    "title":"$label$","solidHeader":true,"width":$width$,"collapsible":false,"closable":false,"maximizable":false,
                    "gradient":false,"status":"$colour$"
                }</script>                
            </div>`
    } else {
      this.html = `
            <div class="tabbable designer-element tabset-designer-component">
                <ul class="nav nav-$type$" data-tabsetid="$id$"></ul>
                <div class="tab-content" data-tabsetid="$id$" data-shinyfunction="tabsetPanel" data-shinyattributes="type = &quot;$type$&quot;"></div>
            </div>`
    }

    this.updateComponent(true)
  };

  createComponent () {
    if (this.isDashPage()) {
      const label = $('#sidebar-tabset-label').val()
      const title = label === '' ? '' : `<li class="pt-2 px-3"><h3 class="card-title">${label}</h3></li>`
      const title_r = label === '' ? '' : `title = &quot;${label}&quot;, `

      const width = $('#sidebar-tabset-width_num').val()
      const width_class = width > 0 ? `col-sm col-sm-${width}` : ''
      const width_r = width > 0 ? width : 'NULL'

      const colour = $('#sidebar-tabset-colour').val()
      const colour_class = colour === 'white' ? '' : `card-outline card-${colour}`

      const background = $('#sidebar-tabset-background').val()
      const background_class = background === 'white' ? '' : `bg-${background}`

      return this.replaceHTMLPlaceholders(this.html, {
        id: this.id,
        title,
        title_r,
        label,
        width,
        width_class,
        width_r,
        colour,
        colour_class,
        background,
        background_class
      })
    } else {
      const type = $('#sidebar-tabset-type').val()

      return this.replaceHTMLPlaceholders(this.html, {
        id: this.id,
        type
      })
    }
  };

  isDashPage () {
    return this.getPageType() === 'dashboardPage'
  };

  getPageType () {
    return $('#settings-page_type input:radio:checked').val()
  };

  addPage () {
    const tab_name = $('#sidebar-tabset-name').val()
    let tab_value = $('#sidebar-tabset-value').val()
    if (tab_value === '') {
      tab_value = tab_name
    }

    $('#sidebar-tabset-alert div').alert('close')

    if (this.isDashPage()) {
      this.addMenuItem(tab_name, tab_value)
    } else {
      this.addTab(tab_name, tab_value)
    }
  };

  addTab (tab_name, tab_value) {
    const nav_panel = $('.component-container>.tabbable>.nav')
    const nav_id = nav_panel.data('tabsetid')

    const tab_panel = $('.component-container>.tabbable>.tab-content')
    const active_class = tab_panel.children().length === 0 ? 'active' : ''

    const tab_icon = $('#sidebar-tabset-icon').val()
    const icon_r = tab_icon === '' ? '' : `, icon = icon(&quot;${tab_icon}&quot;)`
    const icon_class = tab_icon === '' ? '' : $('#sidebar-tabset-icon option').html().includes('fab') ? 'fab' : 'fa'
    const icon_html = tab_icon === '' ? '' : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i>`

    nav_panel.append(`
            <li class="${active_class}">
                <a href="#tab-${nav_id}-${this._item}" data-toggle="tab"
                   data-bs-toggle="tab" data-value="${tab_value}" data-name="${tab_name}">
                   ${icon_html}
                   ${tab_name}
                </a>
            </li>
        `)

    tab_panel.append(`
            <div class="tab-pane ${active_class}" data-value="${tab_value}" id="tab-${nav_id}-${this._item}"
                 data-shinyfunction="tabPanel" data-shinyattributes="title = &quot;${tab_name}&quot;, value = &quot;${tab_value}&quot;${icon_r}"></div>
        `)

    this.enableSortablePage(`tab-${nav_id}-${this._item}`)
    this._item = this._item + 1
  };

  addMenuItem (tab_name, tab_value) {
    const nav_panel = $('.component-container .card-header>.nav')
    const nav_id = nav_panel.data('tabsetid')

    const tab_panel = $('.component-container .card-body>.tab-content')
    const active_class = tab_panel.children().length === 0 ? 'active' : ''

    const tab_icon = $('#sidebar-tabset-icon').val()
    const icon_r = tab_icon === '' ? '' : `, icon = icon(&quot;${tab_icon}&quot;)`
    const icon_class = tab_icon === '' ? '' : $('#sidebar-tabset-icon option').html().includes('fab') ? 'fab' : 'fa'
    const icon_html = tab_icon === '' ? '' : `<i aria-hidden="true" class="${icon_class} fa-${tab_icon} fa-fw" role="presentation"></i>`

    nav_panel.append(`
            <li class="nav-item">
                <a href="#tab-${nav_id}-${this._item}" class="nav-link ${active_class}" data-toggle="tab"
                   data-bs-toggle="tab" data-value="${tab_value}" data-name="${tab_name}">
                   ${icon_html}
                   ${tab_name}
                </a>
            </li>
        `)

    tab_panel.append(`
            <div class="tab-pane ${active_class}" data-value="${tab_value}" id="tab-${nav_id}-${this._item}"
                 data-shinyfunction="tabPanel" data-shinyattributes="title = &quot;${tab_name}&quot;, value = &quot;${tab_value}&quot;${icon_r}"></div>
        `)

    this.enableSortablePage(`tab-${nav_id}-${this._item}`)
    this._item = this._item + 1
  };

  enableSortablePage (id) {
    Sortable.create(document.getElementById(id), {
      group: {
        name: 'shared',
        put: function (_to, _from, clone) {
          return !clone.classList.contains('col-sm')
        }
      }
    })
  };

  checkDuplicateNames (tab_name) {
    if ($(this.getNameIdentifier(tab_name)).length > 0) {
      $('#sidebar-tabset-alert').html(`
                <div class="alert alert-danger" role="alert">
                    ${tab_name} is the name of an existing menu item. Please choose a unique name
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
      return true
    } else {
      return false
    }
  };

  getNameIdentifier (tab_name) {
    return `.component-container .nav a[data-name='${tab_name}']`
  };

  checkDuplicateIDs (tab_value) {
    if ($(this.getValueIdentifier(tab_value)).length > 0) {
      $('#sidebar-tabset-alert').html(`
                <div class="alert alert-danger" role="alert">
                    ${tab_value} is the ID of an existing menu item. Please choose a unique ID
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
      return true
    } else {
      return false
    }
  };

  getValueIdentifier (tab_value) {
    return `.component-container .nav a[data-value='${tab_value}']`
  };

  deletePage () {
    const tab_name = $('#sidebar-tabset-name').val()
    let tab_value = $('#sidebar-tabset-value').val()

    if (this.checkMissingName(tab_name)) {
      return true
    } else if ($(this.getNameIdentifier(tab_name)).length > 1 && tab_value === '') {
      $('#sidebar-tabset-alert').html(`
                <div class="alert alert-danger" role="alert">
                    Duplicate tabs contain the name "${tab_name}" and no value has been provided. Please provide the specific ID of the tab to delete.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
      return true
    }

    $('#sidebar-tabset-alert div').alert('close')

    if (this.isDashPage()) {
      if (tab_value === '') {
        tab_value = $(`.component-container .nav-item a[data-name='${tab_name}']`).attr('href')
      } else {
        tab_value = '#' + $(`.component-container .tab-pane[data-value='${tab_value}']`).attr('id')
      }
      this.deleteMenuItem(tab_value)
    } else {
      tab_value = tab_value === '' ? $(`.component-container ul.nav a[data-name='${tab_name}']`).data('value') : tab_value
      this.deleteTab(tab_value)
    }
  };

  deleteTab (tab_value) {
    $(`.component-container .nav a[data-value='${tab_value}']`).parent().remove()
    $(`.component-container .tab-content .tab-pane[data-value='${tab_value}']`).remove()
  };

  deleteMenuItem (tab_value) {
    $(`.component-container .nav-item a[href='${tab_value}']`).parent().remove()
    $(`${tab_value}`).remove()
  };

  checkMissingName (tab_name) {
    if ($(this.getNameIdentifier(tab_name)).length > 0) {
      return false
    } else {
      $('#sidebar-tabset-alert').html(`
                <div class="alert alert-danger" role="alert">
                    Unable to find a tab with the name "${tab_name}"
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `)
      return true
    }
  };

  getTabID () {
    return Math.round(Math.random() * 8999 + 1000)
  };
}
