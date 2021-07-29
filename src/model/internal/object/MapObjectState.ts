import IMapObject from "../../types/object/IMapObject";
import IMapObjectConfig from "../../types/object/IMapObjectConfig";
import IMapObjectDefaults from "../../types/object/IMapObjectDefaults";
import { IMapObjectProps, IMapObjectInitProps } from "../../types/object/IMapObjectProps";
import IMapObjectState from "../../types/object/IMapObjectState";

/**
 * This class manages state of the tool.
 * It wraps the state since the tool can work with state objects which needs to be explicitly serialized.
 * 
 * @author Jiri Hynek
 */
class AbstractMapObjectState implements IMapObjectState {
    
    private mapObject: IMapObject;

    private type: string;
    private id: string;

    /**
     * It creates a map object state.
     */
    public constructor(mapObject : IMapObject) {
        this.mapObject = mapObject;

        const props = mapObject.getProps();
        const defaults = mapObject.getDefaults();

        // sets the type of the object (can be set only once in the constructor)
        this.type = defaults.getType();

        // set the id of the object (can be set only once in the constructor)
        this.id = props.id == undefined ? defaults.getId() : props.id;
    }

    /**
     * It makes the map object visible to extended classes.
     */
    protected getMapObject(): IMapObject {
        return this.mapObject;
    }

    /**
     * It resets the state to the initial props.
     * 
     * @param defaults 
     * @param props 
     * @param initProps 
     */
    public initialize(defaults: IMapObjectDefaults, props: IMapObjectProps, initProps: IMapObjectInitProps): void {
        // deserialize config which overrides the defined state props if defined
        this.deserialize(initProps.config == undefined ? defaults.getConfig() : initProps.config);
    }

    /**
     * The metod takes config and deserializes the values.
     * 
     * @param config 
     */
    public deserialize(config : IMapObjectConfig) : void {
        if(config.id != undefined) this.setId(config.id);
    }

    /**
     * The method serializes the tool state. Optionally, a serialized value can be let undefined if it equals the default value.
     * 
     * @param defaults 
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public serialize(defaults : IMapObjectDefaults | undefined): IMapObjectConfig {
        return {
            type: this.getType(),
            id: this.getId(),
        };
    }

    /**
     * It returns the type property of the tool state.
     */
    public getType() : string {
        return this.type;
    }

    /**
     * It returns the id property of the tool state.
     */
    public getId() : string {
        return this.id;
    }

    /**
     * It sets the id property of the tool state.
     * 
     * @param id 
     */
    public setId(id : string): void {
       this.id = id;
    }
}
export default AbstractMapObjectState;
