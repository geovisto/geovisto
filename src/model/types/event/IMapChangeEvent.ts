import IMapEvent from "./IMapEvent";
import IMapObject from "../object/IMapObject";

/**
 * This interface declares abstract map event change object.
 * 
 * @author Jiri Hynek
 */
interface IMapChangeEvent<TChangedObject extends unknown = unknown, TSource extends IMapObject = IMapObject> extends IMapEvent<TSource> {

    /**
     * Return the changed object.
     */
    getChangedObject(): TChangedObject;
}
export default IMapChangeEvent;