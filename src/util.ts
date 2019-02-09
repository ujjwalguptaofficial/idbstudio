import { DATA_TYPE } from "jsstore";

export class Util {
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

    static getParameterByName(name: string, url?: string) {
        if (!url) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) { return null; }
        if (!results[2]) { return ''; }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    static isNull(value: null | string) {
        return value == null || value.length == 0;
    }
}