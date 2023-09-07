const SurveyModel = require("../models/SurveysModel");

// Controller to handle creating a new survey
exports.createSurvey = async (req, res) => {
  try {
    const survey = new SurveyModel(req.body);
    const savedSurvey = await survey.save();
    res.status(201).json({ message: "Survey created successfully", survey: savedSurvey });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to handle getting all surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await SurveyModel.find();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle getting a specific survey by ID
exports.getSurveyById = async (req, res) => {
  const { surveyId } = req.params;
  try {
    const survey = await SurveyModel.findById(surveyId);
    if (!survey) {
      return res.status(404).json({ error: "Survey not found" });
    }
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle updating a survey by ID
exports.updateSurveyById = async (req, res) => {
  try {
    const updatedSurvey = await SurveyModel.findByIdAndUpdate( req.params.id, {
      $set:req.body,
    },
    {new:true});
    res.status(200).json({ message: "Survey updated successfully", survey: updatedSurvey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle deleting a survey by ID
exports.deleteSurveyById = async (req, res) => {
  const  surveyId = req.params.id;
  try {
     await SurveyModel.findByIdAndDelete(surveyId);
    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
