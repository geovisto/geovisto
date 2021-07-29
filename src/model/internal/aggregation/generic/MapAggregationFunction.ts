import IMapAggregationBucket from "../../../types/aggregation/IMapAggregationBucket";
import IMapAggregationFunction from "../../../types/aggregation/IMapAggregationFunction";
import MapDomain from "../../domain/generic/MapDomain";

/**
 * This class provides a generic aggregation function.
 * 
 * @author Jiri Hynek
 */
class MapAggregationFunction extends MapDomain implements IMapAggregationFunction {

    private aggregationBucket: () => IMapAggregationBucket;

    /**
     * It initializes the function.
     */
    public constructor(type: string, aggregationBucket: () => IMapAggregationBucket) {
        super(type);

        this.aggregationBucket = aggregationBucket;
    }
    
    /**
     * It returns a aggregation bucket for aggregation of multiple values.
     */
    public getAggregationBucket(): IMapAggregationBucket {
        return this.aggregationBucket();
    }
}
export default MapAggregationFunction;