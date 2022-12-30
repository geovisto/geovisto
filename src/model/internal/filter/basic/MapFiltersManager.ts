import IMapData from "../../../types/data/IMapData";
import IMapDataDomain from "../../../types/data/IMapDataDomain";
import IMapDataManager from "../../../types/data/IMapDataManager";
import IMapFilterManager from "../../../types/filter/IMapFilterManager";
import IMapFilterOperation from "../../../types/filter/IMapFilterOperation";
import IMapFilterRule from "../../../types/filter/IMapFilterRule";
import MapDomainArrayManager from "../../domain/generic/MapDomainArrayManager";
import MapFilterRule from "./MapFilterRule";

/**
 * This class provide functions for using filters.
 *
 * @author Jiri Hynek
 */
class MapFiltersManager extends MapDomainArrayManager<IMapFilterOperation> implements IMapFilterManager
{
  public constructor(filterOperations: IMapFilterOperation[]) {
    super(filterOperations);
  }

  /**
   * The function creates a new filter rule using given operation label.
   * If operation does not exists it returns null.
   *
   * @param dataDomain
   * @param label
   * @param pattern
   */
  public createRule(dataDomain: IMapDataDomain, opName: string, pattern: string): IMapFilterRule | null {
    const operation: IMapFilterOperation | undefined = this.getDomain(opName);
    if (operation) {
      return new MapFilterRule(dataDomain, operation, pattern);
    }
    return null;
  }

  /**
   * Takes a list of data and applies the given filter rules.
   * Returns a new list of the references to filtered data items.
   *
   * TODO: define data records type
   *
   * @param dataManager
   * @param dataRecords
   * @param filterRules
   */
  public filterData(
    dataManager: IMapDataManager,
    dataRecords: IMapData,
    filterRules: IMapFilterRule[]
  ): IMapData {
    const resultData: IMapData = [];

    // prepare arrays to save computation time
    const dataDomains: IMapDataDomain[] = [];
    const matchFunctions: ((value: unknown, pattern: string) => boolean)[] = [];
    const patterns: string[] = [];
    for (let i = 0; i < filterRules.length; i++) {
      dataDomains.push(filterRules[i].getDataDomain());
      matchFunctions.push(filterRules[i].getFilterOperation().match);
      patterns.push(filterRules[i].getPattern());
    }

    // go through data
    let doFilter: boolean;
    let values: unknown[];
    for (let i = 0; i < dataRecords.length; i++) {
      doFilter = false;
      for (let j = 0; j < filterRules.length; j++) {
        values = dataManager.getDataRecordValues(
          dataDomains[j],
          dataRecords[i]
        );
        if (values.length == 1) {
          if (!matchFunctions[j](values[0], patterns[j])) {
            doFilter = true;
            break;
          }
        }
      }
      if (!doFilter) {
        // data item is accepted by all filter rules
        resultData.push(dataRecords[i]);
      }
    }

    return resultData;
  }
}
export default MapFiltersManager;
