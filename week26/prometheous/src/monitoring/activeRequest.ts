import client from "prom-client"

const ActiveRequest = new client.Gauge({
    name: "Active_request",
    help: "it gave us the number of active request",
    labelNames: ["method", "route"]
})


import { Request, Response, NextFunction } from "express";

export function ActiveRequestGauge(req: Request, res: Response, next: NextFunction) {

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