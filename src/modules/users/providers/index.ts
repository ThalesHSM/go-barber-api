import { container } from "tsyringe";

import IHashProvider from "./HashProvider/models/IHashProvider";
import BCryptHashProvider from "./HashProvider/implementations/BCyptHashProvider";

container.registerSingleton<IHashProvider>("hashProvider", BCryptHashProvider);
