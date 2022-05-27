import AbstractMapFormInput from "../../abstract/AbstractMapFormInput";
import IMapFormInput from "../../../../types/inputs/IMapFormInput";
import ITextareaFormInputProps from "../../../../types/inputs/basic/textarea/ITextareaFormInputProps";

const ID = "geovisto-input-text-area-labeled";

/**
 * This class represents basic text sidebar input.
 *
 * @author Andrej Tlcina
 */
class TextAreaFormInput extends AbstractMapFormInput implements IMapFormInput {
  private input!: HTMLTextAreaElement;
  private label: string;
  private value: string;
  private div: HTMLDivElement | undefined;
  private onChange: (val: string) => void | null;

  public constructor(props: ITextareaFormInputProps) {
    super(props);
    this.label = props.label || "";
    this.value = props.value || "";
    this.onChange = props.onChangeAction || null;
    this.div = undefined;
  }

  /**
   * Static function returns identifier of the input type.
   */
  public static ID(): string {
    return ID;
  }

  /**
   * It returns input element.
   */
  public create(): HTMLDivElement {
    if (this.div === undefined) {
      this.input = document.createElement("textarea");
      // create div block
      this.div = document.createElement("div");
      this.div.classList.add("textarea-wrapper");
      // append label
      if (this.label) {
        this.div.appendChild(document.createTextNode(this.label + ": "));
      }

      if (this.value) {
        this.input.value = this.value;
      }

      // append input element
      this.div.appendChild(this.input);

      this.input.onchange = this.action;
    }
    return this.div;
  }

  private action(e: Event): void {
    const val = (e.target as HTMLTextAreaElement).value;

    this.setValue(val);

    if (this.onChange) this.onChange(val);
  }

  /**
   * It makes input element visible for the extended classes.
   */
  protected getInput(): HTMLTextAreaElement | undefined {
    return this.input;
  }

  /**
   * It returns value of the input element.
   */
  public getValue(): string {
    return this.input.value;
  }

  /**
   * It sets value of the input element.
   */
  public setValue(value: string): void {
    this.input.value = value;
  }

  public setDisabled(disabled: boolean): void {
    if (this.input) {
      if (disabled) {
        this.input.setAttribute("disabled", "true");
      } else {
        this.input.removeAttribute("disabled");
      }
    }
  }
}
export default TextAreaFormInput;
