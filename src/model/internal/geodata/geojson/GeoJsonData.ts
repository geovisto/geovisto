
import IGeoData from '../../../types/geodata/IGeoData';
import GeoJSONTypes from '../../../types/geodata/GeoJSONTypes';
import { FeatureCollection } from 'geojson';
import MapDomain from '../../domain/generic/MapDomain';

/**
 * The interface declares function for management of geographical data.
 * 
 * @author Jiri Hynek
 */
class GeoJsonData extends MapDomain implements IGeoData {
    
    private originalData: unknown;
    private geoJSON?: FeatureCollection;

    public constructor(name: string, originalData: unknown) {
        super(name);
        this.originalData = originalData;
    }

    /**
     * It returns the original source of geographical data.
     */
    public getOriginalGeoData(): unknown {
        return this.originalData;
    }

    /**
     * It returns the original representation of data domain.
     */
    public getGeoJSON(): FeatureCollection {
        if(!this.geoJSON) {
            this.geoJSON = this.validateData(this.originalData);
        }
        return this.geoJSON;
    }

    /**
     * It returns the array of features of specific type.
     * 
     * @param types 
     */
    public getFeatures(types: string[]): FeatureCollection {
        const featureCollection: FeatureCollection = {
            type: GeoJSONTypes.FeatureCollection,
            features: []
        };

        const geoJSON = this.getGeoJSON();
        for(const f of geoJSON.features) {
            if(f.geometry && types.includes(f.geometry.type)) {
                featureCollection.features.push(f);
            }
        }

        return featureCollection;
    }

    /**
     * It transforms original data to a feature collection in the GeoJSON format.
     * 
     * @param originalData 
     * @returns GeoJSON feature collection
     */
    protected validateData(originalData: unknown): FeatureCollection {
        // TODO: provide validation and transformation
        return originalData as FeatureCollection;
    }
}
export default GeoJsonData;