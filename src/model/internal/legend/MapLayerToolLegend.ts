import ILayerTool from "../../types/layer/ILayerTool";
import IMapTool from "../../types/tool/IMapTool";
import MapObjectLegend from "./MapObjectLegend";

/**
 * The interface declares functions for management of legends.
 * 
 * @author Tomas Koscielniak
 */
abstract class MapLayerToolLegend<T extends ILayerTool> extends MapObjectLegend<T> {

    public constructor(layerTool: T) {
        super(layerTool);
    }

    /**
     * It returns a HTML div element conatining the legends.
     */
    public abstract getContent(tool: IMapTool): HTMLElement | undefined;
}
export default MapLayerToolLegend;