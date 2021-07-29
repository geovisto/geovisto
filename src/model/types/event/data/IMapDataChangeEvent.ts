import IDataChangeAnimateOptions from "./IDataChangeAnimateOptions";
import IMapChangeEvent from "../IMapChangeEvent";
import IMapData from "../../data/IMapData";

/**
 * This interface declares abstract map event data change object.
 * 
 * @author Jiri Hynek
 */
interface IMapDataChangeEvent extends IMapChangeEvent<IMapData> {

    /**
     * It returns the animate options
     */
    getAnimateOptions(): IDataChangeAnimateOptions | undefined;
}
export default IMapDataChangeEvent;