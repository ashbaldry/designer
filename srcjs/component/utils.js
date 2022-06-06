import { Header } from './Header';
import { Row } from './Row';
import { Column } from './Column';
import { Text } from './Text';
import { InputPanel } from './InputPanel';
import { Input } from './Input';
import { FileInput } from './FileInput';
import { SelectInput } from './SelectInput';
import { DateInput } from './DateInput';
import { CheckboxInput } from './Checkbox';
import { CheckboxGroupInput } from './CheckboxGroup';
import { SliderInput } from './SliderInput';
import { Button } from './Button';
import { Output } from './Output';
import { Tab } from './Tab';

export function getComponent(name) {
    if (name === "header") {
        return new Header();
    } else if (name === "row") {
        return new Row();
    } else if (name === "column") {
        return new Column();
    } else if (name === "text") {
        return new Text();
    } else if (name === "input_panel") {
        return new InputPanel();
    } else if (name === "input") {
        return new Input();
    } else if (name === "dropdown") {
        return new SelectInput();
    } else if (name === "file") {
        return new FileInput();
    } else if (name === "date") {
        return new DateInput();
    } else if (name === "checkbox") {
        return new CheckboxInput();
    } else if (name === "radio") {
        return new CheckboxGroupInput();
    } else if (name === "slider") {
        return new SliderInput();
    } else if (name === "button") {
        return new Button();
    } else if (name === "output") {
        return new Output();
    } else if (name === "tab_panel") {
        return new Tab();
    }
    

    return new Header();
}