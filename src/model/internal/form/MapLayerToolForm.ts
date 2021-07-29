import IMapFormInput from "../../types/inputs/IMapFormInput";
import IMapDomainDimension from "../../types/dimension/IMapDomainDimension";
import IMapDomain from "../../types/domain/IMapDomain";
import IMapTypeDimension from "../../types/dimension/IMapTypeDimension";
import ILayerTool from "../../types/layer/ILayerTool";
import ILayerToolDimensions from "../../types/layer/ILayerToolDimensions";
import LabeledAutocompleteFormInput from "../inputs/labeled/autocomplete/LabeledAutocompleteFormInput";
import LabeledCheckboxFormInput from "../inputs/labeled/checkbox/LabeledCheckboxFormInput";
import LabeledColorFormInput from "../inputs/labeled/color/LabeledColorFormInput";
import LabeledSliderFormInput from "../inputs/labeled/slider/LabeledSliderFormInput";
import LabeledTextFormInput from "../inputs/labeled/text/LabeledTextFormInput";
import MapObjectForm from "./MapObjectForm";
import IIntegerRangeManager from "../../types/type/IIntegerRangeManager";

/**
 * The interface declares functions for management of form inputs.
 * 
 * @author Jiri Hynek
 */
abstract class MapLayerToolForm<T extends ILayerTool> extends MapObjectForm<T> {

    public constructor(layerTool: T) {
        super(layerTool);
    }

    /**
     * It returns a HTML div element conatining the form.
     */
    public abstract getContent(): HTMLDivElement;

    /**
     * It updates selected input values according to the given dimensions.
     * 
     * @param dimensions 
     */
    public abstract setInputValues(dimensions: ILayerToolDimensions): void;

    /**
     * Help method which returns a new universal autocomplete input for the any map domain dimension.
     * 
     * @param dimension
     */
    protected getAutocompleteInput(dimension: IMapDomainDimension<IMapDomain>, formAction?: (ev: Event) => void): IMapFormInput {
        return new LabeledAutocompleteFormInput({
            label: dimension.getName(),
            options: dimension.getDomainManager().getDomainNames(),
            onChangeAction: (ev: Event) => {
                this.getMapObject().updateDimension(dimension, (<HTMLInputElement> ev.target).value, undefined);
                if(formAction) {
                    formAction(ev);
                }
            }
        });
    }

    /**
     * Help method which returns a new universal checkbox input for the any map boolean dimension.
     * 
     * @param dimension
     */
    protected getCheckboxInput(dimension: IMapTypeDimension<boolean>, formAction?: (ev: Event) => void): IMapFormInput {
        return new LabeledCheckboxFormInput({
            label: dimension.getName(),
            name: dimension.getName(),
            onChangeAction: (ev: Event) => {
                this.getMapObject().updateDimension(dimension, new String((<HTMLInputElement> ev.target).checked).toString(), undefined);
                if(formAction) {
                    formAction(ev);
                }
            }
        });
    }

    /**
     * Help method which returns a new universal color input for the any map string dimension.
     * 
     * @param dimension
     */
    protected getColorInput(dimension: IMapTypeDimension<string>, formAction?: (ev: Event) => void): IMapFormInput {
        return new LabeledColorFormInput({
            label: dimension.getName(),
            onChangeAction: (ev: Event) => {
                this.getMapObject().updateDimension(dimension, (<HTMLInputElement> ev.target).value, undefined);
                if(formAction) {
                    formAction(ev);
                }
            }
        });
    }

    /**
     * Help method which returns a new universal slider input for the any map range integer dimension.
     * 
     * @param dimension
     */
    protected getSliderInput(dimension: IMapTypeDimension<number, IIntegerRangeManager>, formAction?: (ev: Event) => void): IMapFormInput {
        return new LabeledSliderFormInput({
            label: dimension.getName(),
            defaultValue: new String(dimension.getValue()).toString(),
            minValue: new String(dimension.getTypeManager().getMinValue()).toString(),
            maxValue: new String(dimension.getTypeManager().getMaxValue()).toString(),
            onChangeAction: (ev: Event) => {
                this.getMapObject().updateDimension(dimension, (<HTMLInputElement> ev.target).value, undefined);
                if(formAction) {
                    formAction(ev);
                }
            }
        });
    }

    /**
     * Help method which returns a new universal number input for the any map number dimension.
     * 
     * @param dimension
     */
    protected getNumberInput(dimension: IMapTypeDimension<number>, formAction?: (ev: Event) => void): IMapFormInput {
        return new LabeledTextFormInput({
            label: dimension.getName(),
            type: "number",
            onChangeAction: (ev: Event) => {
                this.getMapObject().updateDimension(dimension, (<HTMLInputElement> ev.target).value, undefined);
                if(formAction) {
                    formAction(ev);
                }
            }
        });
    }
}
export default MapLayerToolForm;