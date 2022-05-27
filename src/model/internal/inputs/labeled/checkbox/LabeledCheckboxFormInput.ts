import ILabeledCheckboxFormInputProps from "../../../../types/inputs/labeled/checkbox/ILabeledCheckboxFormInputProps";
import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";

const ID = 'geovisto-input-checkbox';

/**
 * This class represents basic checkbox sidebar input.
 *
 * @author Krystof Rykala
 * @author Jiri Hynek - conversion to TypeScript
 */
class CheckboxSidebarInput extends AbstractMapFormInput {

    /**
     * The input element is created when required.
     */
    private div?: HTMLDivElement;
    
    /**
     * Basic input is used.
     */
    private input?: HTMLInputElement;
    
    public constructor(props: ILabeledCheckboxFormInputProps) {
        super(props);

        // HTML elements
        this.div = undefined;
        this.input = undefined;
    }

    /**
     * Static function returns identifier of the input type.
     */
    public static ID(): string {
        return ID;
    }

    /**
     * It returns input element.
     */
    public create(): HTMLDivElement {
        if(!this.div) {
            this.div = document.createElement('div');
            this.div.setAttribute('class', ID);

            const labelElement = this.createLabel();
            this.input = this.createCheckbox();

            this.div.appendChild(labelElement);
            this.div.appendChild(this.input);
        }

        return this.div;
    }

    /**
     * A help method which creates the label HTML element.
     */
    protected createLabel(): HTMLDivElement {
        const props = <ILabeledCheckboxFormInputProps> this.getProps();
        const labelElement = document.createElement('div');
        labelElement.innerHTML = props.label;
        labelElement.setAttribute("class", `${ID}-label`);
        return labelElement;
    }

    /**
     * A help method which creates the checkbox HTML element.
     */
     protected createCheckbox(): HTMLInputElement {
        const props = <ILabeledCheckboxFormInputProps> this.getProps();
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.onchange = props.onChangeAction;
        input.name = props.name;
        input.setAttribute("value", String(props.defaultValue || false));
        return input;
    }

    /**
     * It returns the value of the input element.
     */
    public getValue(): boolean {
        return this.input?.checked ?? false;
    }

    /**
     * It sets value of the input element.
     * 
     * @param checked 
     */
    public setValue(checked: boolean): void {
        if(this.input) {
            this.input.checked = checked;
        }
    }

    /*
     * Sets/removes attribute 'disabled' from input box.
     */
    public setDisabled(disabled: boolean): void {
        if(this.input) {
            if(disabled == true) {
                this.input.setAttribute("disabled", "true");            
            } else {
                this.input.removeAttribute("disabled");
            }
        }
    }
}

export default CheckboxSidebarInput;
