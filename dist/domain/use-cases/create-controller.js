"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateController", {
    enumerable: true,
    get: function() {
        return CreateController;
    }
});
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var CreateController = /*#__PURE__*/ function() {
    "use strict";
    function CreateController(fileStorage) {
        _classCallCheck(this, CreateController);
        this.fileStorage = fileStorage;
    }
    var _proto = CreateController.prototype;
    _proto.handle = function handle(path) {
        return this.fileStorage.readFileString({
            path: path
        });
    };
    return CreateController;
}();
