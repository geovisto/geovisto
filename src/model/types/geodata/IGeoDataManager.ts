import IGeoData from "./IGeoData";
import IMapDomainArrayManager from "../domain/IMapDomainArrayManager";

/**
 * The type represents geographical data manager.
 * 
 * @author Jiri Hynek
 */
type IGeoDataManager = IMapDomainArrayManager<IGeoData>;
export default IGeoDataManager;