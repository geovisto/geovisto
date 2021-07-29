import IMapEvent from "../../../types/event/IMapEvent";
import IMapObject from "../../../types/object/IMapObject";

/**
 * This class provides generic map event object.
 * 
 * @author Jiri Hynek
 */
class MapEvent<TSource extends IMapObject> implements IMapEvent {
    
    private type: string;
    private source: TSource;

    /**
     * It initializes event.
     */
    public constructor(type: string, source: TSource) {
        this.type = type;
        this.source = source;
    }

    /**
     * It returns string which identifies the event.
     */
    public getType(): string {
        return this.type;
    }

    /**
     * It return source map object of the event.
     */
    public getSource(): TSource {
        return this.source;
    }
}
export default MapEvent;