import IMapObject from "../../types/object/IMapObject";
import IMapTool from "../../types/tool/IMapTool";

/**
 * The interface declares functions for management of legends.
 * 
 * @author Tomas Koscielniak
 */
abstract class MapObjectLegend<T extends IMapObject> {
    
    private mapObject: T;

    public constructor(mapObject: T) {
        this.mapObject = mapObject;
    }

    protected getMapObject(): T {
        return this.mapObject;
    }

    /**
     * It returns a HTML div element conatining the legend.
     */
    abstract getContent(tool: IMapTool): HTMLElement | undefined;
}
export default MapObjectLegend;