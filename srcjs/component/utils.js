import { Header } from './Header';
import { Row } from './Row';
import { Column } from './Column';

export function updateComponent () {

};

export function getComponent(name, update = true) {
    if (name === "header") {
        return new Header(update);
    } else if (name === "row") {
        return new Row(update);
    } else if (name === "column") {
        return new Column(update);
    } else {
        return new Header(update);
    }
}