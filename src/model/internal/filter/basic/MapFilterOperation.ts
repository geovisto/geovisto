import IMapFilterOperation from "../../../types/filter/IMapFilterOperation";
import AbstractMapDomain from "../../domain/abstract/AbstractMapDomain";

/**
 * This class wraps a filter operation defined by constructor props.
 *
 * @author Jiri Hynek
 */
class MapFilterOperation extends AbstractMapDomain implements IMapFilterOperation
{
  private label: string;

  /**
   * It performs the filter operation which compare a value with a pattern.
   *
   * @param value
   * @param pattern
   */
  public match: (value: unknown, pattern: unknown) => boolean;

  /**
   * It creates a new filter operation.
   *
   * @param label
   * @param acceptFunction
   */
  public constructor(label: string, acceptFunction: (value: unknown, pattern: unknown) => boolean) {
    super();
    this.label = label;
    this.match = acceptFunction;
  }

  /**
   * It returns a unique string label of the filter representing operator given by the parameter of constructor.
   */
  public getName(): string {
    return this.label;
  }
}
export default MapFilterOperation;
