const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

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
    }
});

projectSchema.plugin(autoIncrement.plugin, {
    model: 'Project',
    field: 'projectID',
    startAt: 1000,
    incrementBy: 1
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
