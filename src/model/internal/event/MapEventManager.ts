import IMapEvent from "../../types/event/IMapEvent";
import IMapEventListener from "../../types/event/IMapEventListener";
import IMapEventManager from "../../types/event/IMapEventManager";

/**
 * This class defines functions for management and handling events and event listeners.
 * 
 * @author Jiri Hynek
 */
class MapEventManager implements IMapEventManager {

    private listeners: IMapEventListener[];
    private eventQueue: {
        event: IMapEvent,
        beforeCallBack: (() => void) | undefined,
        afterCallBack: (() => void) | undefined
    }[];

    /**
     * It creates a new map event manager.
     */
    public constructor() {
        this.listeners = [];
        this.eventQueue = [];
    }

    /**
     * It schdules an event in the end of the event queue and dispatch the event.
     * 
     * @param event
     */
     public scheduleEvent(event: IMapEvent, beforeCallBack: (() => void) | undefined, afterCallBack: (() => void) | undefined): void {
        // echedule event to future
        this.eventQueue.push({ event: event, beforeCallBack: beforeCallBack, afterCallBack: afterCallBack });

        // if only this event is in queue, process the event
        if(this.eventQueue.length == 1) {
            // start event loop 
            // listeners might schedule further events
            let event;
            while(this.eventQueue.length > 0) {
                event = this.eventQueue[0];
                // handle event
                if(event.beforeCallBack) {
                    event.beforeCallBack();
                }
                this.dispatchEvent(event.event);
                if(event.afterCallBack) {
                    event.afterCallBack();
                }
                // remove the dispatched event
                this.eventQueue.shift();
            }
        }
    }
    
    /**
     * It sends custom event to all listeners (tools)
     * 
     * @param event 
     */
    public dispatchEvent(event: IMapEvent): void {
        console.log("event: " + event.getType(), event);
        for(let i = 0; i < this.listeners.length; i++) {
            this.listeners[i].handleEvent(event);
        }
    }

    /**
     * It adds an event listener.
     * 
     * @param listener 
     */
    public addEventListener(listener: IMapEventListener): void {
        if(!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    }

    /**
     * It removes an event listener.
     * 
     * @param listener 
     */
    public removeEventListener(listener: IMapEventListener): void {
        const index = this.listeners.indexOf(listener, 0);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
}
export default MapEventManager;