import IMapDomain from "../../../types/domain/IMapDomain";

/**
 * The abstract implementation of map domain which overrides toString function.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractMapDomain implements IMapDomain {

    /**
     * It returns the name of the map domain.
     */
    abstract getName(): string;

    /**
     * The string representation is equal to the name of the map domain.
     */
    public toString(): string {
        return this.getName();
    }
}
export default AbstractMapDomain;