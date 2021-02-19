"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var mail_1 = __importDefault(require("@config/mail"));
var DiskStorageProvider_1 = __importDefault(require("./StorageProvider/implementations/DiskStorageProvider"));
var EtherealMailProvider_1 = __importDefault(require("./MailProvider/implementations/EtherealMailProvider"));
var ChimpMailProvider_1 = __importDefault(require("./MailProvider/implementations/ChimpMailProvider"));
var HandlebarsMailTemplateProvider_1 = __importDefault(require("./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider"));
tsyringe_1.container.registerSingleton("StorageProvider", DiskStorageProvider_1.default);
tsyringe_1.container.registerSingleton("MailTemplateProvider", HandlebarsMailTemplateProvider_1.default);
tsyringe_1.container.registerInstance("MailProvider", mail_1.default.driver === "ethereal"
    ? tsyringe_1.container.resolve(EtherealMailProvider_1.default)
    : tsyringe_1.container.resolve(ChimpMailProvider_1.default));
