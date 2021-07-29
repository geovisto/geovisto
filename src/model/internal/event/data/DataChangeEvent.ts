import IDataChangeAnimateOptions from "../../../types/event/data/IDataChangeAnimateOptions";
import IMapData from "../../../types/data/IMapData";
import IMapDataChangeEvent from "../../../types/event/data/IMapDataChangeEvent";
import IMapObject from "../../../types/object/IMapObject";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides the data change event object.
 * 
 * @author Jiri Hynek
 */
class DataChangeEvent<TSource extends IMapObject> extends MapChangeEvent<TSource, IMapData> implements IMapDataChangeEvent {
    
    private animateOptions?: IDataChangeAnimateOptions;

    /**
     * It initializes event.
     */
    public constructor(source: TSource, data: IMapData, animateOptions?: IDataChangeAnimateOptions) {
        super(DataChangeEvent.TYPE(), source, data);
        this.animateOptions = animateOptions;
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "data-change-event";
    }

    /**
     * It returns the animate options
     */
    public getAnimateOptions(): IDataChangeAnimateOptions | undefined {
        return this.animateOptions;
    }
}
export default DataChangeEvent;