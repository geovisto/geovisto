import IMap from "../../types/map/IMap";
import IMapEvent from "../../types/event/IMapEvent";
import IMapEventListener from "../../types/event/IMapEventListener";
import IMapTool from "../../types/tool/IMapTool";
import IMapToolAPIGetter from "../../types/api/IMapToolAPIGetter";
import IMapToolConfig from "../../types/tool/IMapToolConfig";
import IMapToolDefaults from "../../types/tool/IMapToolDefaults";
import { IMapToolProps, IMapToolInitProps } from "../../types/tool/IMapToolProps";
import IMapToolState from "../../types/tool/IMapToolState";
import MapObject from "../object/MapObject";
import MapToolDefaults from "./MapToolDefaults";
import MapToolState from "./MapToolState";

/**
 * This class provides basic tools API.
 * 
 * @author Jiri Hynek
 */
class MapTool extends MapObject implements IMapTool, IMapEventListener {

    /**
     * It initializes the tool.
     */
    public constructor(props?: IMapToolProps) {
        super(props);
    }

    /**
     * It creates copy of the uninitialized tool.
     */
    public copy(): IMapTool {
        return new MapTool(this.getProps());
    }

    /**
     * Help function which returns the props given by the programmer.
     */
    public getProps(): IMapToolProps {
        return <IMapToolProps> super.getProps();
    }

    /**
     * It returns default values of the state properties.
     */
    public getDefaults(): IMapToolDefaults {
        return <IMapToolDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the tool.
     */
    protected createDefaults(): IMapToolDefaults {
        return new MapToolDefaults();
    }

    /**
     * It returns the map tool state.
     */
    public getState(): IMapToolState {
        return <IMapToolState> super.getState();
    }

    /**
     * It creates new defaults of the tool.
     */
    protected createState(): IMapToolState {
        return new MapToolState(this);
    }

    /**
     * It returns the tool API
     */
    public getAPIGetter(): IMapToolAPIGetter | undefined {
        return undefined;
    }

    /**
     * Help getter which returns a logtical value whether the tool type is singleton.
     */
    public isSingleton(): boolean {
       return this.getDefaults().isSingleton(); 
    }

    /**
     * It initializes the tool before it is created.
     * It processes the serialized config and sets the Geovisto map which manages the tools.
     * 
     * This cannot be done in the tool constructor
     * since the tool can be created before the Geovisto map is created.
     * 
     * This cannot be done in the tool create function
     * since there can be possible dependencies between the tools
     * (the tool might depend on other tools which needs to be initialized).
     * 
     * @param initProps
     */
    public initialize(initProps: IMapToolInitProps<IMapToolConfig>): this {
        super.initialize(initProps);
        // register this tool as a listener to map events
        this.getMap()?.getState().getEventManager().addEventListener(this);
        return this;
    }

    /**
     * Help function returns map which uses this tool.
     * 
     * Do not override this function. Use the state class instead.
     * 
     * @returns {CombinedMap}
     */
    public getMap(): IMap | undefined {
        return this.getState().getMap();
    }

    /**
     * It creates a tool.
     * 
     * Override this function.
     */
    public create(): this {
        return this;
    }

    /**
     * Help getter which returns enabled property of state.
     * 
     * Do not override this function. Use the state class instead.
     */
    public isEnabled(): boolean {
        return this.getState().isEnabled();
    }

    /**
     * Some tools might be dynamicaly enabled/disabled.
     * This function is called externally when the tool is enabled/disabled.
     * 
     * Override this function, if needed.
     * 
     * @param enabled 
     */
    public setEnabled(enabled: boolean) : void {
        if(this.isEnabled() != enabled) {
            this.getState().setEnabled(enabled);
        }
    }

    /**
     * Help function which switches enabled state (enabled/disabled).
     * 
     * Do not override this function. Use setEnabled instead.
     */
    public switchEnabled(): void {
        // update settings
        this.setEnabled(!this.isEnabled());
    }

    /**
     * This function is called when a custom event is invoked.
     * 
     * Override this function, if needed.
     * 
     * @param event
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public handleEvent(event: IMapEvent): void {
        return;
    }
}
export default MapTool;