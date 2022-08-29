import { Component } from './Component'

export class Header extends Component {
  html = '<$tag$ class="designer-element" data-shinyfunction="$tag$">$value$</$tag$>'

  createComponent () {
    const tag = $('#sidebar-header-tag').val()
    const value = $('#sidebar-header-text').val()
    return this.replaceHTMLPlaceholders(this.html, { tag, value })
  }
}
