import { FeatureCollection} from "geojson";

import GeoJSONTypes from "../../types/geodata/GeoJSONTypes";
import HierarchyTree from "./HierarchyTree";
import IGeoData from "../../types/geodata/IGeoData";
import IGeoDataManager from "../../types/geodata/IGeoDataManager";
import IHierarchyManagerInterface from "../../types/geodata/IHierarchyManagerInterface";
import MapDomainArrayManager from "../domain/generic/MapDomainArrayManager";

/**
 * The class provides a basic implemention geographical data manager.
 * 
 * @author Jiri Hynek
 */
class GeoDataManager extends MapDomainArrayManager<IGeoData> implements IGeoDataManager, IHierarchyManagerInterface {
    public constructor(geoDataArray: IGeoData[]) {
        super(geoDataArray);
    }


    /*--- Hierarchy interface ---*/
    private hierarchyEnabledStatus = false;                                  
    private treesMap : Map<string, HierarchyTree> = new Map();

    public enableHierarchy(enabled : boolean) : void{
        this.hierarchyEnabledStatus = enabled;
    }

    public isHierarchyEnabled() : boolean {
        return this.hierarchyEnabledStatus;
    }

    public isHierarchyEnabledForDomain(domainName: string): boolean {
        return this.treesMap.has(domainName);
    }

    public getFeatures(name : string, types : string[]) : FeatureCollection | undefined {
        const geoData = this.getDomain(name);
        const originalGeoData = geoData?.getFeatures(types);
        
        let active : string[] = [];
        const answer: FeatureCollection = {
            type: GeoJSONTypes.FeatureCollection,
            features: []
        };
        
        // Get active objects
        if (this.treesMap.has(name)) {
            active = this.treesMap.get(name)?.getActive() ?? [];
        }

        // Filter original geo-objects.
        originalGeoData?.features.forEach(feat => {
            if (feat.id) {
                if(active.includes(feat.id.toString())) {
                    answer.features.push(feat);
                }
            }
        });
        
        // If hierarchy is disabled, return original geo data
        if (!this.hierarchyEnabledStatus) {
            answer.features = [];
            originalGeoData?.features.forEach(feat => {
                answer.features.push(feat);
            });
        }

        return answer;
    }

    public setTree(domainName : string, nodes : [string, string | boolean, number][], aggregationEnabled : boolean) : void{
        const newTree = new HierarchyTree(domainName);
        newTree.initByArray(nodes);
        newTree.setAggregationFlag(aggregationEnabled);

        this.treesMap.set(domainName, newTree);
    }

    public startTree(domainName : string, zoom : number) : void {
        if (this.treesMap.has(domainName)) {
            this.treesMap.get(domainName)?.startActiveWatch(zoom);
        }
    }

    public updateTrees(zoom : number) : void {
        this.treesMap.forEach(tree => {
            tree.recalculate(zoom);
        });
    }

    public treeAggregationFlag(domainName : string) : boolean {
        if (this.treesMap.has(domainName)) {
            return this.treesMap.get(domainName)?.getAggregationFlag() ?? false;
        }
        return false;
    }

    public getActiveByTree(domainName : string) : string[] {
        let answer : string[] = [];
        if (this.treesMap.has(domainName)) {
            answer = this.treesMap.get(domainName)?.getActive() ?? [];
        }
        return answer;
    }

    public getChildsFromTree(domainName : string, objectID : string) : string[] {
        let answer : string[] = [];
        if (this.treesMap.has(domainName)) {
            answer = this.treesMap.get(domainName)?.getAllLeafes(objectID) ?? [];
        }
        return answer;
    }
}
export default GeoDataManager;