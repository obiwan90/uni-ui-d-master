"use strict";const e=require("../../utils/customRequest.js");exports.apiFinanceData=function(t){return e.customRequest("/Home/Basic/cshqxx",t,"POST")},exports.apiFinanceItemList=function(t){return e.customRequest("/Home/Basic/cspd",t,"POST")},exports.apiFinanceSave=function(t){return e.customRequest("/Home/Basic/csadd",t,"POST")};
