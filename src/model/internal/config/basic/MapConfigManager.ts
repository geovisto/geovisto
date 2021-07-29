import IMapConfig from "../../../types/map/IMapConfig";
import IMapConfigManager from "../../../types/config/IMapConfigManager";
import AbstractMapConfigManager from "../abstract/AbstractMapConfigManager";

/**
 * The class wraps config used by the map and functions to acquire config items.
 * 
 * @author Jiri Hynek
 */
class MapConfigManager extends AbstractMapConfigManager implements IMapConfigManager {

    /**
     * It initializes the config wrapper providing a basic API.
     * It expects a config represented by the implicict Geovisto map structure.
     * 
     * @param config 
     */
    public constructor(config: Record<string, unknown>) {
        super(config);
    }

    /**
     * It converts given config to the internal map config structure.
     * It keeps the config structure.
     * 
     * @param mapConfing 
     */
    protected import(config: Record<string, unknown>): IMapConfig {
        // we expect the external config in the config model
        // TODO: provide validation
        return config as unknown as IMapConfig;
    }

    /**
     * It returns map config of the implicit structure.
     * 
     * @param mapConfing 
     */
    public export(mapConfig: IMapConfig): Record<string, unknown> {
        return mapConfig;
    }
}
export default MapConfigManager;