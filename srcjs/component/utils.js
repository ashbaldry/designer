import { Header } from './Header';

export function updateComponent () {

};

export function getComponent(name) {
    if (name === "header") {
        return new Header;
    } else {
        return new Header;
    }
}