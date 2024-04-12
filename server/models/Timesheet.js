const mongoose = require('mongoose');

const TimesheetSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    activities: {
        type: Array,
        required: true
    },
    dates: {
        type: Array,
        required: true
    },
    totalHoursPerDay: {
        type: Array,
        required: true
    },
    totalHoursPerWeek: {
        type: Number,
        required: true 
    }
},
    {
        timestamps: true,
    });

const Timesheet = mongoose.model('Timesheet', TimesheetSchema);
module.exports = Timesheet;
