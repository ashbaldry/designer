import { Component } from './Component'

export class Text extends Component {
  html = '<$tag$ class="designer-element" data-shinyfunction="tags$$tag$">$value$</$tag$>'

  createComponent () {
    const tag = $('#sidebar-text-tag').val()
    const value = $('#sidebar-text-textarea').val()
    const contents = tag === 'p' ? value.replace(/\n/g, ' ') : this.createListItems(value)

    return this.replaceHTMLPlaceholders(this.html, { tag, value: contents })
  }

  createListItems (text) {
    return text.split('\n').map(x => '<li data-shinyfunction="tags$li">' + x + '</li>').join('')
  }
}
