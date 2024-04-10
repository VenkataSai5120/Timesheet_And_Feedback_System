const Employee = require('../models/Employee.js');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        const employeeData = [];
        
        employees.forEach(employee => {
            console.log(employee);
            const { ID, firstName, lastName, department, role, contact, email} = employee.toObject();
            employeeData.push({ ID, firstName, lastName, department, role, contact, email });
        });

        console.log(employeeData);

        res.status(200).json(employeeData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getAllEmployees };