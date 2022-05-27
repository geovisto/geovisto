/**
 * Type representing one geo object / one node in hierarchy tree.
 */
type HierarchyTreeNode = {
    nodeID : string,
    childsID : string[],
    zoomLevel : number,
    isParent : boolean
}

/**
 * Class representing definition of hierarchy for one domain of geographical objects.
 * Used as intermediary between hierarchy tool and map layers, present only in GeoDataManager object.
 * 
 * @author Vojtěch Malý
 */
class HierarchyTree {
    public name : string;                               // Name of tree and asosciated domain.
    private Tree : Map <string, HierarchyTreeNode> = new Map();     // Hierarchy Tree data.
    private zoomLevels : number[] = [];                 // Sorted array of number's representing all zoom levels in which active objects change.
    private active : string[] = [];                     // Array of acitve nodeID's objects. 
    private roots : string[] = [];
    private changeFlag = false;
    private aggregationFlag : boolean;

    public constructor(name : string, aggregationFlag = false) {
        this.name = name;
        this.aggregationFlag = aggregationFlag;
    }

    /**
     * Creates new node in tree
     * 
     * @param nodeID                    nodeID of node
     * @param parentID              nodeID of parent
     * @param zoomLevel             Zoom level where node gets active
     */
    private initByNode(nodeID : string, zoomLevel : number) : void {
        this.Tree.set(nodeID, {
            nodeID : nodeID,
            childsID : [],
            zoomLevel : zoomLevel,
            isParent : false
        });
        this.updateZoomLevels(zoomLevel);
    }

    /**
     * Creates new root node. There may be more than one root node, 
     * but they must not have any more parents.
     * 
     * @param nodeID 
     * @param zoomLevel 
     */
    private initByRoot(nodeID : string, zoomLevel : number) : void {
        this.Tree.set(nodeID, {
            nodeID : nodeID,
            childsID : [],
            zoomLevel : zoomLevel,
            isParent : true
        });

        this.updateZoomLevels(zoomLevel);
        this.roots.push(nodeID);
    }

    /**
     * Creates tree structure from [nodeID, ParentID, Zoomlevel] array.
     * 
     * @param nodes - Array of nodes. *There is no need for particular order.
     */
    public initByArray(nodes : [string, string | boolean, number][]) : void {
        const unresolved : Map<string, string[]> = new Map();                   // Map of unresolved nodes. (Node has parent, that is not yet inicialized.)
                
        nodes.forEach(node => {
            if (typeof node[1] === "boolean") {                                 // Root inicialization.
                this.initByRoot(node[0], node[2]);
                if (unresolved.has(node[0])) {                                  // Resolving possible unresolved childs
                    const arrayOfChilds = unresolved.get(node[0]) ?? [];
                    arrayOfChilds.forEach(child => {
                        this.Tree.get(node[0])?.childsID.push(child);
                    });
                    unresolved.delete(node[0]);
                }
            } else {                                                            // Node init
                if (this.Tree.has(node[1])) {                                   // Parent is already in Tree
                    //this.Tree.get(node[1])?.addChild(node[0]);
                    this.Tree.get(node[1])?.childsID.push(node[0]);
                } else {                                                        // Parent is not in tree yet.
                    const temp = unresolved.get(node[1]) ?? [];
                    temp.push(node[0]);
                    unresolved.set(node[1], temp);
                }
            
                this.initByNode(node[0], node[2]);                              // Create node        
                
                if (unresolved.has(node[0])) {                                  // Resolving unresolved childs
                    const arrayOfChilds = unresolved.get(node[0]) ?? [];
                    arrayOfChilds.forEach(child => {
                        this.Tree.get(node[0])?.childsID.push(child);
                    });
                    unresolved.delete(node[0]);
                }
            }
        });  
    }

    /**
     * Initialize first zoom level.
     * 
     * @param zoom 
     */
    public startActiveWatch(zoom : number) : void {
        this.active = this.getActiveByZoom(zoom);
    }


    /**
     * Update Zoom Levels array
     * 
     * @param zoomLevel 
     */
    private updateZoomLevels(zoomLevel : number): void {
        if(! this.zoomLevels.includes(zoomLevel)) {
            this.zoomLevels.push(zoomLevel);
            this.zoomLevels.sort();
        }
    }

    /**
     * Returns nodeID array of geoobjects visible in that particular zoom.
     * 
     * @param zoom 
     * @returns 
     */
    public getActiveByZoom(zoom : number) : string[] {
        const resolverArray : string[] = [];
        this.roots.forEach(value => {resolverArray.push(value);});
        let answer : string[] = [];

        while(resolverArray.length > 0) {
            const resolved = resolverArray.pop();
            if (!resolved) {
                continue;
            }
            const node = this.Tree.get(resolved) ?? undefined;
            if(node) {
                if (node.zoomLevel >= zoom) {
                    answer.push(node.nodeID);
                } else {
                    if (node.childsID.length < 1) {             // Does not have any childs, is active even under his active zoom.
                        answer.push(node.nodeID);
                    } else {
                        node.childsID.forEach(child => {
                            resolverArray.push(child);
                        });
                    }
                }
            }
        }

        // If empty, return parents beacause nothing in tree changed.
        if (answer.length == 0) {
            answer = this.roots;
        }

        return answer;
    }

    /**
     * Returns all lowest chidls of that object.
     * 
     * @param root - nodeID of node in tree.
     * @returns - Array of lowest ids. 
     */
    public getAllLeafes(root : string) : string[] {
        const answer : string[] = [];
        const reslover : string[] = [];
        reslover.push(root);

        while (reslover.length > 0) {
            const resolving = reslover.pop();

            if (resolving) {
                if (this.Tree.has(resolving)) {
                    const node = this.Tree.get(resolving);
                    const length = node?.childsID.length ?? 0;
                    if (length > 0) {
                        node?.childsID.forEach(child => {
                            reslover.push(child);
                        });
                    } else {
                        answer.push(resolving);
                    }
                }
            }
        }
        return answer;
    }

    /**
     * Recalculates visible objects. 
     * If there was change, sets change flag to true until next recalculation.
     * 
     * @param newZoom 
     * @returns 
     */
    public recalculate(newZoom : number) : boolean {
        if (this.changeFlag) {
            this.changeFlag = false;
        }

        const newActive = this.getActiveByZoom(newZoom).sort();
        const oldActive = this.active.sort();
        let flag = false;
    
        // Length check
        if (newActive.length != oldActive.length) {
            flag = true;
        } else {
            for (let cnt = 0; cnt < newActive.length; cnt++) {
                if (newActive[cnt] != oldActive[cnt]) {
                    flag = true;
                    break;   
                }
            }
        }

        if (flag) {
            this.changeFlag = true;
            this.active = newActive;
        }
        return this.changeFlag;
    }

    /**
     * @returns Change flag
     */
    public getChangeFlag() : boolean {
        return this.changeFlag;
    }

    /**
     * @returns Active objects of tree
     */
    public getActive() : string[] {
        return this.active;
    }

    /**
     * @returns Aggregation flag status
     */
    public getAggregationFlag() : boolean {
        return this.aggregationFlag;
    }

    /**
     * Sets aggregration flag
     * @param flag True if enabled
     */
    public setAggregationFlag(flag : boolean) : void {
        this.aggregationFlag = flag;
    }
}

export default HierarchyTree;
