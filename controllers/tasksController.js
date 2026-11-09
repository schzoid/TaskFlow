const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

const getAllTasks = async (req, res) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const tasks = JSON.parse(data);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error reading tasks" });
    
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const data = await fs.readFile(filePath, "utf8");
        const tasks = JSON.parse(data);

        const task = tasks.find(task => task.id === id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: "Error reading task"
        });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, priority, assignee } = req.body ?? {};

        if (!title || !description || !priority || !assignee) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const data = await fs.readFile(filePath, "utf8");
        const tasks = JSON.parse(data);

        const newId = tasks.reduce(
            (maxId, task) => Math.max(maxId, task.id),
            0
        ) + 1;

        const newTask = {
            id: newId,
            title,
            description,
            status: "pending",
            priority,
            assignee,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        tasks.push(newTask);

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.status(201).json(newTask);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating task"
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const { title, description, status, priority, assignee } = req.body ?? {};

        if (!title || !description || !status || !priority || !assignee) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const data = await fs.readFile(filePath, "utf8");
        const tasks = JSON.parse(data);

        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const updatedTask = {
            ...tasks[taskIndex],
            title,
            description,
            status,
            priority,
            assignee,
            updatedAt: new Date().toISOString()
        };

        tasks[taskIndex] = updatedTask;

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.status(200).json(updatedTask);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error updating task"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const data = await fs.readFile(filePath, "utf8");
        const tasks = JSON.parse(data);

        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const deletedTask = tasks.splice(taskIndex, 1);

        await fs.writeFile(
            filePath,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.status(200).json({
            message: "Task deleted successfully",
            deletedTask: deletedTask[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error deleting task"
        });
    }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };