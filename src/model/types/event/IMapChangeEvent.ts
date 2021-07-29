import IMapEvent from "./IMapEvent";

/**
 * This interface declares abstract map event change object.
 * 
 * @author Jiri Hynek
 */
interface IMapChangeEvent<T extends unknown = unknown> extends IMapEvent {

    /**
     * Return the changed object.
     */
    getChangedObject(): T;
}
export default IMapChangeEvent;