import IMapConfig from "../../../types/map/IMapConfig";
import IMapToolConfig from "../../../types/tool/IMapToolConfig";

/**
 * The class wraps config used by the map and functions to acquire config items.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractMapConfigManager {
    
    private originalConfig: Record<string, unknown>;
    private config: IMapConfig;

    /**
     * It initializes the config wrapper providing a basic API.
     * It expects a config represented by the implicict Geovisto map structure.
     * 
     * @param config 
     */
    public constructor(config: Record<string, unknown>) {
        this.originalConfig = config;
        this.config = this.import(config);
    }

    /**
     * It converts given config to the internal map config structure.
     * 
     * @param mapConfing 
     */
    protected abstract import(config: Record<string, unknown>): IMapConfig;

    /**
     * It converts map config to the original structure.
     * 
     * @param mapConfing 
     */
    public abstract export(mapConfig: IMapConfig): Record<string, unknown>;

    /**
     * It returns the original config.
     */
    public getOriginalConfig(): Record<string, unknown> {
        return this.originalConfig;
    }

    /**
     * It returns the map config
     */
    public getMapConfig(): IMapConfig {
        return this.config;
    }

    /**
     * It returns the list of all config records for the tools.
     */
    public getToolsConfigs(): IMapToolConfig[] | undefined {
        return this.config.tools;
    }

    /**
     * It returns the config record for the tool identified by the given tool identifier.
     * 
     * @param toolId 
     */
    public getToolConfig(toolId: string): IMapToolConfig | undefined {
        const tools: IMapToolConfig[] | undefined = this.config.tools;
        let toolConfig: IMapToolConfig | undefined = undefined;
        if(tools != undefined && Array.isArray(tools)) {
            toolConfig = tools.find(x => x.id == toolId);
        }
        return toolConfig;
    }
}
export default AbstractMapConfigManager;