import IMapFormInput from "../../../../types/inputs/IMapFormInput";
import ITextFormInputProps from "../../../../types/inputs/basic/text/ITextFormInputProps";
import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";

const ID = "geovisto-input-text";

/**
 * This class represents basic text form input.
 * 
 * @author Jiri Hynek
 * @author Krystof Rykala - generic input types
 */
class TextFormInput extends AbstractMapFormInput implements IMapFormInput {
    
    /**
     * Basic input is used.
     */
    private input?: HTMLInputElement;

    public constructor(props: ITextFormInputProps) {
        super(props);
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
    public create(): HTMLElement {
        if(this.input == undefined) {
            const props = <ITextFormInputProps> this.getProps();
            this.input = document.createElement("input");
            this.input.setAttribute("class", `${ID}-input`);
            this.input.setAttribute("type", props.type ?? "text");
            this.input.onchange = (<ITextFormInputProps> this.getProps()).onChangeAction;
        }
        return this.input;
    }

    /**
     * It makes input element visible for the extended classes.
     */
    protected getInput(): HTMLInputElement | undefined {
        return this.input;
    }

    /**
     * It returns value of the input element.
     */
    public getValue(): string {
        return this.input ? this.input.value : "";
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
export default TextFormInput;