import IMapObjectsManager from "../object/IMapObjectsManager";
import IMapTool from "./IMapTool";

/**
 * This interface declares functions for using tools.
 * 
 * @author Jiri Hynek
 */
interface IMapToolsManager extends IMapObjectsManager<IMapTool> {

    /**
     * It returns copy of the tools manager with copies of tools.
     */
    copy(): IMapToolsManager;
}
export default IMapToolsManager;