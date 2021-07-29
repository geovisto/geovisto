/**
 * This enum defines GeoJSON object types.
 * 
 * @author Jiri Hynek
 */
enum GeoJSONTypes {
    Point = "Point",
    MultiPoint = "MultiPoint",
    LineString = "LineString",
    MultiLineString = "MultiLineString",
    Polygon = "Polygon",
    MultiPolygon = "MultiPolygon",
    GeometryCollection = "GeometryCollection",
    Feature = "Feature",
    FeatureCollection = "FeatureCollection"
}
export default GeoJSONTypes;