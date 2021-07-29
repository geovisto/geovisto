import IMapObject from "./IMapObject";

/**
 * This interface declares functions for using map objects which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
interface IMapObjectsManager<T extends IMapObject> {

    /**
     * The function returns available map objects.
     */
    getAll(): T[]

    /**
     * The function returns the number of objects.
     */
    size(): number;

    /**
     * The function returns true if size() is 0.
     */
    isEmpty(): boolean;

    /**
     * It adds object to the list of objects.
     * 
     * @param object 
     */
    add(object: T): void;

    /**
     * It removes object from the list of objects.
     * 
     * @param object 
     */
    remove(object: T): void;

    /**
     * It removes object of the given id from the list of objects.
     * 
     * @param id 
     */
    removeById(id: string): void;

    /**
     * Help function which returns the list of object string types.
     */
    getTypes(): string[];

    /**
     * Help function which returns the list of object string identifiers.
     */
    getIds(): string[];

    /**
     * The function returns map objects of given type.
     * 
     * @param type
     */
    getByType(type: string): T[];

    /**
     * The function returns map object of given unique identifier.
     * 
     * @param id
     */
    getById(id: string): T | undefined;
}
export default IMapObjectsManager;