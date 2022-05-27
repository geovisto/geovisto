import IGeoDataChangeEvent from "../../../types/event/geodata/IGeoDataChangeEvent";
import IMapTool from "../../../types/tool/IMapTool";
import MapChangeEvent from "../generic/MapChangeEvent";

/**
 * This class provides event, dispatched in case of geo data change.
 * 
 * @author Jiri Hynek
 */
class GeoDataChangeEvent extends MapChangeEvent<null, IMapTool> implements IGeoDataChangeEvent {
    
    public constructor(tool: IMapTool) {
        super(GeoDataChangeEvent.TYPE(), tool, null);
    }

    public static TYPE(): string {
        return "geo-data-change-event";
    }
}

export default GeoDataChangeEvent;