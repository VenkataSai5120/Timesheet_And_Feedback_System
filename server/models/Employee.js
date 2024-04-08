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
  },
  password: { 
    type: String, 
    required: true 
  },
  projects: {
    type: Array,
    default: [],
  }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;