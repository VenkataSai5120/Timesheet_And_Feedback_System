const mongoose = require('mongoose');

const mappingSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    employees: {
        type: Array,
        required: true
    }
});

const Mapping = mongoose.model('Mapping', mappingSchema);
module.exports = Mapping;
