import IMapDataManager from "./IMapDataManager";

/**
 * This interface declares a factory for map data managers.
 * 
 * @author Jiri Hynek
 */
interface IMapAggregationFunctionFactory {
    
    /**
     * It creates the JSON map data mananger.
     */
    json(data: unknown): IMapDataManager;
}
export default IMapAggregationFunctionFactory;