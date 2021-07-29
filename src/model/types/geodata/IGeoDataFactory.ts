import IGeoData from "./IGeoData";

/**
 * This interface declares a factory for geographical data objects.
 * 
 * @author Jiri Hynek
 */
interface IGeoDataFactory {
    
    /**
     * It creates the GeoJSON geographical data object.
     */
    geojson(name: string, data: unknown): IGeoData;
}
export default IGeoDataFactory;