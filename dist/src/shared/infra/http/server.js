"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var celebrate_1 = require("celebrate");
var routes_1 = __importDefault(require("./routes"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var upload_1 = __importDefault(require("@config/upload"));
require("@shared/infra/typeorm");
require("@shared/container");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/files", express_1.default.static(upload_1.default.uploadsFolder));
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.error(err);
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});
app.listen(3333, function () {
    console.log("🚀 Server Started on port 3333");
});
