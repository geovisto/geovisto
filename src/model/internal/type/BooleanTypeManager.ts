import ITypeManager from "../../types/type/ITypeManager";

/**
 * This class specifies the empty type constraint.
 * 
 * @author Jiri Hynek
 */
class BooleanTypeManager implements ITypeManager<boolean> {

    /**
     * It converts the string representation of the boolean value.
     */
    public deserialize(value: string): boolean {
        return value === "true";
    }
}
export default BooleanTypeManager;