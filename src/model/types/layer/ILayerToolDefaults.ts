import ILayerToolDimensions from "./ILayerToolDimensions";
import IMap from "../map/IMap";
import IMapToolDefaults from "../tool/IMapToolDefaults";

/**
 * This interface declares functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
interface ILayerToolDefaults extends IMapToolDefaults {

    /**
     * It returns the layer name.
     */
    getLayerName(): string;
    
    /**
     * It returns list of map dimensions.
     */
    getDimensions(map?: IMap): ILayerToolDimensions;
}
export default ILayerToolDefaults;