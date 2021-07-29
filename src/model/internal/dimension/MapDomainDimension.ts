import AbstractMapDimension from "./AbstractMapDimension";
import IMapDomain from "../../types/domain/IMapDomain";
import IMapDomainDimension from "../../types/dimension/IMapDomainDimension";
import IMapDomainManager from "../../types/domain/IMapDomainManager";

/**
 * The class wraps a map domain dimension and its properties.
 * 
 * @author Jiri Hynek
 */
class MapDomainDimension<T extends IMapDomain> extends AbstractMapDimension<T> implements IMapDomainDimension<T> {
    
    private domainManager: IMapDomainManager<T>;

    /**
     * It creates a new map dimension.
     * 
     * @param name 
     * @param domainManager
     * @param dataDomain 
     */
    public constructor(name: string, domainManager: IMapDomainManager<T>, dataDomain?: T) {
        super(name, dataDomain);
        this.domainManager = domainManager;
    }

    /**
     * It returns the map domain manager which is set to the map dimension.
     */
    public getDomainManager(): IMapDomainManager<T> {
        return this.domainManager;
    }

    /**
     * It sets a map domain manager which is set to the map dimension.
     * 
     * @param domainManager 
     */
    public setDomainManager(domainManager: IMapDomainManager<T>): void {
        this.domainManager = domainManager;
    }

    /**
     * It finds the value of given string.
     * 
     * @param domainName 
     */
    public findValue(domainName: string): T | undefined {
        return this.getDomainManager().getDomain(domainName);
    }
}
export default MapDomainDimension;