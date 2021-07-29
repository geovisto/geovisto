import IMapChangeEvent from "./IMapChangeEvent";
import IMapData from "../data/IMapData";
import IMapEvent from "./IMapEvent";
import IMapObject from "../object/IMapObject";

/**
 * This interface declares a factory for map events.
 * 
 * @author Jiri Hynek
 */
interface IMapEventFactory {
    
    /**
     * It creates a generic event.
     */
    default(type: string, source: IMapObject): IMapEvent;
    
    /**
     * It creates a generic change event.
     */
    change(type: string, source: IMapObject, changedObject: unknown): IMapChangeEvent;
    
    /**
     * It creates the data change event.
     */
    dataChange(source: IMapObject, data: IMapData): IMapChangeEvent;
}
export default IMapEventFactory;