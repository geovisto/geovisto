import IMapObject from "../object/IMapObject";

/**
 * This interface declares abstract map event object.
 * 
 * @author Jiri Hynek
 */
interface IMapEvent<TSource extends IMapObject = IMapObject> {
    
    /**
     * Returns string which identifies the event.
     */
    getType(): string;

    /**
     * Return source object of the event.
     */
    getSource(): TSource;
}
export default IMapEvent;