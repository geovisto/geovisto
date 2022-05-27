import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of a form input props model.
 *
 * @author Jiri Hynek
 */
interface ILabeledAutocompleteFormInputProps extends IMapFormInputProps {
    onChangeAction: ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
    label: string;
    options: string[];
    placeholder?: string;
    setData?: (val: string) => void;
}
export default ILabeledAutocompleteFormInputProps;