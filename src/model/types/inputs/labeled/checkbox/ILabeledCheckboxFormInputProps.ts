import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of a form input props model.
 * 
 * @author Jiri Hynek
 */
interface ILabeledCheckboxFormInputProps extends IMapFormInputProps {
    onChangeAction : ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
    label: string;
    name: string;
}
export default ILabeledCheckboxFormInputProps;