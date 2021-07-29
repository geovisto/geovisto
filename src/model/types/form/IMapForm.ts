/**
 * The interface declares functions for management of form inputs.
 * 
 * @author Jiri Hynek
 */
interface IMapForm {

    /**
     * It returns a HTML div element conatining the form.
     */
    getContent(): HTMLDivElement;
}
export default IMapForm;