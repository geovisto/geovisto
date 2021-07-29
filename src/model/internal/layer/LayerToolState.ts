import ILayerToolState from "../../types/layer/ILayerToolState";
import ILayerTool from "../../types/layer/ILayerTool";
import { ILayerToolConfig, ILayerToolDimensionsConfig } from "../../types/layer/ILayerToolConfig";
import ILayerToolDefaults from "../../types/layer/ILayerToolDefaults";
import ILayerToolDimensions from "../../types/layer/ILayerToolDimensions";
import { IMapToolInitProps } from "../../types/tool/IMapToolProps";
import ILayerToolProps from "../../types/layer/ILayerToolProps";
import MapToolState from "../tool/MapToolState";

/**
 * This class provide functions for using the state of the layer tool.
 * 
 * @author Jiri Hynek
 */
class LayerToolState extends MapToolState implements ILayerToolState {
    
    private layerName!: string;
    private dimensions!: ILayerToolDimensions;
    private layerItems?: L.Layer[];

    /**
     * It creates a tool state.
     */
    public constructor(tool: ILayerTool) {
        super(tool);
    }

    /**
     * It resets the state with respect to the initial props.
     * 
     * @param defaults 
     * @param props 
     * @param initProps 
     */
    public initialize(defaults: ILayerToolDefaults, props: ILayerToolProps, initProps: IMapToolInitProps): void {
        // the layer tool properties
        this.setLayerName(props.name == undefined ? defaults.getLayerName() : props.name);
        this.setDimensions(defaults.getDimensions(initProps.map));

        // set super props
        super.initialize(defaults, props, initProps);
    }

    /**
     * The metod takes config and deserializes the values.
     * 
     * @param config 
     */
    public deserialize(config: ILayerToolConfig): void {
        super.deserialize(config);

        // the layer tool config
        if(config.name != undefined) this.setLayerName(config.name);
        
        // the layer tool config
        if(config.data != undefined) {
            this.deserializeDimensions(config.data);
        }
    }

    /**
     * It sets the marker layer dimensions property of tool state.
     * 
     * @param dimensionsConfig
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public deserializeDimensions(dimensionsConfig: ILayerToolDimensionsConfig): void {
        return;
    }

    /**
     * The method serializes the tool state. Optionally, defaults can be set if property is undefined.
     * 
     * @param defaults
     */
    public serialize(defaults: ILayerToolDefaults | undefined): ILayerToolConfig {
        const config: ILayerToolConfig = <ILayerToolConfig> super.serialize(defaults);

        // serialize the layer tool properties
        config.name = defaults && this.getLayerName() == defaults.getLayerName() ? undefined : this.getLayerName();

        return config;
    }

    /**
     * It returns the layer name property of the tool state.
     */
    public getLayerName(): string {
        return this.layerName;
    }

    /**
     * It sets the layer name property of the tool state.
     * 
     * @param layerName 
     */
    public setLayerName(layerName: string): void {
       this.layerName = layerName;
    }

    /**
     * It returns the layer items property of the tool state.
     */
    public getLayerItems(): L.Layer[] | undefined {
        return this.layerItems;
    }

    /**
     * It sets the layer items property of tool state.
     * 
     * @param layerItems 
     */
    public setLayerItems(layerItems: L.Layer[]): void {
       this.layerItems = layerItems;
    }

    /**
     * It returns the map layer dimensions property of the tool state.
     */
    public getDimensions(): ILayerToolDimensions {
        return this.dimensions;
    }

    /**
     * It sets the map layer dimensions property of tool state.
     * 
     * @param dimensions 
     */
    public setDimensions(dimensions: ILayerToolDimensions): void {
       this.dimensions = dimensions;
    }
}
export default LayerToolState;