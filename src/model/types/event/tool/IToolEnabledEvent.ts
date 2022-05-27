import IMapChangeEvent from "../IMapChangeEvent";
import IMapTool from "../../tool/IMapTool";

/**
 * This type declares tool enabled event.
 * 
 * @author Jiri Hynek
 */
type IToolEnabledEvent = IMapChangeEvent<boolean, IMapTool>;
export default IToolEnabledEvent;
