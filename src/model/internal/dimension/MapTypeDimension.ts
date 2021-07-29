import AbstractMapDimension from "./AbstractMapDimension";
import IMapTypeDimension from "../../types/dimension/IMapTypeDimension";
import ITypeManager from "../../types/type/ITypeManager";

/**
 * The class wraps a map type dimension and its properties.
 * 
 * @author Jiri Hynek
 */
class MapDomainDimension<T, C extends ITypeManager<T> = ITypeManager<T>> extends AbstractMapDimension<T> implements IMapTypeDimension<T, C> {
    
    private typeManager: C;

    /**
     * It creates a new map dimension.
     * 
     * @param name 
     * @param typeManager 
     * @param value
     */
    public constructor(name: string, typeManager: C, value?: T) {
        super(name, value);
        this.typeManager = typeManager;
    }

    /**
     * It returns the type constraint.
     */
    public getTypeManager(): C {
        return this.typeManager;
    }

    /**
     * It sets a type constraint.
     * 
     * @param typeConstraint 
     */
    public setTypeManager(typeManager: C): void {
        this.typeManager = typeManager;
    }

    /**
     * It finds the value of given string.
     * 
     * @param value 
     */
    public findValue(value: string): T | undefined {
        return this.getTypeManager().deserialize(value);
    }
}
export default MapDomainDimension;