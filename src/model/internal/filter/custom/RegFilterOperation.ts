import IMapFilterOperation from "../../../types/filter/IMapFilterOperation";
import AbstractMapDomain from "../../domain/abstract/AbstractMapDomain";

/**
 * This class wraps the regex filter operation.
 *
 * @author Jiri Hynek
 */
class RegFilterOperation
  extends AbstractMapDomain
  implements IMapFilterOperation
{
  /**
   * It creates the regular expression filter operation.
   */
  public constructor() {
    super();
  }

  /**
   * It returns the string label of the filter representing the operator.
   */
  public getName(): string {
    return "reg";
  }

  /**
   * It checks if a value match a regular expression pattern.
   *
   * @param value
   * @param pattern
   */
  public match(value: unknown, pattern: string): boolean {
    return new String(value).match(new RegExp(pattern, "g")) !== null;
  }
}
export default RegFilterOperation;
