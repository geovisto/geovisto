import IGeoDataManager from "../../types/geodata/IGeoDataManager";
import IMap from "../../types/map/IMap";
import IMapConfig from "../../types/map/IMapConfig";
import IMapConfigManager from "../../types/config/IMapConfigManager";
import IMapData from "../../types/data/IMapData";
import IMapDataManager from "../../types/data/IMapDataManager";
import IMapDefaults from "../../types/map/IMapDefaults";
import IMapEventManager from "../../types/event/IMapEventManager";
import IMapGlobals from "../../types/map/IMapGlobals";
import { IMapProps, IMapInitProps } from "../../types/map/IMapProps";
import IMapToolsManager from "../../types/tool/IMapToolsManager";
import IMapTool from "../../types/tool/IMapTool";
import IMapToolAPI from "../../types/api/IMapToolAPI";
import IMapToolConfig from "../../types/tool/IMapToolConfig";
import IMapTemplates from "../../types/map/IMapTemplates";
import IMapState from "../../types/map/IMapState";
import MapObjectState from "../object/MapObjectState";

/**
 * This class manages state of the map.
 * It wraps the state since the map can work with state objects which needs to be explicitly serialized.
 * 
 * @author Jiri Hynek
 */
class GeovistoMapState extends MapObjectState implements IMapState {
    
    private eventManager: IMapEventManager;
    private leafletMap?: L.Map;
    private tools!: IMapToolsManager;
    private toolTemplates!: IMapToolsManager;
    private mapData!: IMapDataManager;
    private data!: IMapData;
    private mapConfig!: IMapConfigManager;
    private geoDataManager!: IGeoDataManager;
    private zoom!: number;
    private mapCenter!: { lat: number; lng: number; };
    private mapStructure!: { maxZoom: number; maxBounds: [[number, number], [number, number]]; };
    private toolsAPI: Record<string, () => IMapToolAPI>

    /**
     * It initializes a map state.
     * 
     * @param map 
     */
    public constructor(map: IMap) {
        super(map);

        this.eventManager = map.getDefaults().getEventManager();
        this.toolsAPI = {};
    }

    /**
     * It resets the state to the initial props.
     * 
     * @param defaults 
     * @param props 
     * @param initProps 
     */
    public initialize(defaults: IMapDefaults, props: IMapProps, initProps: IMapInitProps): void {

        // templates
        const templates: IMapTemplates = props.templates == undefined ? defaults.getTemplates() : props.templates;
        this.setToolTemplates(templates.tools == undefined ? defaults.getToolTemplates() : templates.tools);

        // tools
        this.setTools(props.tools == undefined ? defaults.getTools() : props.tools);

        // data
        this.setMapData(props.data == undefined ? defaults.getMapData() : props.data);

        // geo data
        this.setGeoDataManager(props.geoData == undefined ? defaults.getGeoDataManager() : props.geoData);

        // globals (state variables which are common for all geovisto tools) - can be undefined and set by initialize function
        const globals: IMapGlobals = props.globals == undefined ? defaults.getGlobals() : props.globals;
        this.setInitialZoom(globals.zoom == undefined ? defaults.getZoom() : globals.zoom);
        this.setInitialMapCenter(globals.mapCenter == undefined ? defaults.getMapCenter() : globals.mapCenter);
        this.setInitialMapStructure(globals.mapStructure == undefined ? defaults.getMapStructure() : globals.mapStructure);

        // set map config manager
        this.setMapConfig(initProps.configManager);

        // set super props
        super.initialize(defaults, props, initProps);
    }

    /**
     * It takes config and deserializes the values.
     * 
     * @param config
     */
    public deserialize(config: IMapConfig): void {
        super.deserialize(config);

        if(config.zoom != undefined) this.setInitialZoom(config.zoom);
        if(config.mapCenter != undefined) this.setInitialMapCenter(config.mapCenter);
        if(config.mapStructure != undefined) this.setInitialMapStructure(config.mapStructure);
    }

    /**
     * It serializes the map state. Optionally, a serialized value can be let undefined if it equals the default value.
     * 
     * @param defaults 
     */
    public serialize(defaults: IMapDefaults | undefined): IMapConfig {
        const leafletMap: L.Map | undefined = this.getLeafletMap();

        // initialize config
        // do not serialize the id and type for map
        //let config = super.serialize(defaults);
        const config: IMapConfig = {
            id: undefined,
            type: undefined,
            zoom: defaults && leafletMap?.getZoom() == defaults.getZoom() ? undefined : leafletMap?.getZoom(),
            mapCenter: defaults && leafletMap?.getCenter() == defaults.getMapCenter() ? undefined : leafletMap?.getCenter(),
            mapStructure: undefined, // TODO map structure
            tools: undefined // see the code below
        };

        // serialize tools
        const tools: IMapTool[] = this.getTools().getAll();
        const toolsConfigs: IMapToolConfig[] = [];
        for (let i = 0; i < tools.length; i++) {
            toolsConfigs.push(tools[i].getState().serialize(defaults ? tools[i].getDefaults() : undefined));
        }
        config.tools = toolsConfigs;

        return config;
    }

