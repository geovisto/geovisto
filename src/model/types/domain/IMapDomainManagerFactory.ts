import IMapDomain from "../../types/domain/IMapDomain";
import IMapDomainArrayManager from "../../types/domain/IMapDomainArrayManager";

/**
 * This interface declares a factory for map domain managers.
 * 
 * @author Jiri Hynek
 */
interface MapAggregationFunctionFactory {
    
    /**
     * It creates the map arary domain mananger.
     */
    array<T extends IMapDomain>(domains: T[] | undefined): IMapDomainArrayManager<T>;
}
export default MapAggregationFunctionFactory;