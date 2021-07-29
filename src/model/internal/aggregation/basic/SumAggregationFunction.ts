import IMapAggregationBucket from "../../../types/aggregation/IMapAggregationBucket";
import IMapAggregationFunction from "../../../types/aggregation/IMapAggregationFunction";
import MapDomain from "../../domain/generic/MapDomain";

/**
 * This class provides the sum aggregation function.
 * 
 * @author Jiri Hynek
 */
class SumAggregationFunction extends MapDomain implements IMapAggregationFunction {

    /**
     * It initializes the function.
     */
    public constructor() {
        super(SumAggregationFunction.TYPE());
    }

    /**
     * Type of the function.
     */
    public static TYPE(): string {
        return "sum";
    }
    
    /**
     * It returns a aggregation bucket for aggregation of multiple values.
     */
    public getAggregationBucket(): IMapAggregationBucket {
        return new class implements IMapAggregationBucket {
            
            private sum: number;

            public constructor() {
                this.sum = 0;
            }
            
            public addValue(value: number): void {
                this.sum += value;
            }
            
            public getValue(): number {
                return this.sum;
            }
        }();
    }
}
export default SumAggregationFunction;