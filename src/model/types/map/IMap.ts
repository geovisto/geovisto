import IDataChangeAnimateOptions from "../event/data/IDataChangeAnimateOptions";
import IMapConfigManager from "../config/IMapConfigManager";
import IMapConfig from "./IMapConfig";
import IMapData from "../data/IMapData";
import IMapDefaults from "./IMapDefaults";
import IMapObject from "../object/IMapObject";
import { IMapProps, IMapInitProps } from "./IMapProps";
import IMapState from "./IMapState";
import IMapDataManager from "../data/IMapDataManager";

/**
 * Declaration of map wrapper which handles map inputs (data, props, config), map tools and other map objects.
 * 
 * @author Jiri Hynek
 */
interface IMap<
    TProps extends IMapProps = IMapProps,
    TDefaults extends IMapDefaults = IMapDefaults,
    TState extends IMapState = IMapState,
    TConfig extends IMapConfig = IMapConfig,
    TInitProps extends IMapInitProps<TConfig> = IMapInitProps<TConfig>
> extends IMapObject<TProps, TDefaults, TState, TConfig, TInitProps> {

    /**
     * The function draws a new map.
     */
    draw(mapConfig: IMapConfigManager): HTMLElement | null;

    /**
     * This function redraws the current map.
     */
    redraw(mapConfig: IMapConfigManager, props?: IMapProps): HTMLElement | null;

    /**
     * It exports the serialized representation of the current state of the map.
     */
    export(): Record<string, unknown>;

    /**
     * It updates data and notifies listeners.
     * 
     * @param data
     */
    updateData(data: IMapDataManager): void;

    /**
     * It updates current data and notifies listeners.
     * 
     * @param data
     * @param source of the change
     * @param animateOptions
     */
    updateCurrentData(data: IMapData, source: IMapObject, animateOptions?: IDataChangeAnimateOptions): void;
}
export default IMap;