import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// TODO - move to index.ts
import '../../../styles/common.scss';

import IDataChangeAnimateOptions from '../../types/event/data/IDataChangeAnimateOptions';
import IMap from '../../types/map/IMap';
import IMapToolAPI from '../../types/api/IMapToolAPI';
import IMapConfigManager from '../../types/config/IMapConfigManager';
import IMapDataManager from '../../types/data/IMapDataManager';
import IMapDefaults from '../../types/map/IMapDefaults';
import IMapObject from '../../types/object/IMapObject';
import { IMapProps, IMapInitProps } from '../../types/map/IMapProps';
import IMapState from '../../types/map/IMapState';
import IMapTool from '../../types/tool/IMapTool';
import IMapToolConfig from '../../types/tool/IMapToolConfig';
import IMapToolsManager from '../../types/tool/IMapToolsManager';
import IMapData from '../../types/data/IMapData';
import IMapToolAPIGetter from '../../types/api/IMapToolAPIGetter';
import DataChangeEvent from '../event/data/DataChangeEvent';
import DataManagerChangeEvent from '../event/data/DataManagerChangeEvent';
import GeovistoMapDefaults from './GeovistoMapDefaults';
import GeovistoMapState from './GeovistoMapState';
import MapObject from '../object/MapObject';

/**
 * Representation of map wrapper which handles map layers, sidebar and other tools
 * 
 * @author Jiri Hynek
 */
class GeovistoMap extends MapObject implements IMap {

    /**
     * Initializes object.
     * 
     * @param props 
     */
    public constructor(props: IMapProps) {
        super(props);
    }

    /**
     * Help function which returns the props given by the programmer.
     */
    public getProps(): IMapProps {
        return <IMapProps> super.getProps();
    }

