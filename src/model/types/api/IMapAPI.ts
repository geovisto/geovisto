import IGeoData from "../geodata/IGeoData";
import IGeoDataFactory from "../geodata/IGeoDataFactory";
import IGeoDataManager from "../geodata/IGeoDataManager";
import IIntegerRangeManager from "../type/IIntegerRangeManager";
import IMap from "../map/IMap";
import IMapAggregationFunctionFactory from "../aggregation/IMapAggregationFunctionFactory";
import IMapConfigManagerFactory from "../config/IMapConfigManagerFactory";
import IMapDataManagerFactory from "../data/IMapDataManagerFactory";
import IMapDomainDimension from "../dimension/IMapDomainDimension";
import IMapDomain from "../domain/IMapDomain";
import IMapDomainManager from "../domain/IMapDomainManager";
import IMapDomainManagerFactory from "../domain/IMapDomainManagerFactory";
import IMapDynamicDomainDimension from "../dimension/IMapDynamicDomainDimension";
import IMapEventFactory from "../event/IMapEventFactory";
import IMapObject from "../object/IMapObject";
import IMapObjectsManager from "../object/IMapObjectsManager";
import { IMapProps } from "../map/IMapProps";
import IMapTool from "../tool/IMapTool";
import IMapToolsManager from "../tool/IMapToolsManager";
import IMapTypeDimension from "../dimension/IMapTypeDimension";
import ITypeManager from "../type/ITypeManager";

/**
 * API for the map.
 * 
 * @author Jiri Hynek
 */
type IMapAPI = {
    getType: () => string,
    createMap: (props: IMapProps) => IMap,
    getMapAggregationFunctionFactory: () => IMapAggregationFunctionFactory,
    getMapConfigManagerFactory: () => IMapConfigManagerFactory,
    getMapDataManagerFactory: () => IMapDataManagerFactory,
    getMapDomainManagerFactory: () => IMapDomainManagerFactory,
    getMapEventFactory: () => IMapEventFactory,
    getGeoDataManager: (geoDataArray: IGeoData[]) => IGeoDataManager,
    getGeoDataFactory: () => IGeoDataFactory,
    getBooleanTypeManager: () => ITypeManager<boolean>,
    getIntegerRangeManager: (min: number, max: number) => IIntegerRangeManager,
    getIntegerTypeManager: () => ITypeManager<number>,
    getStringTypeManager: () => ITypeManager<string>,
    createMapDomainDimension: <T extends IMapDomain>(name: string, domainManager: IMapDomainManager<T>, dataDomain: T | undefined) => IMapDomainDimension<T>,
    createMapDynamicDomainDimension: <T extends IMapDomain>(name: string, domainManagerLoader: () => IMapDomainManager<T>, domainName: string) => IMapDynamicDomainDimension<T>,
    createMapTypeDimension: <T, C extends ITypeManager<T> = ITypeManager<T>>(name: string, typeManager: C, value: T | undefined) => IMapTypeDimension<T, C>,
    createMapObjectsManager: <T extends IMapObject>(objects: T[] | undefined) => IMapObjectsManager<T>
    createMapToolsManager: <T extends IMapTool>(tools: T[]) => IMapToolsManager
}
export default IMapAPI;