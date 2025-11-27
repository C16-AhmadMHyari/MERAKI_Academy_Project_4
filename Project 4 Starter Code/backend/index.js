const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/db");
const rolesRouter = require("./routes/roles")
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//===============================
app.use("/routes", rolesRouter)
app.use("/users", usersRouter)
app.use("/categories", categoriesRouter)
//============================================

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
