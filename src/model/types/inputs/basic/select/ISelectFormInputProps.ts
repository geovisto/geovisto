import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of the form input props model.
 * 
 * @author Jiri Hynek
 */
interface ISelectFormInputProps extends IMapFormInputProps {
    onChangeAction : ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
    options: string[];
}
export default ISelectFormInputProps;