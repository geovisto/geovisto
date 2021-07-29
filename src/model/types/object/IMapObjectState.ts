import IMapObjectConfig from "./IMapObjectConfig";
import IMapObjectDefaults from "./IMapObjectDefaults";
import { IMapObjectProps, IMapObjectInitProps } from "./IMapObjectProps";

/**
 * This interface declares the state of a map object.
 * It wraps the state since the map object can work with state objects which needs to be explicitly serialized.
 * 
 * @author Jiri Hynek
 */
interface IMapObjectState<
    TProps extends IMapObjectProps = IMapObjectProps,
    TDefaults extends IMapObjectDefaults = IMapObjectDefaults,
    TConfig extends IMapObjectConfig = IMapObjectConfig,
    TInitProps extends IMapObjectInitProps<TConfig> = IMapObjectInitProps<TConfig>
> {

    /**
     * It resets the state to the initial state.
     * 
     * @param defaults 
     * @param props 
     * @param initProps 
     */
    initialize(defaults: TDefaults, props: TProps, initProps: TInitProps): void;

    /**
     * The metod takes config and deserializes the values.
     * 
     * @param config 
     */
    deserialize(config: TConfig): void;

    /**
     * The method serializes the map object state. Optionally, a serialized value can be let undefined if it equals the default value.
     * 
     * @param defaults 
     */
    serialize(defaults: TDefaults | undefined): TConfig;

    /**
     * It returns the type property of the map object state.
     */
    getType(): string;

    /**
     * It returns the id property of the map object state.
     */
    getId(): string;

    /**
     * It sets the id property of the map object state.
     * It can be set only once.
     * 
     * @param id 
     */
    setId(id: string): void;
}
export default IMapObjectState;
