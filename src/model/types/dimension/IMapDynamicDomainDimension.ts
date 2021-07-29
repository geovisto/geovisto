import IMapDomain from "../domain/IMapDomain";
import IMapDomainDimension from "./IMapDomainDimension";
import IMapDomainManager from "../domain/IMapDomainManager";

/**
 * This interface declares functions for using a map dimension which allows to set a data domain.
 * 
 * @author Jiri Hynek
 */
interface IMapDynamicDomainDimension<T extends IMapDomain> extends IMapDomainDimension<T> {

    /**
     * It returns the map domain manager loader which is set to the map dimension.
     */
    getDomainManagerLoader(): () => IMapDomainManager<T>;

    /**
     * It sets a map domain manager loader which is set to the map dimension.
     * 
     * @param domainManagerLoader 
     */
    setDomainManagerLoader(domainManagerLoader: () => IMapDomainManager<T>): void;
}
export default IMapDynamicDomainDimension;