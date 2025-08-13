"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveRequestGauge = ActiveRequestGauge;
const prom_client_1 = __importDefault(require("prom-client"));
const ActiveRequest = new prom_client_1.default.Gauge({
    name: "Active_request",
    help: "it gave us the number of active request",
    labelNames: ["method", "route"]
});
function ActiveRequestGauge(req, res, next) {
    const labels = {
        method: req.method,
        route: req.path,
    };
    ActiveRequest.inc(labels);
    res.on("finish", () => {
        ActiveRequest.dec(labels);
    });
    next();
}
//# sourceMappingURL=activeRequest.js.map