import IMapFormInput from "../../../types/inputs/IMapFormInput";
import IMapFormInputProps from "../../../types/inputs/IMapFormInputProps";

/**
 * This class represents an abstract form input.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractMapFormInput implements IMapFormInput {
    
    /**
     * Input props passed to constructor.
     */
    private props: IMapFormInputProps;

    public constructor(props: IMapFormInputProps) {
        this.props = props;
    }

    /**
     * It provides the props to the exteded classes.
     */
    protected getProps(): IMapFormInputProps {
        return this.props;
    }

    /**
     * It creates the input element.
     */
    public abstract create(): HTMLElement;

    /**
     * It returns value of the input element.
     */
    public abstract getValue(): unknown;

    /**
     * It sets value of the input element.
     * 
     * @param value 
     */
    public abstract setValue(value: unknown): void;

    /**
     * It sets the input disabled.
     * 
     * @param {*} disabled 
     */
    public abstract setDisabled(disabled: boolean): void;

}
export default AbstractMapFormInput;