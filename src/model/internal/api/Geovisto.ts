import BooleanTypeManager from '../type/BooleanTypeManager';
import IGeoData from '../../types/geodata/IGeoData';
import IMapAPI from '../../types/api/IMapAPI';
import IMapDomain from '../../types/domain/IMapDomain';
import IMapDomainManager from '../../types/domain/IMapDomainManager';
import IMapObject from '../../types/object/IMapObject';
import IntegerRangeManager from '../type/IntegerRangeManager';
import IntegerTypeManager from '../type/IntegerTypeManager';
import ITypeManager from '../../types/type/ITypeManager';
import { IMapProps } from '../../types/map/IMapProps';
import IMapTool from '../../types/tool/IMapTool';
import GeoDataFactory from '../geodata/GeoDataFactory';
import GeoDataManager from '../geodata/GeoDataManager';
import GeovistoMap from '../map/GeovistoMap';
import GeovistoMapDefaults from '../map/GeovistoMapDefaults';
import MapAggregationFunctionFactory from '../aggregation/MapAggregationFunctionFactory';
import MapConfigManagerFactory from '../config/MapConfigManagerFactory';
import MapDataManagerFactory from '../data/MapDataManagerFactory';
import MapDomainDimension from '../dimension/MapDomainDimension';
import MapDomainManagerFactory from '../domain/MapDomainManagerFactory';
import MapDynamicDomainDimension from '../dimension/MapDynamicDomainDimension';
import MapEventFactory from '../event/MapEventFactory';
import MapObjectsManager from '../object/MapObjectsManager';
import MapToolsManager from '../tool/MapToolsManager';
import MapTypeDimension from '../dimension/MapTypeDimension';
import StringTypeManager from '../type/StringTypeManager';

export const Geovisto: IMapAPI = {
    getType: () => GeovistoMapDefaults.TYPE,
    createMap: (props: IMapProps) => new GeovistoMap(props),
    getMapAggregationFunctionFactory: () => new MapAggregationFunctionFactory(),
    getMapConfigManagerFactory: () => new MapConfigManagerFactory(),
    getMapDataManagerFactory: () => new MapDataManagerFactory(),
    getMapDomainManagerFactory: () => new MapDomainManagerFactory(),
    getMapEventFactory: () => new MapEventFactory(),
    getGeoDataManager: (geoDataArray: IGeoData[]) => new GeoDataManager(geoDataArray),
    getGeoDataFactory: () => new GeoDataFactory(),
    getBooleanTypeManager: () => new BooleanTypeManager,
    getIntegerRangeManager: (min: number, max: number) => new IntegerRangeManager(min, max),
    getIntegerTypeManager: () => new IntegerTypeManager(),
    getStringTypeManager: () => new StringTypeManager(),
    createMapDomainDimension: <T extends IMapDomain>(name: string, domainManager: IMapDomainManager<T>, dataDomain: T | undefined) => new MapDomainDimension<T>(name, domainManager, dataDomain),
    createMapDynamicDomainDimension: <T extends IMapDomain>(name: string, domainManagerLoader: () => IMapDomainManager<T>, domainName: string) => new MapDynamicDomainDimension<T>(name, domainManagerLoader, domainName),
    createMapTypeDimension: <T, C extends ITypeManager<T> = ITypeManager<T>>(name: string, typeManager: C, value: T | undefined) => new MapTypeDimension<T, C>(name, typeManager, value),
    createMapObjectsManager: <T extends IMapObject>(objects: T[] | undefined) => new MapObjectsManager<T>(objects),
    createMapToolsManager: (tools: IMapTool[]) => new MapToolsManager(tools),
};