    /**
     * It returns object defaults as the map defaults.
     */
    public getDefaults(): IMapDefaults {
        return <IMapDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the object.
     */
    public createDefaults(): IMapDefaults {
        return new GeovistoMapDefaults();
    }

    /**
     * It returns object state as the map state.
     */
    public getState(): IMapState {
        return <IMapState> super.getState();
    }

    /**
     * It creates new state if the object.
     */
    public createState(): IMapState {
        return new GeovistoMapState(this);
    }

    /**
     * The function draws a new map.
     */
    public draw(configManager: IMapConfigManager): HTMLElement | null {
        // initialize map and tools
        this.initialize({ config: configManager.getMapConfig(), configManager: configManager});

        // render map and tools
        return this.create();
    }

    /**
     * This function redraws the current map.
     */
    public redraw(configManager: IMapConfigManager, props?: IMapProps): HTMLElement | null {
        // get map and remove map children
        let mapContainer: HTMLElement | null = document.getElementById(this.getState().getId());
        if(mapContainer && mapContainer.children.length > 0) {
            // remove old elements
            mapContainer.children[0].remove();

            if(props) {
                this.setProps(props);
            }

            // initialize map and tools
            this.initialize({ config: configManager.getMapConfig(), configManager: configManager});

            // render map and tools
            mapContainer = this.create();
        }
        return mapContainer;
    }
  
    /**
     * It resets the state to the initial state.
     * 
     * @param initProps 
     */
    public initialize(initProps: IMapInitProps): this {
        // init the map state
        this.getState().initialize(this.getDefaults(), this.getProps(), initProps);

        // initialize existing tools
        const toolsManager: IMapToolsManager = this.getState().getTools();
        if(!toolsManager.isEmpty()) {
            // a) tool is already created, initialize them and try to find their config
            const tools: IMapTool[] = toolsManager.getAll();
            for(let i = 0; i < tools.length; i++) {
                // initialize tool (provide map and config)
                tools[i].initialize({ config: initProps.configManager.getToolConfig(tools[i].getId()), map: this });
                // register API if available
                this.registerToolAPI(tools[i]);
            }
        }
        
        // deserialize remaining tools with respect to the config
        const toolsConfigs: IMapToolConfig[] | undefined = initProps.configManager.getToolsConfigs();
        if(toolsConfigs != undefined) {
            const toolTemplatesManager: IMapToolsManager = this.getState().getToolTemplates();
            let tool: IMapTool | undefined;
            let toolConfig: IMapToolConfig;
            for(let i = 0; i < toolsConfigs.length; i++) {
                toolConfig = toolsConfigs[i];

                // filter already initialized tools
                if(toolConfig.id) {
                    tool = <IMapTool> toolsManager.getById(toolConfig.id);
                    if(tool) {
                        continue;
                    }
                }

                // b) tool has not been created yet, use config and tool template to create the tool
                if(toolConfig.type) {
                    const toolTemplates: IMapTool[] = <IMapTool[]> toolTemplatesManager.getByType(toolConfig.type);
                    if(toolTemplates.length > 0) {
                        // filter singleton duplicates
                        if(toolTemplates[0].isSingleton() && toolsManager.getByType(toolConfig.type).length > 0) {
                            continue;
                        }
                        // create copy of the tool template
                        tool = toolTemplates[0].copy();
                        // initialize tool
                        tool.initialize({ config: toolConfig, map: this });
                        // register API if available
                        this.registerToolAPI(tool);
                        // add to the list of tools
                        toolsManager.add(tool);
                    }
                }

                // if there is no template, the tool config is ignored
            }
        }
        
        return this;
    }

    /**
     * Help function which register a generic tool API.
     * 
     * @param tool
     */
    protected registerToolAPI(tool: IMapTool): IMapToolAPI | null {
        const apiGetter: IMapToolAPIGetter | undefined = tool.getAPIGetter();
        if(apiGetter) {
            const api = this.getState().getToolsAPI();
            for(const method in apiGetter) {
                if(!api[method]) {
                    api[method] = apiGetter[method];
                }
            }
        }
        return null;
    }

    /**
     * It exports the serialized representation of the current state of the map.
     */
    public export(): Record<string, unknown> {
        return this.getState().getMapConfig().export(this.getState().serialize(this.getDefaults()));
    }

    /**
     * This function creates Geovisto map - it creates map container, leaflet map and tools.
     */
    protected create(): HTMLElement | null {
        const mapContainer: HTMLElement | null = this.createMapContainer();

        // create new map container (DOM element)
        if(mapContainer) {
            // create Leaflet map
            if(this.createMap()) {
                // create tools
                this.createTools();
            }
        }

        return mapContainer;
    }

    /**
     * This function creates the map container.
     */
    protected createMapContainer(): HTMLElement | null {
        const mapContainer: HTMLElement | null = document.getElementById(this.getState().getId());
        if(mapContainer) {
            const mapElement = mapContainer.appendChild(document.createElement("div"));
            mapElement.setAttribute("id", this.getContainerId());
            mapElement.setAttribute("class", this.getContainerClass());
        }
        
        return mapContainer;
    }

    /**
     * It returns ID of the map container.
     */
    protected getContainerId(): string {
        return this.getId() + "-container";
    }

    /**
     * It returns class of the map container.
     */
    protected getContainerClass(): string {
        return this.getType() + "-container";
    }

    /**
     * Creates the leaflet-based map with respect to the configuration.
     */
    protected createMap(): L.Map {
        const state: IMapState = this.getState();
        const map: L.Map = L
        .map(this.getContainerId(), { ...state.getInitialMapStructure() })
        .setView(
            state.getInitialMapCenter(),
            state.getInitialZoom()
        );

        // add attribution
        map.attributionControl.addAttribution(this.getMapAttribution());

        this.getState().setLeafletMap(map);

        return map;
    }

    /**
     * It returns the map attribution.
     * 
     * This function can be overriden;
     */
    protected getMapAttribution(): string {
        return 'Geovisto | VUT FIT Brno';
    }

    /**
     * This function creates map tools.
     */
    protected createTools(): IMapTool[] {
        // create tools
        const tools: IMapTool[] = this.getState().getTools().getAll();
        for(let i = 0; i < tools.length; i++) {
            // create tool
            tools[i].create();
        }
        return tools;
    }

    /**
     * It updates data and invokes notifies listeners.
     * 
     * @param data
     */
    public updateData(data: IMapDataManager): void {
        // create and dispatch event
        this.getState().getEventManager().scheduleEvent(
            new DataManagerChangeEvent(this, data),
            () => {
                this.getState().setMapData(data);
            }, // update data in map state (it updates the current data as well)
            undefined
        );
    }

    /**
     * It updates current data and invokes notifies listeners.
     * 
     * @param data
     * @param source of the change
     * @param animateOptions
     */
    public updateCurrentData(data: IMapData, source: IMapObject, animateOptions?: IDataChangeAnimateOptions): void {
        // create and dispatch event
        this.getState().getEventManager().scheduleEvent(
            new DataChangeEvent(source, data, animateOptions),
            () => { this.getState().setCurrentData(data); }, // update current data in map state
            undefined
        );
    }
}
export default GeovistoMap;
