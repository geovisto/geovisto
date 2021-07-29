/**
 * This interface declares functions aggregation of values.
 * 
 * @author Jiri Hynek
 */
interface IMapAggregationBucket {

    /**
     * It adds a new value to the aggregation bucket.
     * 
     * @param value 
     */
    addValue(value: number): void;

    /**
     * It returns the current aggregated value.
     */
    getValue(): number;
}
export default IMapAggregationBucket;