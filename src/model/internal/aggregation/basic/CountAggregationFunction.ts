import IMapAggregationBucket from "../../../types/aggregation/IMapAggregationBucket";
import IMapAggregationFunction from "../../../types/aggregation/IMapAggregationFunction";
import MapDomain from "../../domain/generic/MapDomain";

/**
 * This class provides the sum aggregation function.
 * 
 * @author Jiri Hynek
 */
class CountAggregationFunction extends MapDomain implements IMapAggregationFunction {

    /**
     * It initializes the function.
     */
    public constructor() {
        super(CountAggregationFunction.TYPE());
    }

    /**
     * Type of the function.
     */
    public static TYPE(): string {
        return "count";
    }
    
    /**
     * It returns a aggregation bucket for aggregation of multiple values.
     */
    public getAggregationBucket(): IMapAggregationBucket {
        return new class implements IMapAggregationBucket {
            
            private count: number;

            public constructor() {
                this.count = 0;
            }
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            public addValue(value: number): void {
                this.count++;
            }
            
            public getValue(): number {
                return this.count;
            }
        }();
    }
}
export default CountAggregationFunction;