import IMapData from "../../../types/data/IMapData";
import IMapDataDomain from "../../../types/data/IMapDataDomain";
import IMapDataManager from "../../../types/data/IMapDataManager";
import IMapDataRecord from "../../../types/data/IMapDataRecord";

/**
 * The class wraps data used by the map, its metadata and functions to acquire data items.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractMapDataManager implements IMapDataManager {
    
    private data: unknown;

    /**
     * It initializes the data wrapper providing a basic API.
     * 
     * @param data 
     */
    public constructor(data: unknown) {
        this.data = data;
    }

    /**
     * It returns the original input data.
     */
    public getOriginalData(): unknown {
        return this.data;
    }

    /**
     * It returns the preprocessed data as a list of data reconds of the *same* object type.
     */
    public abstract getDataRecords(): IMapData;

    /**
     * It returns list of data domains.
     */
    public abstract getDomains(): IMapDataDomain[];

    /**
     * It returns list of all values of the selected data domain.
     * 
     * @param dataDomain
     */
    public abstract getValues(dataDomain: IMapDataDomain): unknown[];

    /**
     * Help function which returns the list of data domain string name.
     */
    public getDomainNames(): string[] {
        const names = [];
        const dataDomains: IMapDataDomain[] = this.getDomains();
        for(let i = 0; i < dataDomains.length; i++) {
            names.push(dataDomains[i].getName());
        }
        return names;
    }

    /**
     * It returns the data domain which corresponds to the given string
     * or creates a new one.
     * 
     * @param name 
     */
    public getDomain(name : string): IMapDataDomain | undefined {
        const dataDomains: IMapDataDomain[] = this.getDomains();
        if(dataDomains != undefined) {
            for(let i = 0; i < dataDomains.length; i++) {
                if(dataDomains[i].getName() == name) {
                    return dataDomains[i];
                }
            }
        }
        return undefined;
    }

    /**
     * It returns list of all values of the selected data domain stored in the given data records.
     * 
     * @param dataDomain
     * @param dataRecords
     */
    public abstract getDataRecordsValues(dataDomain: IMapDataDomain, data: IMapData): unknown[];

    /**
     * It returns values stored of the selected data domain stored in the given data record.
     * 
     * @param dataDomain
     * @param dataRecord
     */
    public abstract getDataRecordValues(dataDomain: IMapDataDomain, dataRecord: IMapDataRecord): unknown[];
}
export default AbstractMapDataManager;