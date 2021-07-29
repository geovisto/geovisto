import IMapAggregationBucket from "./IMapAggregationBucket";
import IMapAggregationFunction from "./IMapAggregationFunction";

/**
 * This interface declares a factory for aggregation functions.
 * 
 * @author Jiri Hynek
 */
interface IMapAggregationFunctionFactory {
    
    /**
     * It creates a generic aggregation function.
     */
    default(type: string, aggregationBucket: () => IMapAggregationBucket): IMapAggregationFunction;
    
    /**
     * It creates the count aggregation function.
     */
    count(): IMapAggregationFunction;
    
    /**
     * It creates the sum aggregation function.
     */
    sum(): IMapAggregationFunction;
}
export default IMapAggregationFunctionFactory;