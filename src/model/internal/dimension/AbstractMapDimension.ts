import AbstractMapDomain from "../domain/abstract/AbstractMapDomain";
import IMapDimension from "../../types/dimension/IMapDimension";

/**
 * The class wraps a map type dimension and its properties.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractMapDimension<T> extends AbstractMapDomain implements IMapDimension<T> {
    
    private name: string;
    private value?: T;

    /**
     * It creates a new map dimension.
     * 
     * @param name 
     * @param typeManager 
     * @param value
     */
    public constructor(name: string, value?: T) {
        super();
        this.name = name;
        this.value = value;
    }

    /**
     * It returns the name of the dimension
     */
    public getName(): string {
        return this.name;
    }

    /**
     * It sets the name of the dimension
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * It returns the value which is set to the map dimension.
     */
    public getValue(): T | undefined {
        return this.value;
    }

    /**
     * It sets a new value to the map dimension.
     * 
     * @param value 
     */
    public setValue(value: T | undefined): void {
        this.value = value;
    }

    /**
     * It finds the value of given string.
     * 
     * @param value 
     */
    public abstract findValue(value: string): T | undefined;

    /**
     * It deserializes the string representation of a given value.
     * 
     * @param value 
     */
    public setStringValue(value: string): void {
        this.value = this.findValue(value);
    }

}
export default AbstractMapDimension;