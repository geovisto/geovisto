import IMapDataDomain from "../data/IMapDataDomain";
import IMapFilterOperation from "./IMapFilterOperation";

/**
 * This interface declares functions for manipulation with a filter rule composed of
 * data domain, filter operation, pattern which represents a filter rule.
 * 
 * @author Jiri Hynek
 */
interface IMapFilterRule {

    /**
     * It returns the the data domain which should be analyzed.
     */
    getDataDomain(): IMapDataDomain;

    /**
     * It returns the filter operation used for the filtering.
     */
    getFilterOperation(): IMapFilterOperation;

    /**
     * It returns the string label of the filter representing operator given by the parameter of constructor.
     */
    getPattern(): string;
}
export default IMapFilterRule;