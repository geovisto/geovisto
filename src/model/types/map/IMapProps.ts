import IGeoDataManager from "../geodata/IGeoDataManager";
import IMapConfig from "./IMapConfig";
import IMapConfigManager from "../config/IMapConfigManager";
import IMapDataManager from "../data/IMapDataManager";
import IMapGlobals from "./IMapGlobals";
import { IMapObjectProps, IMapObjectInitProps } from "../object/IMapObjectProps";
import IMapTemplates from "./IMapTemplates";
import IMapToolsManager from "../tool/IMapToolsManager";

/**
 * This type provides the specification of the map props model.
 * 
 * @author Jiri Hynek
 */
type IMapProps = IMapObjectProps & {
    templates?: IMapTemplates;
    globals?: IMapGlobals;
    data?: IMapDataManager;
    geoData?: IGeoDataManager;
    tools?: IMapToolsManager;
}

/**
 * This type provides the specification of the map object props model used in its initialization.
 * 
 * @author Jiri Hynek
 */
type IMapInitProps<TConfig extends IMapConfig = IMapConfig> = IMapObjectInitProps<TConfig> & {
    configManager : IMapConfigManager;
}
export type { IMapProps, IMapInitProps };