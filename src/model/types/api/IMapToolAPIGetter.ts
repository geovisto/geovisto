import IMapToolAPI from "./IMapToolAPI";

/**
 * Generic getter of a tool API.
 * 
 * @author Jiri Hynek
 */
type IMapToolAPIGetter<TAPI extends IMapToolAPI = IMapToolAPI> = Record<string, () => TAPI>;
export default IMapToolAPIGetter;