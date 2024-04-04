const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    unique: true
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    default: null,
  },
  department: { 
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    required: true, 
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true 
  },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
