import IMapDomain from "./IMapDomain";

/**
 * This interface declares functions for using a map domains
 * 
 * @author Jiri Hynek
 */
interface IMapDomainManager<T extends IMapDomain> {

    /**
     * It returns data domain which is set to the map dimension.
     */
    getDomains(): T[] | undefined;

    /**
     * It sets the data domain which is set to the map dimension.
     * 
     * @param dataDomain 
     */
    getDomainNames(): string[];

    /**
     * The function returns map domains of given name.
     * 
     * @param name
     */
    getDomain(name: string): T | undefined;
}
export default IMapDomainManager;