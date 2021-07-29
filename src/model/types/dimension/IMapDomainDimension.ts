import IMapDimension from "./IMapDimension";
import IMapDomain from "../domain/IMapDomain";
import IMapDomainManager from "../domain/IMapDomainManager";

/**
 * This interface declares functions for using a map dimension which allows to set a data domain.
 * 
 * @author Jiri Hynek
 */
interface IMapDomainDimension<T extends IMapDomain> extends IMapDimension<T> {

    /**
     * It returns the map domain manager which provides options to the map dimension.
     */
    getDomainManager(): IMapDomainManager<T>;

    /**
     * It sets a map domain manager which provides options to the map dimension.
     * 
     * @param domain 
     */
    setDomainManager(domain: IMapDomainManager<T>): void;
}
export default IMapDomainDimension;