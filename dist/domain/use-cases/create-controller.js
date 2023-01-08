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
var PATH_CONTROLLER = "../../src/resources/views/templates/Controller.html";
var CreateController = /*#__PURE__*/ function() {
    "use strict";
    function CreateController(fileStorage) {
        _classCallCheck(this, CreateController);
        this.fileStorage = fileStorage;
    }
    var _proto = CreateController.prototype;
    _proto.handle = function handle(path) {
        var fileInString = this.fileStorage.readFileString({
            path: PATH_CONTROLLER
        });
        if (!fileInString) {
            throw new Error("File Not found");
        }
        var replacedFileString = fileInString.replace("{{ className }}", "MyClass");
        if (!this.fileStorage.folderExists({
            path: PATH_CONTROLLER
        })) {
            this.fileStorage.makeDir({
                path: PATH_CONTROLLER
            });
        }
        this.fileStorage.writeFileString({
            path: "".concat(path, "/Controller.ts"),
            content: replacedFileString
        });
        return replacedFileString;
    };
    return CreateController;
}();
