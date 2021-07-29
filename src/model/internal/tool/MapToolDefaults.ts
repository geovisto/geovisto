import IGeoData from "../../types/geodata/IGeoData";
import IGeoDataManager from "../../types/geodata/IGeoDataManager";
import IMapDataManager from "../../types/data/IMapDataManager";
import IMapToolConfig from "../../types/tool/IMapToolConfig";
import IMapToolDefaults from "../../types/tool/IMapToolDefaults";
import GeoDataManager from "../geodata/GeoDataManager";
import MapDataManagerFactory from "../data/MapDataManagerFactory";
import MapObjectDefaults from "../object/MapObjectDefaults";

/**
 * This class provide functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
class MapToolDefaults extends MapObjectDefaults implements IMapToolDefaults {

    /**
     * It returns default map data manager.
     */
    public getDataManager(): IMapDataManager {
        return (new MapDataManagerFactory).json([]);
    }

    /**
     * It returns default geo data manager.
     */
     public getGeoDataManager(geoDataArray: IGeoData[] | undefined): IGeoDataManager {
        return new GeoDataManager(geoDataArray ?? []);
    }

    /**
     * By defaults it returns the config with undefined props.
     */
    public getConfig(): IMapToolConfig {
        const config = <IMapToolConfig> super.getConfig();
        config.enabled = undefined;
        return config;
    }

    /**
     * By default, the tool is singleton
     */
    public isSingleton(): boolean {
       return false; 
    }

    /**
     * By default, the tool is enabled.
     */
    public isEnabled(): boolean {
        return true;
    }

    /**
     * It returns the label of the tool.
     */
     public getLabel(): string {
        return "Tool";
    }

    /**
     * It returns the icon of the tool.
     */
    public getIcon(): string {
        return '<i class="fa fa-file"></i>';
    }
}
export default MapToolDefaults;