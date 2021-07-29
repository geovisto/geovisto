import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of a form input props model.
 * 
 * @author Jiri Hynek
 */
interface ITextFormInputProps extends IMapFormInputProps {
    onChangeAction : ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
    type?: string;
}
export default ITextFormInputProps;