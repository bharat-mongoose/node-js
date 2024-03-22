const connectDataBase = require("./config/database");
const dotenv = require("dotenv");
const app = require("./index");

//config

dotenv.config({ path: "config/config.env" });

connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on https://localhost:${process.env.PORT}`);
});
