import IMapObjectConfig from "../../types/object/IMapObjectConfig";
import IMapObjectDefaults from "../../types/object/IMapObjectDefaults";
import { IMapObjectProps } from "../../types/object/IMapObjectProps";

/**
 * This class provide functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
class MapObjectDefaults implements IMapObjectDefaults {

    protected static id: number;
    protected idString?: string;

    /**
     * It returns default props if no props are given.
     */
    public getProps(): IMapObjectProps {
        return {
            id: this.getId()
        };
    }

    /**
     * It returns a default config if no config is given.
     */
    public getConfig(): IMapObjectConfig {
        return {
            type: undefined,
            id: undefined
        };
    }

    /**
     * It returns a unique type string of the tool.
     */
    public getType(): string {
        return "geovisto-object-abstract";
    }

    /**
     * It returns identifier which is used when no identifier is specified.
     */
    public getId(): string {
        if(!this.idString) {
            this.idString = this.generateId();
        }
        return this.idString;
    }

    /**
     * It returns identifier which is used when no identifier is specified.
     */
    protected generateId(): string {
        if(MapObjectDefaults.id == undefined) {
            MapObjectDefaults.id = 0;
        }
        MapObjectDefaults.id++;
        return this.getType() + "-" + MapObjectDefaults.id;
    }
}
export default MapObjectDefaults;