import rfdc from 'rfdc';

import IMapData from '../../../types/data/IMapData';
import IMapDataDomain from '../../../types/data/IMapDataDomain';
import IMapDataManager from '../../../types/data/IMapDataManager';
import IMapDataRecord from '../../../types/data/IMapDataRecord';
import IMapDataRecordItem from '../../../types/data/IMapDataRecordItem';
import AbstractMapDataManager from '../abstract/AbstractMapDataManager';
import FlattenedMapDataDomain from './JsonMapDataDomain';
import JsonMapDataDomain from './JsonMapDataDomain';

/**
 * A data wrapper which provides a basic flattening of JSON data structure.
 * 
 * @author Jiri Hynek
 */
class JsonMapDataManager extends AbstractMapDataManager implements IMapDataManager {
    
    /**
     * The list is initialized when required.
     */
    private dataRecords?: IMapData;

    /**
     * The list is initialized when required.
     */
    private dataDomains?: IMapDataDomain[];

    /**
     * It creates JSON data manager
     * 
     * @param data 
     */
    public constructor(data: unknown) {
        super(data);
    }

    /**
     * It returns the original input data.
     */
    public getOriginalData(): unknown {
        return super.getOriginalData();
    }

    /**
     * It returns preprocessed flattened data.
     */
    public getDataRecords(): IMapData {
        if(this.dataRecords == undefined) {
            this.dataRecords = this.createDataRecords(this.getOriginalData());
        }
        return this.dataRecords;
    }

    /**
     * It returns list of data domains (IMapDataDomain) representing data dimensions e. g.:
     * [
     *   [ 'value' ],
     *   [ 'source', 'ip' ],
     *   [ 'source', 'country' ],
     *   [ 'target', 'ip' ],
     *   [ 'target', 'country' ]
     * ]
     * 
     */
    public getDomains(): IMapDataDomain[] {
        if(this.dataDomains == undefined) {
            this.dataDomains = this.createDataDomains();
        }

        return this.dataDomains;
    }

    /**
     * It returns the data domain which corresponds to the given string.
     * 
     * If data domain does not exists it creates a new one (to avoid undefined return value)
     * 
     * @param name 
     */
    public getDomain(name: string): IMapDataDomain {
        const dataDomain: IMapDataDomain | undefined = super.getDomain(name);
        return dataDomain ? dataDomain : new JsonMapDataDomain(name.split('.'));
    }

    /**
     * It returns list of all values of the selected data domain.
     * 
     * @param dataDomain
     */
    public getValues(dataDomain: IMapDataDomain): unknown[] {
        return this.getDataRecordsValues(dataDomain, this.getDataRecords());
    }

    /**
     * It returns list of all values of the selected data domain
     * for the given subset of data.
     * 
     * @param dataDomain 
     * @param dataRecords 
     */
    public getDataRecordsValues(dataDomain: IMapDataDomain, dataRecords: IMapData): unknown[] {
        const result: unknown[] = [];

        if(dataRecords != undefined) {
            for(let i = 0; i < dataRecords.length; i++) {
                const actResult: unknown[] = [];
                this.processDataDomainDescription(actResult, dataRecords[i], (dataDomain as JsonMapDataDomain).getOriginal(), 0);
                // add only unique results
                for(let j = 0; j < actResult.length; j++) {
                    if(!result.includes(actResult[j])) {
                        result.push(actResult[j]);
                    }
                }
            }
        }

        return result;
    }

    /**
     * It returns values stored of the selected data domain stored in the given data record.
     * 
     * @param dataDomain
     * @param dataRecord
     */
    public getDataRecordValues(dataDomain: IMapDataDomain, dataRecord: IMapDataRecord): unknown[] {
        const result: unknown[] = [];

        if(dataRecord != undefined) {
            this.processDataDomainDescription(result, dataRecord, dataDomain.getOriginal() as string[], 0);
        }

        return result;
    }

