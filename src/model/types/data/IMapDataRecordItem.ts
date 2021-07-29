/**
 * The type represents map data record item.
 * 
 * @author Jiri Hynek
 */
type IMapDataRecordItem = { [key: string]: IMapDataRecordItem } | string | number | boolean | null;
export default IMapDataRecordItem;