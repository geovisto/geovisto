/**
 * This interface declares specification of the filter form input value.
 * 
 * @author Jiri Hynek
 */
interface IFilterFormInputValue {
    data: string,
    op: string,
    val: string
}
export default IFilterFormInputValue;