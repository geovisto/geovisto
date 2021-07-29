import IMapEvent from "./IMapEvent";

/**
 * This interface declares map event listener.
 * 
 * @author Jiri Hynek
 */
interface IMapEventListener {

    /**
     * This function is called when a custom event is invoked.
     * 
     * @param event
     */
    handleEvent(event: IMapEvent): void;
}
export default IMapEventListener;