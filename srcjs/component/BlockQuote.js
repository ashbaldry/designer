import { Component } from './Component'

export class BlockQuote extends Component {
  html = '<blockquote class="designer-element quote-$colour$" data-shinyfunction="bs4Dash::blockQuote" data-shinyattributes="color = &quot;$colour$&quot;">$value$</blockquote>'

  createComponent () {
    const colour = $('#sidebar-quote-colour').val()
    const value = $('#sidebar-quote-textarea').val()

    return this.replaceHTMLPlaceholders(this.html, { colour, value })
  }
}
