import ILayerTool from "../../layer/ILayerTool";
import IMapChangeEvent from "../IMapChangeEvent";

/**
 * This type declares layer tool dimension changed event.
 * 
 * @author Jiri Hynek
 */
type ILayerToolDimensionChangedEvent = IMapChangeEvent<ILayerTool>;
export default ILayerToolDimensionChangedEvent;
