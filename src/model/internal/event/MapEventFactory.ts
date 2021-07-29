import IMapData from "../../types/data/IMapData";
import IMapObject from "../../types/object/IMapObject";
import IMapEvent from "../../types/event/IMapEvent";
import IMapChangeEvent from "../../types/event/IMapChangeEvent";
import DataChangeEvent from "./data/DataChangeEvent";
import MapChangeEvent from "./generic/MapChangeEvent";
import MapEvent from "./generic/MapEvent";

/**
 * This class provides a factory for map events.
 * 
 * @author Jiri Hynek
 */
class MapEventFactory {
    
    /**
     * It creates a generic event.
     */
    public default(type: string, source: IMapObject): IMapEvent {
        return new MapEvent(type, source);
    }
    
    /**
     * It creates a generic change event.
     */
    public change(type: string, source: IMapObject, changedObject: unknown): IMapChangeEvent {
        return new MapChangeEvent(type, source, changedObject);
    }
    
    /**
     * It creates the data change event.
     */
    public dataChange(source: IMapObject, data: IMapData): IMapChangeEvent {
        return new DataChangeEvent(source, data);
    }
}
export default MapEventFactory;