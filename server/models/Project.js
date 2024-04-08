const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectID: {
        type: Number,
        unique: true
    },
    projectName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: String,
        required: true
    },
    projectMembers: {
        type: Array,
        required: true
    },
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
