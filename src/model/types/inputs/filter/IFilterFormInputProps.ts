import IMapFormInputProps from "../IMapFormInputProps";

/**
 * This interface declares specification of form input props model.
 * 
 * @author Jiri Hynek
 */
interface IFilterFormInputProps extends IMapFormInputProps {
    ops: {
        options: string[],
        onChangeAction: ((this: GlobalEventHandlers, ev: Event) => unknown) | null
    };

    data: {
        options: string[],
        onChangeAction: ((this: GlobalEventHandlers, ev: Event) => unknown) | null
    };
    
    vals: {
        options: string[],
        onChangeAction: ((this: GlobalEventHandlers, ev: Event) => unknown) | null
    };
}
export default IFilterFormInputProps;