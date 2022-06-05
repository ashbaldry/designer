import { Component } from './Component';

export class Text extends Component {
    name = "text";
    parameters = ["tag", "textarea"];
    tags = [
        {value: "p", label: "Paragraph <p>", text: "Paragraph <p>"}, 
        {value: "ol", label: "Ordered List <ol>", text: "Ordered List <ol>"}, 
        {value: "ul", label: "Unordered List <ul>", text: "Unordered List <ul>"}
    ];

    html = `<$tag$ class="designer-element" data-shinyfunction="tags$$tag$">$value$</$tag$>`;

    constructor() {
        super();
        this.showRelevantOptions();
        this.updateTag();
        this.updateTextArea("");
    }

    createComponent() {
        const tag = $("#sidebar-tag").val();
        const value = $("#sidebar-textarea").val();
        const contents = tag === "p" ? value.replace(/\n/g, " ") : this.createListItems(value);

        return this.replaceHTMLPlaceholders(this.html, {tag: tag, value: contents});
    }

    createListItems(text) {
        return text.split("\n").map(x => '<li data-shinyfunction="tags$li">' + x + "</li>").join("");
    }
}
