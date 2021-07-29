import IMapData from "./IMapData";
import IMapDataDomain from "./IMapDataDomain";
import IMapDataRecord from "./IMapDataRecord";
import IMapDomainManager from "../domain/IMapDomainManager";

/**
 * The interface declares map data domain manager which and data wrapper.
 * 
 * @author Jiri Hynek
 */
interface IMapDataManager extends IMapDomainManager<IMapDataDomain> {

    /**
     * It returns the original input data.
     */
    getOriginalData(): unknown;

    /**
     * It returns the preprocessed data as a list of data reconds of the *same* object type.
     */
    getDataRecords(): IMapData;

    /**
     * It returns list of all values of the selected data domain.
     * 
     * @param dataDomain
     */
    getValues(dataDomain: IMapDataDomain): unknown[];

    /**
     * It returns list of all values of the selected data domain stored in the given data records.
     * 
     * @param dataDomain
     * @param dataRecords
     */
    getDataRecordsValues(dataDomain: IMapDataDomain, dataRecords: IMapData): unknown[];

    /**
     * It returns values stored of the selected data domain stored in the given data record.
     * 
     * @param dataDomain
     * @param dataRecord
     */
    getDataRecordValues(dataDomain: IMapDataDomain, dataRecord: IMapDataRecord): unknown[];
}
export default IMapDataManager;