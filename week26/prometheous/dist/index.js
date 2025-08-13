"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const requestCounter_1 = require("./monitoring/requestCounter");
const activeRequest_1 = require("./monitoring/activeRequest");
const app = (0, express_1.default)();
app.use(requestCounter_1.requestCounter);
app.use(activeRequest_1.ActiveRequestGauge);
app.get('/user', (req, res) => {
    res.json({
        name: "ashok"
    });
});
app.get('/wait', async (req, res) => {
    const promise = new Promise(resolve => setTimeout(resolve, 8000));
    await promise;
    res.json({
        name: "ashok gupta"
    });
});
app.get("/metrics", async (req, res) => {
    const metrics = await prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
});
app.listen(3000, () => {
    console.log("app is listening on 3000");
});
//# sourceMappingURL=index.js.map