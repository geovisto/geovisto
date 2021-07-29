import IMapDomain from "./IMapDomain";
import IMapDomainManager from "./IMapDomainManager";

/**
 * This interface declares functions for using map domains which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
interface IMapDomainArrayManager<T extends IMapDomain> extends IMapDomainManager<T> {

    /**
     * The function returns the default map domain.
     */
    getDefault(): T | undefined;

    /**
     * The function returns the number of domains.
     */
    size(): number;

    /**
     * The function returns true if size() is 0.
     */
    isEmpty(): boolean;

    /**
     * It adds a domain to the list of domains.
     * 
     * @param domain 
     */
    add(domain: T): void;

    /**
     * It removes a domain from the list of domains.
     * 
     * @param domain 
     */
    remove(domain: T): void;

    /**
     * It removes domain of the given name from the list of domains.
     * 
     * @param name 
     */
    removeByName(name: string): void;
}
export default IMapDomainArrayManager;