    /**
     * Help function which analyzes data and creates its metedata description.
     */
    protected createDataDomains(): IMapDataDomain[] {
        /*
         * Tests if an array contains an item
         */
        const contains = function(dataDomains: IMapDataDomain[], dataDomain: string) {
            return dataDomains.some(domain => domain.getName() == dataDomain);
        };

        /*
         * *Recursive* build of data domains
         *
         * TODO: optimize
         */
        const processDataDomain = function(dataDomains: IMapDataDomain[], dataDomainValues: string[], actValue: IMapDataRecordItem) {
            if(typeof actValue == "object") {
                // object
                if(Array.isArray(actValue)) {
                    // array - in the case that the data are not flattened
                    // deprecated
                    dataDomainValues.push("[]");
                    for(let i = 0; i < actValue.length; i++) {
                        processDataDomain(dataDomains, dataDomainValues, actValue[i]);
                    }
                } else {
                    // structure (key, value)
                    const actKeys: string[] = Object.keys(actValue as Record<string,IMapDataRecordItem>);
                    for(let j = 0; j < actKeys.length; j++) {
                        const dataDomainCopy = [...dataDomainValues];
                        dataDomainCopy.push(actKeys[j]);
                        processDataDomain(dataDomains, dataDomainCopy, (actValue as Record<string,IMapDataRecordItem>)[actKeys[j]]);
                    }
                }
            } else {
                // simple value
                const newMapDataDomainString: string = dataDomainValues.join().replace(/,/g, ".");
                if(!contains(dataDomains, newMapDataDomainString)) {
                    const newMapDataDomain = new FlattenedMapDataDomain(dataDomainValues);
                    dataDomains.push(newMapDataDomain);
                }
            }
        };

        // process data -> builing list of data domains (simplified scheme)
        const dataDomains: IMapDataDomain[] = [];
        let dataDomainValues: string[] = [];
        let actKeys;
        const data: IMapData = this.getDataRecords(); // get flattened data
        for (let i = 0; i < data.length; i++) {
            actKeys = Object.keys(data[i]);
            for(let j = 0; j < actKeys.length; j++) {
                dataDomainValues = [ actKeys[j] ];
                processDataDomain(dataDomains, dataDomainValues, data[i][actKeys[j]]);
            }
        }
        // console.log("data domains:", dataDomains);

        return dataDomains;
    }

    /**
     * Help function which converts data to the flat structure.
     */
    protected createDataRecords(data: unknown): IMapData { 

        /*
         * *Recursive* flattening of data
         *
         * TODO: optimize
         */
        const transformObject = function(actValue: unknown): IMapData | null {
            let result: IMapData | null = null;
            const clone = rfdc();
            if(actValue != null && typeof actValue == "object") {
                // object
                if(Array.isArray(actValue)) {
                    // array
                    let transformedChildren: IMapData = [];
                    let transformedChild: IMapData | null;
                    for(let i = 0; i < actValue.length; i++) {
                        transformedChild = transformObject(actValue[i]);
                        if(Array.isArray(transformedChild)) {
                            transformedChildren = transformedChildren.concat(transformedChild);
                        } else if (transformedChild != null) {
                            transformedChildren.push(transformedChild);
                        }
                    }
                    result = transformedChildren;
                } else {
                    // structure (key, value)
                    let transformedChild: IMapData | null;
                    if(actValue != null) {
                        const actObject: Record<string, unknown> = actValue as Record<string, unknown>;
                        const actKeys: string[] = Object.keys(actObject);
                        result = [{}];
                        for(let i = 0; i < actKeys.length; i++) {
                            transformedChild = transformObject(actObject[actKeys[i]]);
                            if(Array.isArray(transformedChild)) {
                                // wee need to duplicate actual results
                                const newResults: IMapData = [];
                                let copy: IMapDataRecord;
                                for(let j = 0; j < result.length; j++) {
                                    for(let k = 0; k < transformedChild.length; k++) {
                                        copy = clone(result[j]);
                                        copy[actKeys[i]] = transformedChild[k];
                                        newResults.push(copy);
                                    }
                                }
                                result = newResults;
                            } else if (transformedChild != null) {
                                for(let j = 0; j < result.length; j++) {
                                    result[j][actKeys[i]] = transformedChild;
                                }
                            }
                        }
                    }
                }

                // optimization
                if(result != null) {
                    if(result.length == 0) {
                        result = null;
                    } else if(result.length == 1) {
                        // TODO ?
                        result = result[0] as any;
                    }
                }
            } else {
                 result = actValue as IMapData;
            }
            return result;
        };
        
        const result: IMapData | null = transformObject(data);
        const dataRecords: IMapData = result != null ? result : [];
        // console.log("flattened data: ", dataRecords);

        return dataRecords;
    }

    /**
     * Static help function represents a step of recursive data processing searching data items.
     * 
     * @param result 
     * @param actRecord 
     * @param dataDomain 
     * @param i 
     */
    protected processDataDomainDescription(result: unknown[], actRecord: IMapDataRecordItem, domainDescription: string[], i: number): void {

        if(actRecord != undefined && actRecord != null) {
            if(i == domainDescription.length) {
                // reached the value
                if(typeof actRecord == "string") {
                    result.push(actRecord);
                } else if(typeof actRecord != "object") {
                    result.push(actRecord);
                }
            } else {
                // act value needs to be type of object
                if(typeof actRecord == "object") {
                    const dataDomainPart = domainDescription[i];
                    // deprecated
                    if(dataDomainPart == "[]") {
                        // act value needs to be type of array
                        if(Array.isArray(actRecord)) {
                            for(let j = 0; j < actRecord.length; j++) {
                                this.processDataDomainDescription(result, actRecord[j], domainDescription, i+1);
                            }
                        }
                    } else {
                        // act value is structure
                        if(actRecord[dataDomainPart] != null) {
                            this.processDataDomainDescription(result, actRecord[dataDomainPart], domainDescription, i+1);
                        }
                    }
                }
            }
        }
    }
}
export default JsonMapDataManager;
