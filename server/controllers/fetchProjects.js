const Project = require('../models/Project.js');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        const projectData = [];
        
        projects.forEach(project => {
            const { projectName, projectMembers } = project.toObject();
            projectData.push({ projectName, projectMembers });
        });

        console.log(projectData);

        res.status(200).json(projectData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllProjects };