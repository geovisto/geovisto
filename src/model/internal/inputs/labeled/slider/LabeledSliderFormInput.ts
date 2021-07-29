import ILabeledSliderFormInputProps from "../../../../types/inputs/labeled/slider/ILabeledSliderFormInputProps";
import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";


const ID = "geovisto-input-range";

const COMPONENT_DIV_LABEL_CLASS = ID + "-label";

const COMPONENT_DIV_INPUT_CLASS = ID + "-component";

const COMPONENT_VALUE_CLASS = ID + "-value";

const COMPONENT_INPUT_CLASS = ID + "-input";

/**
 * This class represents basic text sidebar input.
 * 
 * @author Jakub Kachlik
 * @author Jiri Hynek - conversion to TypeScript
 */
class LabeledSliderFormInput extends AbstractMapFormInput {

    /**
     * The input element is created when required.
     */
    private div?: HTMLDivElement;
    
    /**
     * Basic input is used.
     */
    private input?: HTMLInputElement;

    public constructor(props: ILabeledSliderFormInputProps) {
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
            const props = <ILabeledSliderFormInputProps> this.getProps();

            // div for the whole autocomplete component
            this.div = document.createElement('div');
            this.div.classList.add(ID);

            // label div
            const labelDiv = document.createElement('div');
            labelDiv.classList.add(COMPONENT_DIV_LABEL_CLASS);
            labelDiv.innerHTML = props.label;

            // input div
            const inputDiv = document.createElement('div');
            inputDiv.classList.add(COMPONENT_DIV_INPUT_CLASS);

            const valueDiv = document.createElement('div');
            valueDiv.setAttribute("class", COMPONENT_VALUE_CLASS);
            valueDiv.innerText = props.defaultValue;

            this.input = document.createElement("input");
            this.input.setAttribute("type", "range");
            this.input.setAttribute("class", COMPONENT_INPUT_CLASS);
            this.input.setAttribute("min", props.minValue);
            this.input.setAttribute("max", props.maxValue);
            this.input.setAttribute("value", props.defaultValue);
            this.input.onchange = props.onChangeAction;
            this.input.addEventListener('change', function () {
                valueDiv.innerText = this.value;
            });

            // construct elements
            inputDiv.appendChild(this.input);
            inputDiv.appendChild(valueDiv);

            this.div.appendChild(labelDiv);
            this.div.appendChild(inputDiv);
        }
        

        return this.div;
    }

    /**
     * It returns value of the input element.
     */
    public getValue(): string {
        return this.input?.value ?? "";
    }

    /**
     * It sets value of the input element.
     * 
     * @param value 
     */
    public setValue(value: string): void {
        if(this.input) {
            this.input.value = value;
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
export default LabeledSliderFormInput;