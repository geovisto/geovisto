import IIntegerRangeManager from "../../types/type/IIntegerRangeManager";
import IntegerTypeManager from "./IntegerTypeManager";

/**
 * This class specifies the integer type manager.
 * 
 * @author Jiri Hynek
 */
class IntegerRangeManager extends IntegerTypeManager implements IIntegerRangeManager {
    
    private min: number;
    private max: number;

    public constructor(min: number, max: number) {
        super();
        this.min = min;
        this.max = max;
    }

    /**
     * It returns the min value.
     */
    public getMinValue(): number {
        return this.min;
    }

    /**
     * It returns the max value.
     */
    public getMaxValue(): number {
        return this.max;
    }
}
export default IntegerRangeManager;