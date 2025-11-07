require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 4000;
const connectToDb = require("./src/config/db.config");

connectToDb();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
