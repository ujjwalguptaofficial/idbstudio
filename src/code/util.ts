import { DATA_TYPE } from "jsstore";

export class Util
{
    static getType(value) {
        if (value === null) {
            return DATA_TYPE.Null;
        }
        var type = typeof value;
        switch (type) {
            case 'object':
                if (Array.isArray(value)) {
                    return DATA_TYPE.Array;
                }
            default:
                return type;
        }
    }
}