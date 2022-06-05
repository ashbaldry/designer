import { Header } from './Header';
import { Row } from './Row';

export function updateComponent () {

};

export function getComponent(name) {
    if (name === "header") {
        return new Header;
    } else if (name === "row") {
        return new Row;
    } else {
        return new Header;
    }
}