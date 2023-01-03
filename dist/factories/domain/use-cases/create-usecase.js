"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeController", {
    enumerable: true,
    get: function() {
        return makeController;
    }
});
var _createController = require("../../../domain/use-cases/create-controller");
var _fileStorage = require("../../infra/gateway/file-storage");
var makeController = function() {
    return new _createController.CreateController((0, _fileStorage.makeFileStorage)());
};
