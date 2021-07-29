import IMapAggregationBucket from "./IMapAggregationBucket";
import IMapDomain from "../domain/IMapDomain";

/**
 * This interface declares functions for using map aggregation function.
 * 
 * @author Jiri Hynek
 */
interface IMapAggregationFunction extends IMapDomain {

    /**
     * It returns a aggregation bucket for aggregation of multiple values.
     */
    getAggregationBucket(): IMapAggregationBucket;
}
export default IMapAggregationFunction;