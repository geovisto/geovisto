import IMapConfigManager from "./IMapConfigManager";

/**
 * This interface declares a factory for config managers.
 * 
 * @author Jiri Hynek
 */
interface IMapConfigManagerFactory {
    
    /**
     * It creates the default config manager function.
     */
    default(config: Record<string, unknown>): IMapConfigManager;
}
export default IMapConfigManagerFactory;