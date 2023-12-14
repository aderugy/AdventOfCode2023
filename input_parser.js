"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var fs = require("fs");
function parse(path) {
    return fs.readFileSync(path).toString().split('\n');
}
exports.parse = parse;
