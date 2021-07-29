import ITypeManager from "../../types/type/ITypeManager";

/**
 * This class specifies the integer type manager.
 * 
 * @author Jiri Hynek
 */
class IntegerTypeManager implements ITypeManager<number> {

    /**
     * It converts the string representation of the number value.
     */
    public deserialize(value: string): number {
        return Number.parseInt(value);
    }
}
export default IntegerTypeManager;