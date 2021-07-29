import {
    FeatureCollection
} from 'geojson';

import IMapDomain from "../domain/IMapDomain";

/**
 * The interface declares functions for management of geographical data.
 * 
 * @author Jiri Hynek
 */
interface IGeoData extends IMapDomain {

    /**
     * It returns the original source of geographical data.
     */
    getOriginalGeoData(): unknown;

    /**
     * It returns the original representation of data domain.
     */
    getGeoJSON(): FeatureCollection;

    /**
     * It returns the array of features of specific type.
     * 
     * @param type 
     */
    getFeatures(type: string[]): FeatureCollection;
}
export default IGeoData;