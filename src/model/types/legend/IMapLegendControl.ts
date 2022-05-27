
import IMapLegend from "./IMapLegend";
import IMapObject from "../object/IMapObject";

/**
 * This interface declares functions which needs to be implemented when
 * a map object (e. g., tool) wants to provide a form control.
 * 
 * @author Tomas Koscielniak
 */
interface IMapLegendControl {

    /**
     * It returns a map control.
     */
    getMapLegend(): IMapLegend;
}
export default IMapLegendControl;

/**
 * Help function which tests whether the tool implements
 * getMapForm function of the IMapFormControl interface.
 * 
 * @param tool 
 */
export function instanceOfMapLegend<T extends IMapObject>(tool: T | IMapLegendControl): tool is IMapLegendControl {
    return (tool as IMapLegendControl).getMapLegend !== undefined;
}