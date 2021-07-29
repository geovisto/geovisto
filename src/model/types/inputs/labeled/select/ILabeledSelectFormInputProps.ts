import ISelectFormInputProps from "../../basic/select/ISelectFormInputProps";

/**
 * This interface declares specification of a form input props model.
 * 
 * @author Jiri Hynek
 */
interface ILabeledSelectFormInputProps extends ISelectFormInputProps {
    label: string;
}
export default ILabeledSelectFormInputProps;