import IMapFilterOperation from "../../../types/filter/IMapFilterOperation";
import AbstractMapDomain from "../../domain/abstract/AbstractMapDomain";

/**
 * This class wraps the equals filter operation.
 *
 * @author Jiri Hynek
 */
class EqFilterOperation
  extends AbstractMapDomain
  implements IMapFilterOperation
{
  /**
   * It creates the equals filter operation.
   */
  public constructor() {
    super();
  }

  /**
   * It returns the string label of the filter representing the operator.
   */
  public getName(): string {
    return "==";
  }

  /**
   * It checks if a value equals to a pattern.
   *
   * @param value
   * @param pattern
   */
  public match(value: unknown, pattern: string): boolean {
    return value == pattern;
  }
}
export default EqFilterOperation;
