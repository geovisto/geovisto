import IGeoDataManager from "../geodata/IGeoDataManager";
import IMapConfig from "./IMapConfig";
import IMapConfigManager from "../config/IMapConfigManager";
import IMapData from "../data/IMapData";
import IMapDataManager from "../data/IMapDataManager";
import IMapDefaults from "./IMapDefaults";
import IMapEventManager from "../event/IMapEventManager";
import IMapObjectState from "../object/IMapObjectState";
import { IMapProps, IMapInitProps } from "./IMapProps";
import IMapToolAPI from "../api/IMapToolAPI";
import IMapToolsManager from "../tool/IMapToolsManager";

/**
 * This interface declares the state of the map.
 * It wraps the state since the map can work with state objects which needs to be explicitly serialized.
 * 
 * @author Jiri Hynek
 */
interface IMapState<
    TProps extends IMapProps = IMapProps,
    TDefaults extends IMapDefaults = IMapDefaults,
    TConfig extends IMapConfig = IMapConfig
> extends IMapObjectState<TProps, TDefaults, TConfig> {

    /**
     * It resets the state to the initial state.
     * 
     * @param defaults 
     * @param props 
     * @param initProps 
     */
    initialize(defaults: TDefaults, props: TProps, initProps: IMapInitProps<TConfig>): void;

    /**
     * It returns the Leaflet map.
     */
    getLeafletMap(): L.Map | undefined;

    /**
     * It sets the Leaflet map.
     * 
     * @param map 
     */
    setLeafletMap(map: L.Map): void;

    /**
     * It returns the map event manager.
     */
    getEventManager(): IMapEventManager;

    /**
     * It returns the map event manager.
     * 
     * @param map 
     */
    setEventManager(eventManager: IMapEventManager): void;

    /**
     * It returns the map tools API.
     */
    getToolsAPI(): Record<string, () => IMapToolAPI>;

    /**
     * It returns the tool manager providing tool templates.
     */
    getToolTemplates(): IMapToolsManager;

    /**
     * It sets the tool templates providing tool templates.
     * 
     * @param toolTemplates 
     */
    setToolTemplates(toolTemplates: IMapToolsManager): void;

    /**
     * It returns tools manager providing tools.
     */
    getTools(): IMapToolsManager;

    /**
     * It sets tools manager providing tools.
     * 
     * @param tools 
     */
    setTools(tools: IMapToolsManager): void;

    /**
     * It returns the map data manager.
     */
    getMapData(): IMapDataManager;

    /**
     * It sets the map data manager.
     * note: It also updates the current data.
     * 
     * @param mapData 
     */
    setMapData(mapData: IMapDataManager): void;

    /**
     * It returns current data (might be filtered).
     */
    getCurrentData(): IMapData;

    /**
     * It sets current data.
     * 
     * @param data
     */
    setCurrentData(data: IMapData): void;

    /**
     * It returns the map config manager.
     */
    getMapConfig(): IMapConfigManager;

    /**
     * It sets a map config manager.
     * 
     * @param mapConfigManager 
     */
    setMapConfig(mapConfigManager: IMapConfigManager): void;

    /**
     * It returns the geo data manager.
     */
    getGeoDataManager(): IGeoDataManager;

    /**
     * It sets a geo data manager.
     * 
     * @param geoDataManager
     */
    setGeoDataManager(geoDataManager: IGeoDataManager): void;

    /**
     * It returns the initial zoom level.
     */
    getInitialZoom(): number;

    /**
     * It sets initial zoom level.
     * 
     * @param zoom
     */
    setInitialZoom(zoom: number): void;

    /**
     * It returns the initial map center.
     * 
     * TODO: remove from state (use defaults only)
     */
    getInitialMapCenter(): { lat: number, lng: number };

    /**
     * It sets initial map center.
     * 
     * TODO: remove from state (use defaults only)
     * 
     * @param mapCenter
     */
    setInitialMapCenter(mapCenter: { lat: number, lng: number }): void;

    /**
     * It returns the initial structure.
     * 
     * TODO: remove from state (use defaults only)
     */
    getInitialMapStructure(): { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] };

    /**
     * It sets initial map structure.
     * 
     * TODO: remove from state (use defaults only)
     * 
     * @param mapStructure
     */
    setInitialMapStructure(mapStructure: { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] }): void;
}
export default IMapState;