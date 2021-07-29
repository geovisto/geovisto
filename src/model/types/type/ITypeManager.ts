/**
 * This interface declares functions for the type manager.
 * 
 * @author Jiri Hynek
 */
 interface ITypeManager<T> {

    /**
     * It deserializes the string representation of a given value.
     * 
     * @param value 
     */
    deserialize(value: string): T;
}
export default ITypeManager;