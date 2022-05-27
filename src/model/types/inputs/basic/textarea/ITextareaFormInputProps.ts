import IMapFormInputProps from "../../IMapFormInputProps";

/**
 * This interface declares specification of a form input props model.
 *
 * @author Andrej Tlcina
 */
interface ITextareaFormInputProps extends IMapFormInputProps {
  onChangeAction: (val: string) => void;
  label?: string;
  value?: string;
}
export default ITextareaFormInputProps;
