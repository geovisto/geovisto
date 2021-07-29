import IMapDomain from "../domain/IMapDomain";

/**
 * The interface declares meta data path used to find data.
 * 
 * @author Jiri Hynek
 */
interface IMapDataDomain extends IMapDomain {

    /**
     * It returns the original representation of data domain.
     */
    getOriginal(): unknown;
}
export default IMapDataDomain;