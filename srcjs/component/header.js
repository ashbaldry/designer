import { Component } from './component';

class Header extends Component {
    #name = "header";
    #parameters = ["tag", "text"];
    #tags = ["h1", "h2", "h3", "h4", "h5", "h6"];

    constructor() {
        $(".component-tags").selectize({
            values: this.#tags,
            selected: this.#tags[0]
        })
    }
}
