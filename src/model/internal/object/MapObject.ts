import IMapObject from "../../types/object/IMapObject";
import IMapObjectDefaults from "../../types/object/IMapObjectDefaults";
import { IMapObjectProps, IMapObjectInitProps } from "../../types/object/IMapObjectProps";
import IMapObjectState from "../../types/object/IMapObjectState";
import AbstractMapObjectState from "./MapObjectState";
import MapObjectDefaults from "./MapObjectDefaults";

/**
 * This class provide functions for using map object which can be identified by uniquie string.
 * 
 * @author Jiri Hynek
 */
class MapObject implements IMapObject {
    
    private props: IMapObjectProps;
    private defaults: IMapObjectDefaults;
    private state: IMapObjectState;

    /**
     * It creates a map object.
     */
    public constructor(props?: IMapObjectProps) {
        // create defaults of the object
        this.defaults = this.createDefaults();

        // get default props if undefined
        this.props = props == undefined ? this.defaults.getProps() : props;

        // create state of the object
        this.state = this.createState();

        //console.log("new object:", this.defaults.getType());
    }

    /**
     * It updates the props.
     */
    protected setProps(props: IMapObjectProps): void {
        this.props = props;
    }

    /**
     * It returns the props given by the programmer.
     */
    public getProps(): IMapObjectProps {
        return this.props;
    }

    /**
     * It returns default values of the state properties.
     */
    public getDefaults(): IMapObjectDefaults {
        return this.defaults;
    }

    /**
     * It creates new defaults of the object.
     * 
     * This function can be overriden.
     */
    protected createDefaults(): IMapObjectDefaults {
        return new MapObjectDefaults();
    }

    /**
     * It returns the tool state.
     * 
     * This function should not be overriden.
     */
    public getState(): IMapObjectState {
        return this.state;
    }

    /**
     * It creates new state if the object.
     * 
     * This function can be overriden.
     */
    protected createState(): IMapObjectState {
        return new AbstractMapObjectState(this);
    }

    /**
     * Help function which returns the type of the object.
     */
    public getType(): string {
        return this.state.getType();
    }

    /**
     * Help function which returns the id of the object.
     */
    public getId(): string {
        return this.state.getId();
    }

    /**
     * It initializes the state of the object.
     * It processes the serialized config and sets further objects.
     * 
     * This cannot be done in the object constructor
     * since the object can be created before the Geovisto map is created.
     * 
     * @param initProps
     */
    public initialize(initProps: IMapObjectInitProps): this {
        // override state by the config if specified in argument
        this.getState().initialize(this.getDefaults(), this.getProps(), initProps);

        return this;
    }
}
export default MapObject;