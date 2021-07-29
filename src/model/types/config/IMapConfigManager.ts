import IMapConfig from "../map/IMapConfig";
import IMapToolConfig from "../tool/IMapToolConfig";

/**
 * The interface declares config used by the map and functions to acquire config items.
 * 
 * @author Jiri Hynek
 */
interface IMapConfigManager {

    /**
     * It returns the original config.
     */
    getOriginalConfig(): Record<string, unknown>;

    /**
     * It returns the map config.
     */
    getMapConfig(): IMapConfig;

    /**
     * It returns the list of all config records for the tools.
     */
    getToolsConfigs(): IMapToolConfig[] | undefined;

    /**
     * It returns the config record for the tool identified by the given tool identifier.
     * 
     * @param toolId 
     */
    getToolConfig(toolId: string): IMapToolConfig | undefined;

    /**
     * It provides possibility to transform given config to the original structure.
     * 
     * @param mapConfing 
     */
    export(mapConfing: IMapConfig): Record<string, unknown>;
}
export default IMapConfigManager;