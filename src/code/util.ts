declare var JsStore;
export class Util
{
    static getType(value) {
        if (value === null) {
            return JsStore.Data_Type.Null;
        }
        var type = typeof value;
        switch (type) {
            case 'object':
                if (Array.isArray(value)) {
                    return JsStore.Data_Type.Array;
                }
            default:
                return type;
        }
    }
}