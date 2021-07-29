import IMapDomain from "../../../types/domain/IMapDomain";
import IMapDomainArrayManager from "../../../types/domain/IMapDomainArrayManager";

/**
 * This class provide functions for using map domains which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
class MapDomainArrayManager<T extends IMapDomain> implements IMapDomainArrayManager<T> {
    
    private domains: T[];

    /**
     * It initializes a map domain manager.
     */
    public constructor(domains: T[] | undefined) {
        this.domains = domains ? domains : [];
    }

    /**
     * The function returns available map domains.
     */
    public getDomains(): T[] {
        return this.domains;
    }

    /**
     * The function returns the first domain of the array.
     */
    public getDefault(): T | undefined {
        const domains: T[] = this.getDomains();
        return domains && domains.length > 0 ? domains[0] : undefined;
    }

    /**
     * The function returns number of domains.
     */
    public size(): number {
        return this.domains.length;
    }

    /**
     * The function returns true if size() is 0.
     */
    public isEmpty(): boolean {
        return this.domains.length == 0;
    }

    /**
     * It adds a domain to the list of domains.
     * 
     * Override this function.
     * 
     * @param domains 
     */
    public add(domains: T): void {
        this.domains.push(domains);
    }

    /**
     * It removes a domain from the list of domains.
     * 
     * @param domains 
     */
    public remove(domains: T): void {
        this.domains = this.domains.filter(item => item != domains);
    }

    /**
     * It removes a domain from the list of domains.
     * 
     * Override this function.
     * 
     * @param id 
     */
    public removeByName(id: string): void {
        this.domains = this.domains.filter(item => item.getName() != id);
    }
    
    /**
     * Help function which returns the list of domain string labels (map domain types).
     */
    public getDomainNames(): string[] {
        const names: string[] = [];
        const domain = this.getDomains();
        if(domain != undefined) {
            for(let i = 0; i < domain.length; i++) {
                names.push(domain[i].getName());
            }
        }
        return names;
    }

    /**
     * The function returns map domains of given type.
     * 
     * @param name
     */
    public getDomain(name: string): T | undefined {
        const domains = this.getDomains();
        if(domains != undefined) {
            for(let i = 0; i < domains.length; i++) {
                if(domains[i].getName() == name) {
                    return domains[i];
                }
            }
        }
        return undefined;
    }
}
export default MapDomainArrayManager;