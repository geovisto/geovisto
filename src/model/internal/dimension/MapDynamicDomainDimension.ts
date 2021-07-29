import AbstractMapDimension from "./AbstractMapDimension";
import IMapDimension from "../../types/dimension/IMapDimension";
import IMapDomain from "../../types/domain/IMapDomain";
import IMapDomainManager from "../../types/domain/IMapDomainManager";

/**
 * The class wraps a map dynamin domain dimension and its properties.
 * 
 * @author Jiri Hynek
 */
class MapDynamicDomainDimension<T extends IMapDomain> extends AbstractMapDimension<T> implements IMapDimension<T> {
    
    private domainManagerLoader: () => IMapDomainManager<T>;
    private domainName: string;

    /**
     * It creates a new map dimension.
     * 
     * @param name 
     * @param dataDomain 
     */
    public constructor(name: string, domainManagerLoader: () => IMapDomainManager<T>, domainName: string) {
        super(name, undefined);
        this.domainManagerLoader = domainManagerLoader;
        this.domainName = domainName;
    }

    /**
     * It returns the map domain manager which is set to the map dimension.
     */
    public getDomainManager(): IMapDomainManager<T> {
        return this.domainManagerLoader();
    }

    /**
     * It sets a map domain manager which is set to the map dimension.
     * 
     * @param domainManager 
     */
    public setDomainManager(): void {
        return;
    }

    /**
     * It returns the map domain manager loader which is set to the map dimension.
     */
    public getDomainManagerLoader(): () => IMapDomainManager<T> {
        return this.domainManagerLoader;
    }

    /**
     * It sets a map domain manager loader which is set to the map dimension.
     * 
     * @param domainManagerLoader 
     */
    public setDomainManagerLoader(domainManagerLoader: () => IMapDomainManager<T>): void {
        this.domainManagerLoader = domainManagerLoader;
    }

    /**
     * It returns the map domain which is set to the map dimension.
     */
    public getValue(): T | undefined {
        const value = super.getValue();
        if(value === undefined) {
            return this.getDomainManager().getDomain(this.domainName);
        }
        return value;
    }

    /**
     * It looks for the map domain of the given name and sets it the map dimension.
     * 
     * @param domainName 
     */
    public setStringValue(domainName: string): void {
        this.domainName = domainName;
        super.setValue(undefined);
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
export default MapDynamicDomainDimension;