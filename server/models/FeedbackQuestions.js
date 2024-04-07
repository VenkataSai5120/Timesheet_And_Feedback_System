const mongoose = require('mongoose');

const FeedbackQuestionsSchema = new mongoose.Schema({
    questions: {
        type: [String],
        required: true,
    },
    employees: {
        type: [String],
        required: true,
    }
}, {
    timestamps: true,
});

const FeedbackQuestions = mongoose.model('FeedbackQuestions', FeedbackQuestionsSchema);
module.exports = FeedbackQuestions;
