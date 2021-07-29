import IMap from "../map/IMap";
import IMapObject from "../object/IMapObject";
import IMapToolAPI from "../api/IMapToolAPI";
import IMapToolAPIGetter from "../api/IMapToolAPIGetter";
import IMapToolConfig from "./IMapToolConfig";
import IMapToolDefaults from "./IMapToolDefaults";
import IMapToolState from "./IMapToolState";
import { IMapToolProps, IMapToolInitProps } from "./IMapToolProps";

/**
 * This interface declares functions for using map tool which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
interface IMapTool<
    TProps extends IMapToolProps = IMapToolProps,
    TDefaults extends IMapToolDefaults = IMapToolDefaults,
    TState extends IMapToolState = IMapToolState,
    TConfig extends IMapToolConfig = IMapToolConfig,
    TInitProps extends IMapToolInitProps<TConfig> = IMapToolInitProps<TConfig>,
    TAPI extends IMapToolAPI = IMapToolAPI
> extends IMapObject<TProps, TDefaults, TState, TConfig, TInitProps> {

    /**
     * It creates copy of the uninitialized tool.
     */
    copy(): IMapTool;

    /**
     * It returns the tool API.
     */
    getAPIGetter(): IMapToolAPIGetter<TAPI> | undefined;

    /**
     * It returns a logical value whether the tool type is singleton.
     */
    isSingleton(): boolean;

    /**
     * Help function which returns map which uses this tool.
     */
    getMap(): IMap | undefined;

    /**
     * It creates a tool.
     */
    create(): this;

    /**
     * Help getter which returns enabled property of state.
     */
    isEnabled(): boolean

    /**
     * Some tools might be dynamicaly enabled/disabled.
     * This function is called externally when the tool is enabled/disabled.
     * 
     * @param enabled 
     */
    setEnabled(enabled: boolean): void

    /**
     * Help function which switches the enabled state (enabled/disabled).
     */
    switchEnabled(): void;
}
export default IMapTool;