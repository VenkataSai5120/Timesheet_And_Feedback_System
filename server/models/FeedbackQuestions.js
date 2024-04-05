const mongoose = require('mongoose');

const mongoose = require('mongoose');

const FeedbackQuestionsSchema = new mongoose.Schema({
    // array of questions
    questions: {
        type: [String],
        required: true,
    },
    // in array there a map of key value pairs, the key is role and the value is an array of employees
    // array of objects
    employees: {
        type: [Object],
        required: true,
    }
}, {
    timestamps: true,
});

const FeedbackQuestions = mongoose.model('FeedbackQuestions', FeedbackQuestionsSchema);
module.exports = { FeedbackQuestions };