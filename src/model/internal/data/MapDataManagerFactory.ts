import IMapDataManager from "../../types/data/IMapDataManager";
import JsonMapDataManager from "./json/JsonMapDataManager";

/**
 * This class provides a factory for map data managers.
 * 
 * @author Jiri Hynek
 */
class MapAggregationFunctionFactory {
    
    /**
     * It creates the JSON map data mananger.
     */
    public json(data: unknown): IMapDataManager {
        return new JsonMapDataManager(data);
    }
}
export default MapAggregationFunctionFactory;