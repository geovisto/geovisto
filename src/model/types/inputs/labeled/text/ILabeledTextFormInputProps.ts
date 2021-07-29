import ITextFormInputProps from "../../basic/text/ITextFormInputProps";

/**
 * This interface declares specification of a form input props model.
 * 
 * @author Jiri Hynek
 */
interface ILabeledTextFormInputProps extends ITextFormInputProps {
    label: string;
}
export default ILabeledTextFormInputProps;