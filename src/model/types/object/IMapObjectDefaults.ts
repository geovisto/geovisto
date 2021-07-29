import IMapObjectConfig from "./IMapObjectConfig";
import { IMapObjectProps } from "./IMapObjectProps";

/**
 * This interface declares functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
interface IMapObjectDefaults<
    TProps extends IMapObjectProps = IMapObjectProps,
    TConfig extends IMapObjectConfig = IMapObjectConfig
> {

    /**
     * It returns default props if no props are given.
     */
    getProps(): TProps;
    
    /**
     * It returns a default config if no config is given.
     */
    getConfig(): TConfig;

    /**
     * It returns a unique type string of the map object.
     */
    getType(): string;

    /**
     * It returns identifier which is used when no identifier is specified.
     */
    getId(): string;
}
export default IMapObjectDefaults;