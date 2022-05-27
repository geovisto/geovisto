import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of a form input props model.
 * 
 * @author Jiri Hynek
 */
interface ILabeledSliderFormInputProps extends IMapFormInputProps {
    onChangeAction : ((this: GlobalEventHandlers, ev: Event) => unknown) | null;
    label: string;
    defaultValue: string;
    maxValue: string;
    minValue: string;
    step?: number;
}
export default ILabeledSliderFormInputProps;