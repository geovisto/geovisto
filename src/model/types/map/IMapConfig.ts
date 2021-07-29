import IMapObjectConfig from "../object/IMapObjectConfig";
import IMapToolConfig from "../tool/IMapToolConfig";

/**
 * This type provides specification of map config model.
 * 
 * @author Jiri Hynek
 */
type IMapConfig = IMapObjectConfig & {
    zoom?: number;
    mapCenter?: { lat: number, lng: number };
    mapStructure?: { maxZoom: number, maxBounds: [[ number, number ],[ number, number ]] };
    tools?: IMapToolConfig[];
}
export default IMapConfig;