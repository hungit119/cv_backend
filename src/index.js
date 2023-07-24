const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const db = require("./config/index");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
db.connect();
db.configCloudinary();
router(app);

app.listen(PORT, () => {
  console.log(`Server listenning on http://localhost:${PORT}`);
});
