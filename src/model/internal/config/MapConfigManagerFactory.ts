import IMapConfigManager from "../../types/config/IMapConfigManager";
import IMapConfigManagerFactory from "../../types/config/IMapConfigManagerFactory";
import MapConfigManager from "./basic/MapConfigManager";

/**
 * This class provides a factory for config managers.
 * 
 * @author Jiri Hynek
 */
class MapConfigManagerFactory implements IMapConfigManagerFactory {
    
    /**
     * It creates the default config manager function.
     */
    public default(config: Record<string, unknown>): IMapConfigManager {
        return new MapConfigManager(config);
    }
}
export default MapConfigManagerFactory;