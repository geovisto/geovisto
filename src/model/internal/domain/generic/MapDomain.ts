import IMapDomain from "../../../types/domain/IMapDomain";
import AbstractMapDomain from "../abstract/AbstractMapDomain";

/**
 * The generic implementation of map domain which overrides toString function.
 * 
 * @author Jiri Hynek
 */
abstract class MapDomain extends AbstractMapDomain implements IMapDomain {
    
    private name: string;

    public constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * It returns the name of the map domain.
     */
    public getName(): string {
        return this.name;
    }
}
export default MapDomain;