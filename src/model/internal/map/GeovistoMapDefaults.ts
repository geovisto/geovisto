import IGeoDataManager from "../../types/geodata/IGeoDataManager";
import IMapDataManager from "../../types/data/IMapDataManager";
import IMapDefaults from "../../types/map/IMapDefaults";
import IMapEventManager from "../../types/event/IMapEventManager";
import IMapConfig from "../../types/map/IMapConfig";
import IMapConfigManager from "../../types/config/IMapConfigManager";
import IMapTemplates from "../../types/map/IMapTemplates";
import IMapToolsManager from "../../types/tool/IMapToolsManager";
import IMapGlobals from "../../types/map/IMapGlobals";
import GeoDataManager from "../geodata/GeoDataManager";
import JsonMapDataManager from "../data/json/JsonMapDataManager";
import MapConfigManager from "../config/basic/MapConfigManager";
import MapEventManager from "../event/MapEventManager";
import MapObjectDefaults from "../object/MapObjectDefaults";
import MapToolsManager from "../tool/MapToolsManager";

/**
 * This class provide functions which return the default state values.
 *
 * @author Jiri Hynek
 */
class GeovistoMapDefaults extends MapObjectDefaults implements IMapDefaults {

    /**
     * It returns default map config manager.
     */
    public getConfigManager(): IMapConfigManager {
        return new MapConfigManager({});
    }

    /**
     * It returns default map config.
     * 
     * All config variables are undefined since they might override the props.
     */
    public getConfig(): IMapConfig {
        return {
            id: undefined,
            type: undefined,
            tools: undefined,
            zoom: undefined,
            mapCenter: undefined,
            mapStructure: undefined
        };
    }

    public static TYPE = "geovisto-map";

    /**
     * It returns a unique type string of the object.
     */
    public getType(): string {
        return GeovistoMapDefaults.TYPE;
    }

    /**
     * It returns a default map event manager.
     * 
     * @returns event manager
     */
    public getEventManager(): IMapEventManager {
        return new MapEventManager();
    }

    /**
     * It returns a default managers providing templates.
     */
    public getTemplates(): IMapTemplates {
        return {
            tools: this.getToolTemplates(),
        };
    }

    /**
     * It returns a default tools manager containing used tools.
     */
    public getToolTemplates(): MapToolsManager {
        return new MapToolsManager([]);
    }

    /**
     * It returns a default tools manager containing used tools.
     */
    public getTools(): IMapToolsManager {
        return new MapToolsManager([]);
    }

    /**
     * It returns a default map data manager.
     */
    public getMapData(): IMapDataManager {
        return new JsonMapDataManager([]);
    }

    /**
     * It returns a default geo data manager.
     */
    public getGeoDataManager(): IGeoDataManager {
        return new GeoDataManager([
            // TODO: provide simple default GeoJSON
        ]);
    }

    /**
     * It returns a default global state variables.
     */
    public getGlobals(): IMapGlobals {
        return {
            zoom: this.getZoom(),
            mapCenter: this.getMapCenter(),
            mapStructure: this.getMapStructure(),
        };
    }

    /**
     * It returns a default zoom level.
     */
    public getZoom(): number {
        return 2;
    }

    /**
     * It returns a default center coordinates in Leaflet map.
     */
    public getMapCenter(): { lat: number, lng: number } {
        return {
            lat: 50,
            lng: -0.1
        };
    }

    /**
     * It returns a default map structure defined with respect to the leaflet library.
     */
    public getMapStructure(): { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] } {
        return {
            maxZoom: 20,
            maxBounds: [[-100,-400],[2000,400]]
        };
    }
}
export default GeovistoMapDefaults;
