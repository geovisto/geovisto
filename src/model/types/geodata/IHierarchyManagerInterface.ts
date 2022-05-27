import { FeatureCollection } from "geojson";

interface IHierarchyManagerInterface {
    isHierarchyEnabled() : boolean;

    /**
     * Change enabled status of whole hierarchy tool.
     * 
     * @param enabled True if allowed.
     */
    enableHierarchy(enabled : boolean) : void;

    /**
     *  Creates new definition of hierarchy tree.
     * 
     * @param domainName - Name of domain
     * @param nodes - Array of nodes in form : [Id of node, Id of parent (if parent it is boolean set to true), level of zoom]
     * @param aggregationFlag - True if aggregation should be allowed.
     */
    setTree(domainName : string, nodes : [string, string | boolean, number][], aggregationFlag : boolean) : void;

    getFeatures(name : string, types : string[]) : FeatureCollection | undefined 
    
    /**
     * Start's active watch of zoom levels for tree.
     * Used to set initial level of zoom. (Map might render from start on different levels, based on configuration.)
     * 
     * @param domainName - Name of domain.
     * @param zoom - Initial zoom level
     */
    startTree(domainName : string, zoom : number) : void;
    
    /**
     * Update active objects of each tree based on new zoom.
     * 
     * @param zoom - New level of zoom.
     */
    updateTrees(zoom : number) : void;

    /**
     * Returns if hierarchy is enabled and all set up for certain tree.
     * 
     * @param domainName - Name of domain.
     */
    isHierarchyEnabledForDomain(domainName: string): boolean;
    
    /**
     * Returns true, if aggregation of data should be performed on certain tree.
     * 
     * @param name - Name of domain
     */
    treeAggregationFlag(name : string) : boolean;

    /**
     * Get active objects of tree.
     * 
     * @param name - Name of domain.
     */
    getActiveByTree(name : string) : string[];

    /**
     * Get child nodes ID's of parent.
     * 
     * @param name - Name of domain
     * @param geoOb - ID of parent
     */
    getChildsFromTree(name : string, geoOb : string) : string[];
}
export default IHierarchyManagerInterface;