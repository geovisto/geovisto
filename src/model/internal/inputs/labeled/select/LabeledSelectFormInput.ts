import ILabeledSelectFormInputProps from "../../../../types/inputs/labeled/select/ILabeledSelectFormInputProps";
import IMapFormInput from "../../../../types/inputs/IMapFormInput";
import SelectFormInput from "../../basic/select/SelectFormInput";

const ID = "geovisto-input-select-labeled";

/**
 * This class represents basic select form input composed of options.
 * 
 * @author Jiri Hynek
 */
class LabeledSelectFormInput extends SelectFormInput implements IMapFormInput {
    
    /**
     * The input element is created when required.
     */
    private div?: HTMLDivElement;

    public constructor(props: ILabeledSelectFormInputProps) {
        super(props);
        
        this.div = undefined;
    }
    
    /**
     * Static function returns identifier of the input type
     */
    public static ID(): string {
        return ID;
    }

    /**
     * It returns select element.
     */
    public create(): HTMLElement {
        if(this.div == undefined) {
            // create select element
            const input: HTMLSelectElement = <HTMLSelectElement> super.create();

            // create div block
            this.div = document.createElement("div");

            // append label
            const props = <ILabeledSelectFormInputProps> this.getProps();
            if(props.label != undefined) {
                this.div.appendChild(document.createTextNode(props.label + ": "));
            }

            // append select element
            this.div.appendChild(input);
        }
        
        return this.div;
    }
}
export default LabeledSelectFormInput;