import FilterAutocompleteFormInput from "./filter/autocomplete/FilterAutocompleteFormInput";
import FilterSelectFormInput from "./filter/select/FilterSelectFormInput";
import IFilterFormInputProps from "../../types/inputs/filter/IFilterFormInputProps";
import ILabeledAutocompleteFormInputProps from "../../types/inputs/labeled/autocomplete/ILabeledAutocompleteFormInputProps";
import ILabeledCheckboxFormInputProps from "../../types/inputs/labeled/checkbox/ILabeledCheckboxFormInputProps";
import ILabeledColorFormInputProps from "../../types/inputs/labeled/color/ILabeledColorFormInputProps";
import ILabeledTextFormInputProps from "../../types/inputs/labeled/text/ILabeledTextFormInputProps";
import ILabeledSelectFormInputProps from "../../types/inputs/labeled/select/ILabeledSelectFormInputProps";
import ILabeledSliderFormInputProps from "../../types/inputs/labeled/slider/ILabeledSliderFormInputProps";
import IMapFormInput from "../../types/inputs/IMapFormInput";
import ISelectFormInputProps from "../../types/inputs/basic/select/ISelectFormInputProps";
import ITextAreaFormInputProps from "../../types/inputs/basic/textarea/ITextareaFormInputProps";
import ITextFormInputProps from "../../types/inputs/basic/text/ITextFormInputProps";
import LabeledAutocompleteFormInput from "./labeled/autocomplete/LabeledAutocompleteFormInput";
import LabeledCheckboxFormInput from "./labeled/checkbox/LabeledCheckboxFormInput";
import LabeledColorFormInput from "./labeled/color/LabeledColorFormInput";
import LabeledSliderFormInput from "./labeled/slider/LabeledSliderFormInput";
import SelectFormInput from "./basic/select/SelectFormInput";
import TextAreaFormInput from "./basic/textarea/TextAreaFormInput";
import TextFormInput from "./basic/text/TextFormInput";

/**
 * This class provides a factory for form inputs.
 * 
 * @author Jiri Hynek
 */
class MapFormInputFactory {
    
    /**
     * It creates the text form input.
     */
    public text(props: ITextFormInputProps): IMapFormInput {
        return new TextFormInput(props);
    }
    
    /**
     * It creates the select form input.
     */
    public select(props: ISelectFormInputProps): IMapFormInput {
        return new SelectFormInput(props);
    }
    
    /**
     * It creates the labeled text form input.
     */
    public labeledText(props: ILabeledTextFormInputProps): IMapFormInput {
        return new TextFormInput(props);
    }
    
    /**
     * It creates the labeled select form input.
     */
    public labeledSelect(props: ILabeledSelectFormInputProps): IMapFormInput {
        return new SelectFormInput(props);
    }
    
    /**
     * It creates the labeled autocomplete form input.
     */
    public labeledAutocomplete(props: ILabeledAutocompleteFormInputProps): IMapFormInput {
        return new LabeledAutocompleteFormInput(props);
    }
    
    /**
     * It creates the filter select form input.
     */
    public filterSelect(props: IFilterFormInputProps): IMapFormInput {
        return new FilterSelectFormInput(props);
    }
    
    /**
     * It creates the filter autocomplete form input.
     */
    public filterAutocomplete(props: IFilterFormInputProps): IMapFormInput {
        return new FilterAutocompleteFormInput(props);
    }

    /**
     * It creates the labeled slider form input.
     */
    public labeledSlider(props: ILabeledSliderFormInputProps): IMapFormInput {
        return new LabeledSliderFormInput(props);
    }

    /**
     * It creates the labeled color form input.
     */
    public labeledColor(props: ILabeledColorFormInputProps): IMapFormInput {
        return new LabeledColorFormInput(props);
    }

    /**
     * It creates the labeled checkbox form input.
     */
    public labeledCheckbox(props: ILabeledCheckboxFormInputProps): IMapFormInput {
       return new LabeledCheckboxFormInput(props);
    }

    /**
     * It creates the textarea form input.
     */
    public textArea(props: ITextAreaFormInputProps): IMapFormInput {
        return new TextAreaFormInput(props);
    }
}
export default MapFormInputFactory;