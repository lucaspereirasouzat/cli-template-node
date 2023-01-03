"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FileStorage", {
    enumerable: true,
    get: function() {
        return FileStorage;
    }
});
var _fs = /*#__PURE__*/ _interopRequireDefault(require("fs"));
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var FileStorage = /*#__PURE__*/ function() {
    "use strict";
    function FileStorage() {
        _classCallCheck(this, FileStorage);
    }
    var _proto = FileStorage.prototype;
    _proto.readFileString = function readFileString(input) {
        console.log("input", input);
        var templateFile = _fs.default.readFileSync(input.path, "utf8");
        return templateFile;
    };
    _proto.writeFileString = function writeFileString(input) {
        _fs.default.writeFileSync(input.path, input.content);
    };
    _proto.folderExists = function folderExists(input) {
        return _fs.default.existsSync(input.path);
    };
    _proto.makeDir = function makeDir(input) {
        _fs.default.mkdirSync(input.path);
    };
    return FileStorage;
}();
