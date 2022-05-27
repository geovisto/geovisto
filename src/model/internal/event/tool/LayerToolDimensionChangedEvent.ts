
import ILayerTool from "../../../types/layer/ILayerTool";
import MapEvent from "../generic/MapEvent";

/**
 * This class provides the layer tool dimension change event object.
 * 
 * @author Tomas Koscielniak
 * @author Jiri Hynek
 */
class LayerToolDimensionChangeEvent<TSource extends ILayerTool = ILayerTool> extends MapEvent<TSource> {
    
    /**
     * It initializes event.
     */
    public constructor(source: TSource) {
        super(LayerToolDimensionChangeEvent.TYPE(), source);
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "dimension-change-event";
    }
}
export default LayerToolDimensionChangeEvent;