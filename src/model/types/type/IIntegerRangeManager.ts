import ITypeManager from "./ITypeManager";

/**
 * This interface declares functions for the integer range constraint.
 * 
 * @author Jiri Hynek
 */
 interface IIntegerRangeManager extends ITypeManager<number> {

    /**
     * It returns the min value.
     */
    getMinValue(): number;

    /**
     * It returns the max value.
     */
    getMaxValue(): number;
}
export default IIntegerRangeManager;