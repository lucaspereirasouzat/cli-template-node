"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
_exportStar(require("./ReadFile"), exports);
_exportStar(require("./WriteFile"), exports);
_exportStar(require("./MakeDir"), exports);
_exportStar(require("./FolderExists"), exports);
function _exportStar(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) Object.defineProperty(to, k, {
            enumerable: true,
            get: function() {
                return from[k];
            }
        });
    });
    return from;
}
