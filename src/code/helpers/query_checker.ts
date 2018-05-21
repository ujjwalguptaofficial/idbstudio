import { API } from "../enum";

export class QueryChecker {
  query: string;
  errMessage: string = "";
  api: string = "";
  option;

  constructor(query: string) {
    this.query = query;
  }

  isQryValid() {
    const notAllowedKeywords = ["Instance", "then", "catch"];
    notAllowedKeywords.every((item) => {
      if (this.query.indexOf(item) >= 0) {
        this.errMessage = `keyword: '${item}' is not allowed, only write code for api call`;
        return false;
      }
      return true;
    });

    if (this.errMessage.length === 0) {
      const api: API = this.query.substring(0, this.query.indexOf("(")) as API;
      var option: string | null = "";
      const allowedApi = [
        API.Select,
        API.Insert,
        API.Remove,
        API.Update,
        API.IsDbExist,
        API.Clear,
        API.Count,
        API.DropDb,
        API.BulkInsert,
        API.ExportJson
      ];
      if (allowedApi.indexOf(api) >= 0) {
        option = this.query.substring(this.query.indexOf("(") + 1, this.query.lastIndexOf(")"));
        if (option.length > 0) {
          eval("option =" + option);
        }
        else {
          option = null;
        }
        switch (api) {
          case API.Select:
          case API.Insert:
          case API.Remove:
          case API.Count:
          case API.Update:
          case API.BulkInsert:
          case API.ExportJson:
            if (typeof option !== "object") {
              this.errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case API.Clear:
            if (typeof option !== "string") {
              this.errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case API.IsDbExist:
            if (typeof option !== "string" || typeof option !== "object") {
              this.errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
        }
      } else if (api.length > 0) {
        this.errMessage = "invalid api - '" + api + "'";
      } else {
        this.errMessage = "invalid query";
      }

      if (this.errMessage.length === 0) {
        this.option = option;
        this.api = api;
        return true;
      } else {
        return false;
      }
    }
  }
}