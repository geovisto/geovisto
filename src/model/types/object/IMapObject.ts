import IMapObjectConfig from "./IMapObjectConfig";
import IMapObjectDefaults from "./IMapObjectDefaults";
import IMapObjectState from "./IMapObjectState";
import { IMapObjectProps, IMapObjectInitProps } from "./IMapObjectProps";

/**
 * This interface declares functions for using map object which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
interface IMapObject<
    TProps extends IMapObjectProps = IMapObjectProps,
    TDefaults extends IMapObjectDefaults = IMapObjectDefaults,
    TState extends IMapObjectState = IMapObjectState,
    TConfig extends IMapObjectConfig = IMapObjectConfig,
    TInitProps extends IMapObjectInitProps<TConfig> = IMapObjectInitProps<TConfig>
> {

    /**
     * It returns the props given by the programmer.
     */
    getProps(): TProps;

    /**
     * It returns default values of the state properties.
     */
    getDefaults(): TDefaults;

    /**
     * It returns the map object state.
     */
    getState(): TState;

    /**
     * Help function which returns the type of the object.
     */
    getType(): string;

    /**
     * Help function which returns the id of the object.
     */
    getId(): string;

    /**
     * It initializes the state of the object.
     * It processes the serialized config and sets further objects.
     * 
     * This cannot be done in the object constructor
     * since the object can be created before the Geovisto map is created.
     * 
     * @param config 
     */
    initialize(initProps: TInitProps): this;
}
export default IMapObject;