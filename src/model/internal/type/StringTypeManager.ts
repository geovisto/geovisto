import ITypeManager from "../../types/type/ITypeManager";

/**
 * This class specifies the empty type constraint.
 * 
 * @author Jiri Hynek
 */
class StringTypeManager implements ITypeManager<string> {

    /**
     * It keeps the string representation.
     */
    public deserialize(value: string): string {
        return value;
    }
}
export default StringTypeManager;