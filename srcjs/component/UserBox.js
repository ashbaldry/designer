import { Component } from './Component'

export class UserBox extends Component {
  has_card_body = true
  html = `
        <div class="$width_class$ designer-element"
             data-shinyfunction="bs4Dash::bs4UserCard"
             data-shinyattributes="title = bs4Dash::bs4userDescription(title = &quot;$label$&quot;, image = NULL, type = $type$), status = &quot;$colour$&quot;, background = &quot;$background$&quot;, type = $type$, width = $width_r$">
            <div class="card bs4Dash $background_class$ card-widget user-card widget-user">
                <div class="widget-user-header $colour_class$">
                    <div class="card-tools float-right">
                        <button class="btn btn-tool btn-sm btn-$colour$" type="button" data-card-widget="collapse">
                            <i class="fa fa-minus" role="presentation" aria-label="minus icon"></i>
                        </button>
                    </div>
                    <h3 class="widget-user-username">$label$</h3>
                </div>
                <div class="widget-user-image">
                    <img class="img-circle" alt="User Avatar" src="www/avatar.png"/>
                </div>                
                <div class="card-body designer-element" type="$type$"></div>
                <div class="card-footer"></div>
            </div>
        </div>
    `

  sortable_settings = {
    group: {
      name: 'shared',
      put: function (_to, _from, clone) {
        return !clone.classList.contains('col-sm')
      }
    }
  }

  constructor () {
    super()
    this.updateComponent(true)
  }

  createComponent () {
    const label = $('#sidebar-user_box-label').val()

    const width = $('#sidebar-user_box-width_num').val()
    const width_class = width > 0 ? `col-sm col-sm-${width}` : ''
    const width_r = width > 0 ? width : 'NULL'

    const colour = $('#sidebar-user_box-colour').val()
    const colour_class = colour === 'white' ? '' : `card-outline card-${colour}`

    const background = $('#sidebar-user_box-background').val()
    const background_class = background === 'white' ? '' : `bg-${background}`

    const type = $('#sidebar-user_box-type').val()

    return this.replaceHTMLPlaceholders(this.html, {
      label,
      width_class,
      width_r,
      colour,
      colour_class,
      background,
      background_class,
      type
    })
  };
}
