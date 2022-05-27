import ILayerTool from "../../layer/ILayerTool";
import IMapChangeEvent from "../IMapChangeEvent";

/**
 * This type declares layer tool rendered event.
 * 
 * @author Jiri Hynek
 */
type ILayerToolRenderedEvent = IMapChangeEvent<number, ILayerTool>;
export default ILayerToolRenderedEvent;
