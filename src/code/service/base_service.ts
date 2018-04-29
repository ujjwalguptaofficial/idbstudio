import {
    Data_Type,
    IDataBaseOption,
    Instance,
    ITableOption,
    Model,
    IError
} from 'jsstore';
declare var JsStore;
export const idb_con : Instance = new JsStore.Instance();
export class BaseService
{
    getDbList()
    {
        return JsStore.getDbList();
    }

    isDbExist(dbName : string)
    {
        return JsStore.isDbExist(dbName);
    }

    protected getDbSchema(dbName : string, onSuccess : (schema : Model.DataBase) => void)
    {
        JsStore.getDbSchema(dbName, onSuccess);
    }
}