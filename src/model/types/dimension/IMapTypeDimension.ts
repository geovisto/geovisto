import IMapDimension from "./IMapDimension";
import ITypeManager from "../type/ITypeManager";

/**
 * This interface declares functions for using a map dimension which allows to set a value of specific type.
 * 
 * @author Jiri Hynek
 */
interface IMapTypeDimension<T, C extends ITypeManager<T> = ITypeManager<T>> extends IMapDimension<T> {

    /**
     * It returns the type manager.
     */
    getTypeManager(): C;

    /**
     * It sets a type manager.
     * 
     * @param typeConstraint 
     */
    setTypeManager(typeConstraint: C): void;
}
export default IMapTypeDimension;