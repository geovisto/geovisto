import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";
import IFilterFormInputValue from "../../../../types/inputs/filter/IFilterFormInputValue";
import IFilterFormInputProps from "../../../../types/inputs/filter/IFilterFormInputProps";

const ID = "geovisto-input-filter-select";

const COMPONENT_DIV_CLASS = ID;

/**
 * This class represents a map input composed of three selects used for filters.
 * 
 * @author Jiri Hynek
 */
class FilterSelectFormInput extends AbstractMapFormInput {
    
    /**
     * The input element is created when required.
     */
    private inputDiv?: HTMLDivElement;
    
    /**
     * Input element is composed of 3 HTML select elements
     */
    private input: { 
        data?: HTMLSelectElement,
        op?: HTMLSelectElement,
        val?: HTMLInputElement
    };

    public constructor(props: IFilterFormInputProps) {
        super(props);

        // inputs
        this.input = {
            data: undefined,
            op: undefined,
            val: undefined,
        };
    }
    
    /**
     * Static function returns identifier of the input type
     */
    public static ID(): string {
        return ID;
    }

    /**
     * It returns filter div element composed of 2 selects and one input element.
     */
    public create(): HTMLElement {
        if(this.inputDiv == undefined) {
            const props = <IFilterFormInputProps> this.getProps();
            // create inline container
            this.inputDiv = document.createElement("div");
            this.inputDiv.classList.add(COMPONENT_DIV_CLASS);
            this.input.val = this.createInputElement();
            this.input.op = this.createSelectElement(function() { /* do nothing */ }, props.ops.options);
            this.input.data = this.createSelectElement(function(){ /* TODO: update options of other inputs */}, props.data.options);

            // data select element
            this.inputDiv.appendChild(this.input.data);

            // data op element
            this.inputDiv.appendChild(this.input.op);

            // data val element
            this.inputDiv.appendChild(this.input.val);
        }
        return this.inputDiv;
    }
    
    /**
     * Help static function which creates select element.
     * 
     * @param onChangeAction 
     * @param options 
     */
    protected createSelectElement(onChangeAction: ((this: GlobalEventHandlers, ev: Event) => unknown) | null, options: string[]): HTMLSelectElement {
        // create select element
        const select = document.createElement('select');
        select.onchange = onChangeAction;
        // append options
        let option;
        for(let i = 0; i < options.length; i++) {
            option = select.appendChild(document.createElement("option"));
            option.setAttribute("value", options[i]);
            option.innerHTML = options[i];
        }
        return select;
    }

    /**
     * Help static function which creates select element.
     */
    protected createInputElement(): HTMLInputElement {
        // create input element
        const input = document.createElement('input');
        input.setAttribute("type", "text");
        input.setAttribute("size", "10");
        return input;
    }

    /**
     * It returns values of the inputs.
     */
    public getValue(): IFilterFormInputValue {
        return {
            data: this.input.data ? this.input.data.value : "",
            op: this.input.op? this.input.op.value : "",
            val: this.input.val ? this.input.val.value : "",
        };
    }

    /*
     * Sets/removes attribute 'disabled' from input box.
     */
    public setDisabled(disabled: boolean): void {
        if(this.input) {
            if(disabled == true) {
                this.input.data?.setAttribute("disabled", "true");
                this.input.op?.setAttribute("disabled", "true");
                this.input.val?.setAttribute("disabled", "true");
            } else {
                this.input.data?.removeAttribute("disabled");
                this.input.op?.removeAttribute("disabled");
                this.input.val?.removeAttribute("disabled");
            }
        }
    }
      

    /**
     * It sets values of the inputs.
     * 
     * @param value 
     */
    public setValue(value: IFilterFormInputValue): void {
        if(this.input.data && this.input.op && this.input.val) {
            this.input.data.value = value.data;
            this.input.op.value = value.op;
            this.input.val.value = value.val;
        }
    }
}
export default FilterSelectFormInput;