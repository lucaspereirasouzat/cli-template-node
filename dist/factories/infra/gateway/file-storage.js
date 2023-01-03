"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeFileStorage", {
    enumerable: true,
    get: function() {
        return makeFileStorage;
    }
});
var _fileStorage = require("../../../infra/gateways/file-storage");
var makeFileStorage = function() {
    return new _fileStorage.FileStorage();
};
