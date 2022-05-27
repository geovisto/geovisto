import IFilterFormInputProps from "./filter/IFilterFormInputProps";
import ILabeledAutocompleteFormInputProps from "./labeled/autocomplete/ILabeledAutocompleteFormInputProps";
import ILabeledColorFormInputProps from "./labeled/color/ILabeledColorFormInputProps";
import ILabeledCheckboxFormInputProps from "./labeled/checkbox/ILabeledCheckboxFormInputProps";
import ILabeledTextFormInputProps from "./labeled/text/ILabeledTextFormInputProps";
import ILabeledSelectFormInputProps from "./labeled/select/ILabeledSelectFormInputProps";
import ILabeledSliderFormInputProps from "./labeled/slider/ILabeledSliderFormInputProps";
import IMapFormInput from "./IMapFormInput";
import ISelectFormInputProps from "./basic/select/ISelectFormInputProps";
import ITextFormInputProps from "./basic/text/ITextFormInputProps";
import ITextareaFormInputProps from "./basic/textarea/ITextareaFormInputProps";

/**
 * This interface declares a factory for form inputs.
 * 
 * @author Jiri Hynek
 */
interface IMapFormInputFactory {
    
    /**
     * It creates the text form input.
     */
    text(props: ITextFormInputProps): IMapFormInput;
    
    /**
     * It creates the select form input.
     */
    select(props: ISelectFormInputProps): IMapFormInput;
    
    /**
     * It creates the labeled text form input.
     */
    labeledText(props: ILabeledTextFormInputProps): IMapFormInput;
    
    /**
     * It creates the textarea form input.
     */
    textarea(props: ITextareaFormInputProps): IMapFormInput
    
    /**
     * It creates the labeled select form input.
     */
    labeledSelect(props: ILabeledSelectFormInputProps): IMapFormInput;
    
    /**
     * It creates the labeled autocomplete form input.
     */
    labeledAutocomplete(props: ILabeledAutocompleteFormInputProps): IMapFormInput;
    
    /**
     * It creates the filter select form input.
     */
    filterSelect(props: IFilterFormInputProps): IMapFormInput;
    
    /**
     * It creates the filter autocomplete form input.
     */
    filterAutocomplete(props: IFilterFormInputProps): IMapFormInput;

    /**
     * It creates the labeled slider form input.
     */
    labeledSlider(props: ILabeledSliderFormInputProps): IMapFormInput;

    /**
     * It creates the labeled color form input.
     */
    labeledColor(props: ILabeledColorFormInputProps): IMapFormInput;

    /**
     * It creates the labeled checkbox form input.
     */    
    labeledCheckbox(props: ILabeledCheckboxFormInputProps): IMapFormInput;
}
export default IMapFormInputFactory;