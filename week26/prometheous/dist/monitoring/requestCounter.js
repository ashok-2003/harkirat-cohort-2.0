"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCounter = requestCounter;
const prom_client_1 = __importDefault(require("prom-client"));
const RequestCount = new prom_client_1.default.Counter({
    name: "request_count",
    help: "it aggereated the total number of request counts",
    labelNames: ["method", "route", "status_code"]
});
function requestCounter(req, res, next) {
    res.on("finish", () => {
        RequestCount.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path ?? "unknow",
            status_code: res.statusCode ?? 0
        });
    });
    next();
}
//# sourceMappingURL=requestCounter.js.map