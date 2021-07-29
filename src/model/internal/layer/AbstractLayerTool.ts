import IDataChangeAnimateOptions from "../../types/event/data/IDataChangeAnimateOptions";
import ILayerTool from "../../types/layer/ILayerTool";
import { ILayerToolConfig } from "../../types/layer/ILayerToolConfig";
import { IMapToolInitProps } from "../../types/tool/IMapToolProps";
import ILayerToolProps from "../../types/layer/ILayerToolProps";
import ILayerToolDefaults from "../../types/layer/ILayerToolDefaults";
import ILayerToolState from "../../types/layer/ILayerToolState";
import IMapDimension from "../../types/dimension/IMapDimension";
import LayerToolDefaults from "./LayerToolDefaults";
import LayerToolRenderType from "../../types/layer/LayerToolRenderType";
import LayerToolState from "./LayerToolState";
import MapTool from "../tool/MapTool";

/**
 * This class wraps filter tool. It provides methods for layer management.
 * 
 * @author Jiri Hynek
 */
abstract class AbstractLayerTool extends MapTool implements ILayerTool {

    /**
     * It creates a new tool with respect to the props.
     * 
     * @param props 
     */
    public constructor(props?: ILayerToolProps) {
        super(props);
    }

    /**
     * It creates a copy of the uninitialized layer tool.
     */
    public abstract copy(): ILayerTool;

    /**
     * Help function which returns the props given by the programmer.
     */
    public getProps(): ILayerToolProps {
        return <ILayerToolProps> super.getProps();
    }

    /**
     * It returns default values of the state properties.
     */
    public getDefaults(): ILayerToolDefaults {
        return <ILayerToolDefaults> super.getDefaults();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createDefaults(): ILayerToolDefaults {
        return new LayerToolDefaults();
    }

    /**
     * It returns the layer tool state.
     */
    public getState(): ILayerToolState {
        return <ILayerToolState> super.getState();
    }

    /**
     * It creates new defaults of the layer tool.
     */
    protected createState(): ILayerToolState {
        return new LayerToolState(this);
    }

    /**
     * It initializes the state of the layer tool.
     * It processes the serialized config and sets further objects.
     * 
     * This cannot be done in the object constructor
     * since the object can be created before the Geovisto map is created.
     * 
     * @param initProps
     */
    public initialize(initProps: IMapToolInitProps<ILayerToolConfig>): this {
        return super.initialize(initProps);
    }

    /**
     * It creates new layer with respect to configuration
     */
    public create(): this {
        if(this.isEnabled()) {
            this.showLayerItems();
        }

        return this;
    }

    /**
     * It changes layer state to enabled/disabled.
     * 
     * @param enabled
     */
    public setEnabled(enabled: boolean): void {
        if(enabled != this.isEnabled()) {
            // update state
            this.getState().setEnabled(enabled);

            // show ot hide the layer
            if(enabled) {
                this.showLayerItems();
            } else {
                this.hideLayerItems();
            }
        }
    }

    /**
     * Help function which shows layer items.
     * 
     * This function is meant to be private.
     */
    protected showLayerItems(): void {
        const leafletMap = this.getMap()?.getState().getLeafletMap();
        if(leafletMap) {
            // get/create items
            const layerItems = this.getLayerItems();

            // render/remove items
            for(let j = 0; j < layerItems.length; j++) {
                layerItems[j].addTo(leafletMap);
            }

            // render data
            this.render(LayerToolRenderType.DATA);
        }
    }

    /**
     * Help function which hides layer items
     * 
     * This function is meant to be private.
     */
    protected hideLayerItems(): void {
        const leafletMap = this.getMap()?.getState().getLeafletMap();

        // render/remove items
        if(leafletMap) {
            // get/create items
            const layerItems = this.getLayerItems();
            for(let j = 0; j < layerItems.length; j++) {
                leafletMap.removeLayer(layerItems[j]);
            }
        }
    }

    /**
     * It returns layer items which should be rendered.
     */
    public getLayerItems(): L.Layer[] {
        let layerItems = this.getState().getLayerItems();
        if(layerItems == undefined) {
            layerItems = this.createLayerItems();

            // update state
            this.getState().setLayerItems(layerItems);
        }
        return layerItems;
    }

    /**
     * It creates layer items.
     * 
     * Override this function.
     */
    protected abstract createLayerItems(): L.Layer[];

    /**
     * It reloads data and redraw the layer with respect to the type.
     * 
     * By default it works with LayerRedrawType
     * 
     * @param type 
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(type: number, animateOptions?: IDataChangeAnimateOptions): void {
        return;
    }

    /**
     * It updates the dimension.
     * 
     * @param dimension 
     * @param value 
     * @param renderType
     */
    public updateDimension(dimension: IMapDimension<unknown>, value: string, renderType: number | undefined = undefined): void {
        // get selected values and update layer tool's dimension
        const domain: unknown | undefined = dimension.findValue(value);
        if(dimension.getValue() !== domain) {
            dimension.setStringValue(value);
        
            if(renderType != undefined) {
                this.render(renderType);
            }
        }
    }
}
export default AbstractLayerTool;