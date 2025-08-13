"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequestDurationHistogram = HttpRequestDurationHistogram;
const prom_client_1 = __importDefault(require("prom-client"));
const HttpRequestDuration = new prom_client_1.default.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    // Buckets in seconds
    buckets: [0.1, 0.5, 1, 3, 7, 12, 20, 45, 80, 100, 200, 400, 800, 1600, 2500, 5000, 10000, 50000]
});
function HttpRequestDurationHistogram(req, res, next) {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        // Calculate duration in milliseconds and then convert to seconds
        const durationInSeconds = (endTime - startTime) / 1000;
        HttpRequestDuration.observe({
            method: req.method,
            route: req.path, // Use req.path instead of req.route
            status_code: res.statusCode // Use res.statusCode
        }, durationInSeconds);
    });
    // It's crucial to call next() to continue the request chain
    next();
}
//# sourceMappingURL=requestTimeHistogram.js.map