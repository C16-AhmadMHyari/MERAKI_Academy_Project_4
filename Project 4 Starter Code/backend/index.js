const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log(process.env.DB_URI);

const db = require("./models/db");
const rolesRouter = require("./routes/roles")
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const packagesRouter = require("./routes/packages")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//===============================
app.use("/routes", rolesRouter)
app.use("/users", usersRouter)
app.use("/categories", categoriesRouter)
app.use("/packages", packagesRouter)
//============================================

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
