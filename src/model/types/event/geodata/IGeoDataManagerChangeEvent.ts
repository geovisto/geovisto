
import IGeoDataManager from "../../geodata/IGeoDataManager";
import IMapChangeEvent from "../IMapChangeEvent";

/**
 * This interface declares geodata manager change event.
 * 
 * @author Jiri Hynek
 */
type IGeoDataManagerChangeEvent = IMapChangeEvent<IGeoDataManager>;
export default IGeoDataManagerChangeEvent;
