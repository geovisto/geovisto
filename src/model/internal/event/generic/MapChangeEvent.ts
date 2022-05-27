import IMapObject from "../../../types/object/IMapObject";
import IMapChangeEvent from "../../../types/event/IMapChangeEvent";
import MapEvent from "./MapEvent";

/**
 * This class provides generic map change event object.
 * 
 * @author Jiri Hynek
 */
class MapChangeEvent<TChangedObject, TSource extends IMapObject = IMapObject> extends MapEvent<TSource> implements IMapChangeEvent {
    
    private changedObject: TChangedObject;

    /**
     * It initializes event.
     */
    public constructor(type: string, source: TSource, changedObject: TChangedObject) {
        super(type, source);
        
        this.changedObject = changedObject;
    }

    /**
     * Return the changed object.
     */
    public getChangedObject(): TChangedObject {
        return this.changedObject;
    }
}
export default MapChangeEvent;