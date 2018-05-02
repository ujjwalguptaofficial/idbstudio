export class QueryChecker {
  query: string;
  errMessage: string = "";
  api: string = "";
  option;

  constructor(query: string) {
    this.query = query;
  }

  isQryValid() {
    var api: string;
    var option: string = "";
    const notAllowedKeywords = ["Instance", "then", "catch"];
    notAllowedKeywords.every((item) => {
      if (this.query.indexOf(item) >= 0) {
        this.errMessage = `keyword: '${item}' is not allowed, only write code for api call`;
        return false;
      }
      return true;
    });

    if (this.errMessage.length === 0) {
      api = this.query.substring(0, this.query.indexOf("("));
      const allowedApi = [
        "select",
        "insert",
        "remove",
        "update",
        "isDbExist",
        "clear",
        "count",
        "dropDb",
        "bulkInsert",
        "exportJson"
      ];
      if (allowedApi.indexOf(api) >= 0) {
        option = this.query.substring(this.query.indexOf("(") + 1, this.query.lastIndexOf(")"));
        eval("option =" + option);
        switch (api) {
          case "select":
          case "insert":
          case "remove":
          case "count":
          case "update":
          case "bulkInsert":
          case "exportJson":
            if (typeof option !== "object") {
              this.errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case "clear":
            if (typeof option !== "string") {
              this.errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case "isDbExist":
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