    /**
     * It returns the map event manager.
     */
    public getEventManager(): IMapEventManager {
        return this.eventManager;
    }

    /**
     * It returns the map event manager.
     * 
     * @param eventManager 
     */
    public setEventManager(eventManager: IMapEventManager): void {
        this.eventManager = eventManager;
    }

    /**
     * It returns the map tools API.
     */
    public getToolsAPI(): Record<string, () => IMapToolAPI> {
        return this.toolsAPI;
    }

    /**
     * It returns the Leaflet map.
     */
    public getLeafletMap(): L.Map | undefined {
        return this.leafletMap;
    }

    /**
     * It returns the Leaflet map.
     * 
     * @param map 
     */
    public setLeafletMap(map: L.Map): void {
        this.leafletMap = map;
    }

    /**
     * It returns the tool manager providing tool templates.
     */
    public getToolTemplates(): IMapToolsManager {
        return this.toolTemplates;
    }

    /**
     * It sets tool templates providing tool templates.
     * 
     * @param toolTemplates 
     */
    public setToolTemplates(toolTemplates: IMapToolsManager): void {
        this.toolTemplates = toolTemplates;
    }

    /**
     * It returns tools manager providing tools.
     */
    public getTools(): IMapToolsManager {
        return this.tools;
    }

    /**
     * It sets tools manager providing tools.
     * 
     * @param tools 
     */
    public setTools(tools: IMapToolsManager): void {
        // we use copies of predefined tools due to later multiple imports of configs
        this.tools = tools.copy();
    }

    /**
     * It returns the map data manager.
     */
    public getMapData(): IMapDataManager {
        return this.mapData;
    }

    /**
     * It sets the map data manager.
     * note: It also updates the current data.
     * 
     * @param mapData 
     */
    public setMapData(mapData: IMapDataManager): void {
        this.mapData = mapData;
        this.setCurrentData(mapData.getDataRecords());
    }

    /**
     * It returns current data (might be filtered).
     */
    public getCurrentData(): IMapData {
        return this.data;
    }

    /**
     * It sets current data.
     * 
     * @param data
     */
    public setCurrentData(data: IMapData): void {
        this.data = data;
    }

    /**
     * It returns the map config manager.
     */
    public getMapConfig(): IMapConfigManager {
        return this.mapConfig;
    }

    /**
     * It sets the map config manager.
     * 
     * @param mapData 
     */
    public setMapConfig(mapConfig: IMapConfigManager): void {
        this.mapConfig = mapConfig;
    }

    /**
     * It returns the geo data manager.
     */
    public getGeoDataManager(): IGeoDataManager {
        return this.geoDataManager;
    }

    /**
     * It sets a geo data manager.
     * 
     * @param geoDataManager
     */
    public setGeoDataManager(geoDataManager: IGeoDataManager): void {
        this.geoDataManager = geoDataManager;
    }

    /**
     * It returns the initial zoom level.
     */
    public getInitialZoom(): number {
        return this.zoom;
    }

    /**
     * It sets initial zoom level.
     * 
     * @param zoom
     */
    public setInitialZoom(zoom: number): void {
        this.zoom = zoom;
    }

    /**
     * It returns the initial map center.
     * 
     * TODO: remove from state (use defaults only)
     */
    public getInitialMapCenter(): { lat: number, lng: number } {
        return this.mapCenter;
    }

    /**
     * It sets initial map center.
     * 
     * TODO: remove from state (use defaults only)
     * 
     * @param mapCenter
     */
    public setInitialMapCenter(mapCenter: { lat: number, lng: number }): void {
        this.mapCenter = mapCenter;
    }

    /**
     * It returns the initial structure.
     * 
     * TODO: remove from state (use defaults only)
     */
    public getInitialMapStructure(): { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] } {
        return this.mapStructure;
    }

    /**
     * It sets initial map structure.
     * 
     * TODO: remove from state (use defaults only)
     * 
     * @param mapStructure
     */
    public setInitialMapStructure(mapStructure: { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] }): void {
        this.mapStructure = mapStructure;
    }
}
export default GeovistoMapState;