import IFilterFormInputProps from "./filter/IFilterFormInputProps";
import ILabeledAutocompleteFormInputProps from "./labeled/autocomplete/ILabeledAutocompleteFormInputProps";
import ILabeledTextFormInputProps from "./labeled/text/ILabeledTextFormInputProps";
import ILabeledSelectFormInputProps from "./labeled/select/ILabeledSelectFormInputProps";
import IMapFormInput from "./IMapFormInput";
import ISelectFormInputProps from "./basic/select/ISelectFormInputProps";
import ITextFormInputProps from "./basic/text/ITextFormInputProps";

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
}
export default IMapFormInputFactory;