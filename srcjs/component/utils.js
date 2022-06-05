import { Header } from './Header';
import { Row } from './Row';
import { Column } from './Column';
import { Text } from './Text';
import { InputPanel } from './InputPanel';
import { Input } from './Input';
import { FileInput } from './FileInput';

export function getComponent(name, update = true) {
    if (name === "header") {
        return new Header(update);
    } else if (name === "row") {
        return new Row(update);
    } else if (name === "column") {
        return new Column(update);
    } else if (name === "text") {
        return new Text(update);
    } else if (name === "input_panel") {
        return new InputPanel(update);
    } else if (name === "input") {
        return new Input(update);
    } else if (name === "file") {
        return new FileInput(update);
    } else {
        return new Header(update);
    }
}