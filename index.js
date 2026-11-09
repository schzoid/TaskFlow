const express = require("express");

const tasksRoutes = require("./routes/tasks");
const logger = require("./middleware/logger");

const app = express();
const PORT = 3000;

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Taskflow API is running!" });
});

app.use("/tasks", tasksRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});