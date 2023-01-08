#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _commander = require("commander");
var _fs = /*#__PURE__*/ _interopRequireWildcard(require("fs"));
var _createUsecase = require("./factories/domain/use-cases/create-usecase");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var program = new _commander.Command();
program.name("template-clean-arquiteture").description("CLI based on template clean arquiteture").version("0.0.1");
console.log("entrou clise");
program.command("create <name>").description("Create a new file based on a template").option("-t, --tests", "Create test").option("-c, --controller", "Create Controller").option("-u, --useCases", "Create UseCases").option("-g, --gateWay", "Create gateway").option("-r, --repo", "Create repository")// .option('-t, --template <template>', 'Template to use')
// .option('-d, --directory <directory>', 'Directory to save the file')
.action(function(name, options) {
    console.log(name, options);
    console.log(__dirname);
    var result = (0, _createUsecase.makeController)().handle("src/resources/views/templates/Controller.html");
    console.log(result);
    try {
        console.log("entrou clise options", name, options);
        // Read the template file
        var templateContent = _fs.default.readFileSync(options.template, "utf8");
        console.log(templateContent);
        var fileContent = templateContent.replace("{{ className }}", "MyClass").replace("{{ properties }}", JSON.stringify([
            {
                name: "myProp",
                type: "string"
            }
        ]));
        try {
            if ((0, _fs.existsSync)(options.directory)) {
                _fs.default.mkdirSync("".concat(options.directory));
            }
        } catch (error) {}
        // Create the new file
        var filePath = "".concat(options.directory, "/").concat(name);
        _fs.default.writeFileSync(filePath, fileContent);
        var result1 = _fs.default.readFileSync(filePath, "utf8");
        console.log(result1);
    } catch (error1) {
        console.log(error1);
    }
});
program.parse(process.argv);
var options = program.opts();
if (options.debug) console.log(options);
