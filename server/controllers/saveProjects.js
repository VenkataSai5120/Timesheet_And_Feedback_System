const Project = require("../models/Project.js");

const saveProject = async (req, res) => {
    try {
        const { projectName, fromDate, endDate, projectManager, description, selectedEmployees } = req.body;
        const projectMembers = [];

        for (const role in selectedEmployees) {
            selectedEmployees[role].forEach(name => {
                projectMembers.push(name);
            });
        }

        const projectCount = await Project.countDocuments() + 1000;
        const newProject = new Project({
            projectID: projectCount,
            projectName: projectName,
            startDate: fromDate,
            endDate: endDate,
            projectManager: projectManager,
            description: description,
            projectMembers: projectMembers,
        });

        // Save the new project
        await newProject.save();
        console.log("Project saved successfully");
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { saveProject };
