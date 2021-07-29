
import IMapForm from "./IMapForm";
import IMapObject from "../object/IMapObject";

/**
 * This interface declares functions which needs to be implemented when
 * a map object (e. g., tool) wants to provide a form control.
 * 
 * @author Jiri Hynek
 */
interface IMapFormControl {

    /**
     * It returns a map control.
     */
    getMapForm(): IMapForm;
}
export default IMapFormControl;

/**
 * Help function which tests whether the tool implements
 * getMapForm function of the IMapFormControl interface.
 * 
 * @param tool 
 */
export function instanceOfMapForm<T extends IMapObject>(tool: T | IMapFormControl): tool is IMapFormControl {
    return (tool as IMapFormControl).getMapForm !== undefined;
}