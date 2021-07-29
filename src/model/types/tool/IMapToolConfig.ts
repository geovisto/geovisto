import IMapObjectConfig from "../object/IMapObjectConfig";

/**
 * This type provides specification of map tool config model.
 * 
 * @author Jiri Hynek
 */
type IMapToolConfig = IMapObjectConfig & {
    enabled?: boolean;
}
export default IMapToolConfig;