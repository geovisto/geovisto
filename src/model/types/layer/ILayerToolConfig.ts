import IMapToolConfig from "../tool/IMapToolConfig";

/**
 * This type provides specification of the layer tool config model.
 * 
 * @author Jiri Hynek
 */
type ILayerToolConfig = IMapToolConfig & {
    name?: string;
    data?: ILayerToolDimensionsConfig;
}

/**
 * This type provides specification of the layer tool dimensions config model.
 * 
 * @author Jiri Hynek
 */
type ILayerToolDimensionsConfig = {
}
export type { ILayerToolConfig, ILayerToolDimensionsConfig };