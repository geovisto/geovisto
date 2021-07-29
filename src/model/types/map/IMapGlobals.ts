/**
 * This interface provides specification of map global constants model.
 * 
 * @author Jiri Hynek
 */
interface IMapGlobals {
    zoom: number,
    mapCenter: { lat: number, lng: number },
    mapStructure: { maxZoom: number, maxBounds: [[ number,number ],[ number,number ]] }
}
export default IMapGlobals;