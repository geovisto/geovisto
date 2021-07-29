import ILayerToolDefaults from "../../types/layer/ILayerToolDefaults";
import ILayerToolDimensions from "../../types/layer/ILayerToolDimensions";
import IMap from "../../types/map/IMap";
import MapToolDefaults from "../tool/MapToolDefaults";

/**
 * This class provide functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
class LayerToolDefaults extends MapToolDefaults implements ILayerToolDefaults {

    /**
     * A unique string of the tool type.
     */
    public static TYPE = "geovisto-tool-layer-abstract";

    /**
     * It returns a unique type string of the tool which is based on the layer it wraps.
     */
    public getType(): string {
        return LayerToolDefaults.TYPE;
    }

    /**
     * It returns the layer name.
     */
    public getLayerName(): string {
        return "Abstract layer";
    }

    /**
     * It returns the default layer tool dimensions.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getDimensions(map?: IMap): ILayerToolDimensions {
        return {};
    }
}
export default LayerToolDefaults;