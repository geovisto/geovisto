import IMapChangeEvent from "../IMapChangeEvent";
import IMapDataManager from "../../data/IMapDataManager";

/**
 * This interface declares abstract map event data change object.
 * 
 * @author Jiri Hynek
 */
type IMapDataChangeManagerEvent = IMapChangeEvent<IMapDataManager>;
export default IMapDataChangeManagerEvent;