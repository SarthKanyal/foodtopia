import errorMiddleware from "./error-handler.js";

import {
  registerMiddleware,
  loginMiddleware,
  authMiddleware,
} from "./authMiddlewares.js";

export { errorMiddleware, registerMiddleware, loginMiddleware, authMiddleware };
