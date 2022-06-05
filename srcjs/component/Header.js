import { Component } from './Component';

export class Header extends Component {
    name = "header";
    parameters = ["tag", "text"];
    
    tags = [
        {value: "h1", label: "h1", text: "h1"}, 
        {value: "h2", label: "h2", text: "h2"}, 
        {value: "h3", label: "h3", text: "h3"}, 
        {value: "h4", label: "h4", text: "h4"}, 
        {value: "h5", label: "h5", text: "h5"}, 
        {value: "h6", label: "h6", text: "h6"}
    ];

    html = `<$tag$ class="designer-element" data-shinyfunction="$tag$">$value$</$tag$>`;

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateTag();
        this.updateText("Header");
    }

    createComponent() {
        const tag = $("#sidebar-tag").val();
        const value = $("#sidebar-text").val();
        return this.replaceHTMLPlaceholders(this.html, {tag: tag, value: value});
    }
}
