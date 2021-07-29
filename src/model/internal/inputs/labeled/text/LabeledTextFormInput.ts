import ILabeledTextFormInputProps from "../../../../types/inputs/labeled/text/ILabeledTextFormInputProps";
import IMapFormInput from "../../../../types/inputs/IMapFormInput";
import TextFormInput from "../../basic/text/TextFormInput";

const ID = "geovisto-input-text-labeled";

/**
 * This class represents labeled text form input.
 * 
 * @author Jiri Hynek
 * @author Krystof Rykala - input div wrapper
 */
class LabeledTextFormInput extends TextFormInput implements IMapFormInput {
    
    /**
     * The input element is created when required.
     */
    private div?: HTMLDivElement;

    public constructor(props: ILabeledTextFormInputProps) {
        super(props);
        
        this.div = undefined;
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
        if(this.div == undefined) {
            // create div block
            this.div = document.createElement("div");
            this.div.classList.add(ID);

            // append label
            this.div.appendChild(this.createLabel());

            // append input element
            const inputDiv = document.createElement("div");
            inputDiv.setAttribute("class", `${ID}-component`);
            inputDiv.appendChild(super.create());
            this.div.appendChild(inputDiv);
        }
        
        return this.div;
    }

    /**
     * A help method which creates the label HTML element.
     */
    protected createLabel(): HTMLDivElement {
        const props = <ILabeledTextFormInputProps> this.getProps();
        const labelElement = document.createElement("div");
        labelElement.innerHTML = props.label + ": ";
        labelElement.setAttribute("class", `${ID}-label`);
        return labelElement;
    }

}
export default LabeledTextFormInput;