import IGeoDataManager from "../../../types/geodata/IGeoDataManager";
import IGeoDataManagerChangeEvent from "../../../types/event/geodata/IGeoDataManagerChangeEvent";
import IMapObject from "../../../types/object/IMapObject";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides the data change event object.
 * 
 * @author Jiri Hynek
 */
class GeoDataManagerChangeEvent<TSource extends IMapObject = IMapObject> extends MapChangeEvent<IGeoDataManager, TSource> implements IGeoDataManagerChangeEvent {

    /**
     * It initializes event.
     */
    public constructor(source: TSource, data: IGeoDataManager) {
        super(GeoDataManagerChangeEvent.TYPE(), source, data);
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "geo-data-manager-change-event";
    }
}
export default GeoDataManagerChangeEvent;