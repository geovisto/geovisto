
import IToolEnabledEvent from "../../../types/event/tool/IToolEnabledEvent";
import IMapTool from "../../../types/tool/IMapTool";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides the tool enabled event.
 * 
 * @author Jiri Hynek
 */
class ToolEnabledEvent<TSource extends IMapTool = IMapTool> extends MapChangeEvent<boolean, TSource> implements IToolEnabledEvent {

    /**
     * It initializes event.
     */
    public constructor(source: TSource, enabled: boolean) {
        super(ToolEnabledEvent.TYPE(), source, enabled);
    }

    /**
     * Type of the event.
     */
    public static TYPE(): string {
        return "tool-enabled-event";
    }
}
export default ToolEnabledEvent;