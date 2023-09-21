const Survey = require('../models/SurveysModel');

exports.saveSurveyResponses = async (req, res) => {
  try {
    const { responses } = req.body;

    // Retrieve the existing survey document
    let existingSurvey = await Survey.findOne();

    // Initialize a new survey document if none exists
    if (!existingSurvey) {
      existingSurvey = new Survey({});
    }

    // Update averages with new responses
    for (let i = 1; i <= 5; i++) {
      const questionKey = `question${i}`;
      const newRating = responses[questionKey] || 0;
      const existingAverage = existingSurvey[questionKey].average || 0;
      const totalRatings = existingSurvey[questionKey].totalRatings || 0;

      // Calculate the new average
      const updatedAverage = ((existingAverage * totalRatings) + newRating) / (totalRatings + 1);

      existingSurvey[questionKey] = {
        average: updatedAverage,
        totalRatings: totalRatings + 1,
      };
    }

    // Save or update the survey document
    await existingSurvey.save();

    return res.status(200).json({ message: 'Survey responses saved successfully' });
  } catch (error) {
    console.error('Error saving survey responses:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getSurveySchema = async (req, res) => {
  try {
    // Retrieve the existing survey document
    const existingSurvey = await Survey.findOne();

    if (!existingSurvey) {
      return res.status(404).json({ error: 'Survey schema not found' });
    }

    return res.status(200).json(existingSurvey);
  } catch (error) {
    console.error('Error retrieving survey schema:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};