import { app } from "./app.js";
import { connectDB } from "./db/connectionDB.js";
import { ApiError } from "./utils/ApiError.js";
import { config } from "./utils/config.js";

//Database Connection
connectDB()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server started at PORT: ${config.PORT}`);
      
    });
  })
  .catch((error) => console.log(new ApiError(error.status, error.message)));
