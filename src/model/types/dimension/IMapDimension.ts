import IMapDomain from "../domain/IMapDomain";

/**
 * This interface declares functions for using a map dimension which allows to set a data domain.
 * 
 * @author Jiri Hynek
 */
interface IMapDimension<T> extends IMapDomain {

    /**
     * It sets the name of the dimension.
     */
    setName(name: string): void;

    /**
     * It returns the map domain which is set to the map dimension.
     */
    getValue(): T | undefined;

    /**
     * It sets a new map domain to the map dimension.
     * 
     * @param domain 
     */
    setValue(domain: T | undefined): void;

    /**
     * It finds the value of given string.
     * 
     * @param value 
     */
    findValue(value: string): T | undefined;

    /**
     * It deserializes the string representation of a given value.
     * 
     * @param value 
     */
    setStringValue(value: string): void;
}
export default IMapDimension;