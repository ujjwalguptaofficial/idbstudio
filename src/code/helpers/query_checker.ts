export class QueryChecker
{
  _query : string;
  _errMessage : string = "";

  _api : string = "";

  _option;

  constructor(query : string)
  {
    this._query = query;
  }

  isQryValid()
  {
    var api : string;
    var option : string = "";
    var not_allowed_keywords = ["Instance", "then", "catch"];
    not_allowed_keywords.every(function (item) {
      if (this._query.indexOf(item) >= 0) {
        this._errMessage = "keyword: '" + item + "' is not allowed, only write code for api call";
        return false;
      }
      return true;
    }, this);

    if (this._errMessage.length === 0) {
      api = this
        ._query
        .substring(0, this._query.indexOf("("));
      var allowed_api = [
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
      if (allowed_api.indexOf(api) >= 0) {
        option = this
          ._query
          .substring(this._query.indexOf("(") + 1, this._query.lastIndexOf(")"));
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
              this._errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case "clear":
            if (typeof option !== "string") {
              this._errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
          case "isDbExist":
            if (typeof option !== "string" || typeof option !== "object") {
              this._errMessage = "invalid syntax, please take a look at doc for api - '" + api + "'";
            }
            break;
        }
      } else if (api.length > 0) {
        this._errMessage = "invalid api - '" + api + "'";
      } else {
        this._errMessage = "invalid query";
      }

      if (this._errMessage.length === 0) {
        this._option = option;
        this._api = api;
        return true;
      } else {
        return false;
      }
    }
  }
}