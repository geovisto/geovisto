import IMapEvent from "./IMapEvent";
import IMapEventListener from "./IMapEventListener";

/**
 * This interface declares functions for management and handling events and event listeners.
 * 
 * @author Jiri Hynek
 */
interface IMapEventManager {

    /**
     * It schdules an event in the end of the event queue and dispatch the event.
     * 
     * @param event 
     */
    scheduleEvent(event: IMapEvent, beforeCallBack: (() => void) | undefined, afterCallBack: (() => void) | undefined): void;

    /**
     * It adds an event listener.
     * 
     * @param listener 
     */
    addEventListener(listener: IMapEventListener): void;

    /**
     * It removes an event listener.
     * 
     * @param listener 
     */
    removeEventListener(listener: IMapEventListener): void;
}
export default IMapEventManager;