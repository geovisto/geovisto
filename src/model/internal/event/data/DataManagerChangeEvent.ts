import IMapDataManager from "../../../types/data/IMapDataManager";
import IMapDataManagerChangeEvent from "../../../types/event/data/IMapDataManagerChangeEvent";
import IMapObject from "../../../types/object/IMapObject";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides the data change event object.
 * 
 * @author Jiri Hynek
 */
class DataManagerChangeEvent<TSource extends IMapObject> extends MapChangeEvent<TSource, IMapDataManager> implements IMapDataManagerChangeEvent {

    /**
     * It initializes event.
     */
    public constructor(source: TSource, data: IMapDataManager) {
        super(DataManagerChangeEvent.TYPE(), source, data);
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "data-manager-change-event";
    }
}
export default DataManagerChangeEvent;