import { container } from "tsyringe";
import uploadConfig from "@config/upload";

import DiskStorageProvider from "./implementations/DiskStorageProvider";

import IStorageProvider from "./models/IStorageProvider";
import s3StorageProvider from "./implementations/S3StorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: s3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "MailProvider",
  providers[uploadConfig.driver]
);
