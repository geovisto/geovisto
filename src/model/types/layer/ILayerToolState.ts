import { ILayerToolConfig, ILayerToolDimensionsConfig } from "./ILayerToolConfig";
import ILayerToolDimensions from "./ILayerToolDimensions";
import ILayerToolDefaults from "./ILayerToolDefaults";
import ILayerToolProps from "./ILayerToolProps";
import IMapToolState from "../tool/IMapToolState";

/**
 * This interface declares functions for using the state of the layer tool.
 * 
 * @author Jiri Hynek
 */
interface ILayerToolState<
    TProps extends ILayerToolProps = ILayerToolProps,
    TDefaults extends ILayerToolDefaults = ILayerToolDefaults,
    TConfig extends ILayerToolConfig = ILayerToolConfig,
    TDimensionsConfig extends ILayerToolDimensionsConfig = ILayerToolDimensionsConfig,
    TDimensions extends ILayerToolDimensions = ILayerToolDimensions
> extends IMapToolState<TProps, TDefaults, TConfig> {

    /**
     * It sets the marker layer dimensions property of tool state.
     * 
     * @param dimensionsConfig
     */
    deserializeDimensions(dimensionsConfig: TDimensionsConfig): void;

    /**
     * It returns the layer dimensions property of the tool state.
     */
    getDimensions(): TDimensions;

    /**
     * It sets the layer dimensions property of tool state.
     * 
     * @param dimensions 
     */
    setDimensions(dimensions: TDimensions): void;

    /**
     * It returns the layer name property of the tool state.
     */
    getLayerName(): string;

    /**
     * It sets the layer name property of the tool state.
     * 
     * @param layerName 
     */
    setLayerName(layerName: string): void;

    /**
     * It returns the layer items property of the tool state.
     */
    getLayerItems(): L.Layer[] | undefined;

    /**
     * It sets the layer items property of tool state.
     * 
     * @param layerItems 
     */
    setLayerItems(layerItems: L.Layer[]): void;
}
export default ILayerToolState;