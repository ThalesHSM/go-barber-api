import { container } from "tsyringe";
import mailConfig from "@config/mail";

import EtherealMailProvider from "./implementations/EtherealMailProvider";
import SesMailProvider from "./implementations/SESMailProvider";

import IMailProvider from "./models/IMailProvider";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  Ses: container.resolve(SesMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);
