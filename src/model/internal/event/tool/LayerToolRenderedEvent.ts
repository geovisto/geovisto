import ILayerToolRenderedEvent from "../../../types/event/tool/ILayerToolRenderedEvent";
import ILayerTool from "../../../types/layer/ILayerTool";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides the layer tool rendered event.
 * 
 * @author Jiri Hynek
 */
class LayerToolRenderedEvent<TSource extends ILayerTool = ILayerTool> extends MapChangeEvent<number, TSource> implements ILayerToolRenderedEvent {

    /**
     * It initializes event.
     */
    public constructor(source: TSource, renderType: number) {
        super(LayerToolRenderedEvent.TYPE(), source, renderType);
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "layer-tool-rendered-event";
    }
}
export default LayerToolRenderedEvent;