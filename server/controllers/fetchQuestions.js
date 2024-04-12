const FeedbackQuestions = require('../models/FeedbackQuestions');

const getQuestions = async (req, res) => {
    try {
        const { ID } = req.body;
        const allQuestions = await FeedbackQuestions.find();
        
        let employeeQuestions = [];

        for (const questionRecord of allQuestions) {
            if (questionRecord.employees.includes(ID)) {
                employeeQuestions = [...employeeQuestions, ...questionRecord.questions];
            }
        }
        res.status(200).json({ questions: employeeQuestions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getQuestions };
