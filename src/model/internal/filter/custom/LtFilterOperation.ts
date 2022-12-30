import IMapFilterOperation from "../../../types/filter/IMapFilterOperation";
import AbstractMapDomain from "../../domain/abstract/AbstractMapDomain";

/**
 * This class wraps the less than filter operation.
 *
 * @author Jiri Hynek
 */
class LtFilterOperation
  extends AbstractMapDomain
  implements IMapFilterOperation
{
  public constructor() {
    super();
  }

  /**
   * It returns the string label of the filter representing operator.
   */
  public getName(): string {
    return "<";
  }

  /**
   * It checks if value equals pattern.
   *
   * @param value
   * @param pattern
   */
  public match(value: unknown, pattern: string): boolean {
    return new String(value).toString() < pattern;
  }
}
export default LtFilterOperation;
