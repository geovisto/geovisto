import { IMapToolProps } from "../tool/IMapToolProps";

/**
 * This type provides specification of the layer tool props model.
 * 
 * @author Jiri Hynek
 */
type ILayerToolProps = IMapToolProps & {
    name?: string;
}
export default ILayerToolProps;