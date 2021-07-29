import IMapObject from "../../types/object/IMapObject";

/**
 * The interface declares functions for management of form inputs.
 * 
 * @author Jiri Hynek
 */
abstract class MapObjectForm<T extends IMapObject> {
    
    private mapObject: T;

    public constructor(mapObject: T) {
        this.mapObject = mapObject;
    }

    protected getMapObject(): T {
        return this.mapObject;
    }

    /**
     * It returns a HTML div element conatining the form.
     */
    abstract getContent(): HTMLDivElement;
}
export default MapObjectForm;