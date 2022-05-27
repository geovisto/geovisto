import IMapTool from "../tool/IMapTool";

/**
 * The interface declares functions for management of legends.
 * 
 * @author Tomas Koscielniak
 */
interface IMapLegend {

    /**
     * It returns a HTML div element conatining the legends.
     */
    getContent(tool: IMapTool): HTMLElement | undefined;
}
export default IMapLegend;