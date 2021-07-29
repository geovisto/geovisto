/**
 * This type provides specification of the map tiles model.
 * 
 * @author Jiri Hynek
 */
type IMapTilesModel = {
    url: string;
    attribution?: string;
    subdomains?: string[];
    maxZoom?: number;
    maxNativeZoom?: number,
}
export default IMapTilesModel;