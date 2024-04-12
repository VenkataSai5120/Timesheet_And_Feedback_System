const Timesheet = require('../models/Timesheet');

const createTimesheet = async (req, res) => {
    try {
        const {employeeID, activities, dates, totalHoursPerDay, totalHoursPerWeek} = req.body;
        console.log(req.body)
        const newTimesheet = new Timesheet({
            employeeID: employeeID,
            activities: activities,
            dates: dates,
            totalHoursPerDay: totalHoursPerDay,
            totalHoursPerWeek: totalHoursPerWeek
        });
        await newTimesheet.save();
        res.status(200).json({ newTimesheet, message: 'Timesheet created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createTimesheet };