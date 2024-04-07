const FeedbackQuestions = require('../models/FeedbackQuestions');

const saveFeedback = async (req, res) => {
    try {
        console.log("Got a request");
        console.log(req.body);
        const { questions, selectedRoles, selectedEmployees } = req.body;
        const newFeedbackQuestions = new FeedbackQuestions({
            questions: questions,
            employees: selectedEmployees,
        });

        await newFeedbackQuestions.save();
        console.log('Feedback Questions Saved Successfully');
        console.log(newFeedbackQuestions);
        res.status(200).json({ newFeedbackQuestions, message: 'Feedback questions saved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { saveFeedback };
