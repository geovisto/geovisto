import IGeoData from "../../types/geodata/IGeoData";
import IGeoDataFactory from "../../types/geodata/IGeoDataFactory";
import GeoJsonData from "./geojson/GeoJsonData";

/**
 * This interface declares a factory for geographical data objects.
 * 
 * @author Jiri Hynek
 */
class GeoDataFactory implements IGeoDataFactory {
    
    /**
     * It creates the GeoJSON geographical data object.
     */
    public geojson(name: string, data: unknown): IGeoData {
        return new GeoJsonData(name, data);
    }
}
export default GeoDataFactory;