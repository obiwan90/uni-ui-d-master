"use strict";const s=require("../../utils/customRequest.js");exports.apiDataAnalysis=function(t){return s.customRequest("/Home/Analysis/index",t,"POST")},exports.apiStockAnalysis=function(t){return s.customRequest("/Home/Analysis/kcindex",t,"POST")};
