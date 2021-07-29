import IMapDomain from "../../types/domain/IMapDomain";
import IMapDomainArrayManager from "../../types/domain/IMapDomainArrayManager";
import MapDomainArrayManager from "./generic/MapDomainArrayManager";

/**
 * This class provides a factory for map domain managers.
 * 
 * @author Jiri Hynek
 */
class MapAggregationFunctionFactory {
    
    /**
     * It creates the map arary domain mananger.
     */
    public array<T extends IMapDomain>(domains: T[] | undefined): IMapDomainArrayManager<T> {
        return new MapDomainArrayManager(domains);
    }
}
export default MapAggregationFunctionFactory;