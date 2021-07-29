import IFilterFormInputProps from "../../../../types/inputs/filter/IFilterFormInputProps";
import IFilterFormInputValue from "../../../../types/inputs/filter/IFilterFormInputValue";
import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";
import LabeledAutocompleteFormInput from "../../labeled/autocomplete/LabeledAutocompleteFormInput";

const ID = "geovisto-input-filter-autocomplete";

const COMPONENT_DIV_CLASS = ID;

/**
 * This class represents a form input composed of three autocomplete inputs used for filters.
 * 
 * @author Jakub Kachlik
 * @author Jiri Hynek (refactoring, code review)
 */
class FilterAutocompleteFormInput extends AbstractMapFormInput {

    /**
     * The input element is created when required.
     */
    private inputDiv: HTMLDivElement | null;
    
    /**
     * Input element is composed of 3 HTML select elements
     */
    private input: { 
        data: LabeledAutocompleteFormInput,
        op: LabeledAutocompleteFormInput,
        val: LabeledAutocompleteFormInput
    } | null;

    public constructor(props: IFilterFormInputProps) {
        super(props);

        // inputs
        this.inputDiv = null;
        this.input = null;
    } 

    /**
     * Static function returns identifier of the input type
     */
    public static ID(): string {
        return ID;
    }

    /**
     * It returns filter div element composed of 3 autocomplete form inputs.
     */
    public create(): HTMLElement {
        if(this.inputDiv == undefined) {
            // create parent div
            this.inputDiv = document.createElement("div");
            this.inputDiv.classList.add(COMPONENT_DIV_CLASS);

            // initialize filter inputs
            const props = <IFilterFormInputProps> this.getProps();
            this.input = {
                val: new LabeledAutocompleteFormInput({ label: "Value", options: [], onChangeAction: props.vals.onChangeAction }),
                op: new LabeledAutocompleteFormInput({ label: "Operation", options: props.ops.options, onChangeAction: props.ops.onChangeAction }),
                data: new LabeledAutocompleteFormInput({ label: "Data", options: props.data.options, onChangeAction: props.data.onChangeAction })
            };

            // create elements of filter inputs and add them to parent div
            this.inputDiv.appendChild(this.input.data.create());
            this.inputDiv.appendChild(this.input.op.create());
            this.inputDiv.appendChild(this.input.val.create());
        }

        return this.inputDiv;
    }

    /**
     * It returns values of the inputs.
     */
    public getValue(): IFilterFormInputValue {
        return this.input ? {
            data: this.input.data.getValue(),
            op: this.input.op.getValue(),
            val: this.input.val.getValue(),
        } : {
            data: "",
            op: "",
            val: ""
        };
    }

    /**
     * It sets values of the inputs.
     * 
     * @param value 
     */
    public setValue(value: IFilterFormInputValue): void {
        if(this.input) {
            this.input.data.setValue(value.data);
            this.input.op.setValue(value.op);
            this.input.val.setValue(value.val);
        }
    }

    /*
     * Sets/removes attribute 'disabled' from input box.
     */
    public setDisabled(disabled: boolean): void {
        if(this.input) {
            this.input.data.setDisabled(disabled);
            this.input.op.setDisabled(disabled);
            this.input.val.setDisabled(disabled);
        }
    }
    
    /**
     * It returns input
     */
    public getInputElement(): { 
        data: LabeledAutocompleteFormInput,
        op: LabeledAutocompleteFormInput,
        val: LabeledAutocompleteFormInput
    } | null {
        return this.input;
    }
}
export default FilterAutocompleteFormInput;