"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SessionsController_1 = __importDefault(require("../controllers/SessionsController"));
var sessionsRouter = express_1.Router();
var sessionsControllers = new SessionsController_1.default();
sessionsRouter.post("/", sessionsControllers.create);
exports.default = sessionsRouter;
