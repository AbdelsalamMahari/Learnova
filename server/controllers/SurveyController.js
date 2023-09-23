const Survey = require('../models/SurveysModel');

exports.saveSurveyResponses = async (req, res) => {
  try {
    const { userId, responses } = req.body;

    // Check if a survey already exists for this userId
    const existingSurvey = await Survey.findOne({ userId });

    if (existingSurvey) {
      return res.status(400).json({ error: 'Survey responses already submitted for this user' });
    }

    const survey = new Survey({
      userId,
      responses
    });

    await survey.save();

    return res.status(200).json({ message: 'Survey responses saved successfully' });
  } catch (error) {
    console.error('Error saving survey responses:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSurveySchema = async (req, res) => {
  try {
    const surveys = await Survey.find();

    if (!surveys || surveys.length === 0) {
      return res.status(404).json({ error: 'Survey schema not found' });
    }

    // Calculate the average for each question
    const questionAverages = {};
    for (let i = 1; i <= 5; i++) {
      const questionResponses = surveys.flatMap(survey => survey.responses)
        .filter(response => response.questionId === i);
      
      const totalRatingsForQuestion = questionResponses.length;

      const averageRating = totalRatingsForQuestion > 0
        ? (questionResponses.reduce((sum, response) => sum + response.rating, 0) / totalRatingsForQuestion).toFixed(2)
        : 0;

      questionAverages[`question${i}`] = {
        average: parseFloat(averageRating),
      };
    }

    // Calculate the total count of users who submitted
    const totalRatings = surveys.length;

    return res.status(200).json({ questionAverages, totalRatings });
  } catch (error) {
    console.error('Error retrieving survey schema:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};