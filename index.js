import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.DEV_PORT || 8080;

app.listen(port, () => {
  console.log(`SERVER 실행됨 ${port}`);
});
