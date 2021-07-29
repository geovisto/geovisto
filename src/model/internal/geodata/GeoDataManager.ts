import IGeoData from "../../types/geodata/IGeoData";
import IGeoDataManager from "../../types/geodata/IGeoDataManager";
import MapDomainArrayManager from "../domain/generic/MapDomainArrayManager";

/**
 * The class provides a basic implemention geographical data manager.
 * 
 * @author Jiri Hynek
 */
class GeoDataManager extends MapDomainArrayManager<IGeoData> implements IGeoDataManager {
    
    public constructor(geoDataArray: IGeoData[]) {
        super(geoDataArray);
    }
}
export default GeoDataManager;