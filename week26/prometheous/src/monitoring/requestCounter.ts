import client from "prom-client"

const RequestCount = new client.Counter({
    name : "request_count",
    help : "it aggereated the total number of request counts",
    labelNames : ["method" , "route" , "status_code"]
})

import { Request, Response, NextFunction } from "express";

export function requestCounter(req: Request, res: Response, next: NextFunction){
    res.on("finish", () => {
        RequestCount.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path ?? "unknow",
            status_code: res.statusCode ?? 0
        });
    });
    next();
}