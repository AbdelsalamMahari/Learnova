import React, { useState, useEffect, useHistory } from 'react';
import './Survey.css';
import axios from 'axios';

const surveyQuestions = [
  {
    id: 1,
    question: 'What topics are you most interested in for online courses?',
    responses: [
      { response: 'Very Satisfied', rating: 100 },
      { response: 'Satisfied', rating: 75 },
      { response: 'Neutral', rating: 50 },
      { response: 'Dissatisfied', rating: 25 },
      { response: 'Very Dissatisfied', rating: 10 }
    ]
  },
  {
    id: 2,
    question: 'How did you find the course content?',
    responses: [
      { response: 'Excellent', rating: 100 },
      { response: 'Good', rating: 75 },
      { response: 'Average', rating: 50 },
      { response: 'Fair', rating: 25 },
      { response: 'Poor', rating: 10 }
    ]
  },
  {
    id: 3,
    question: 'How would you rate the effectiveness of the course instructors?',
    responses: [
      { response: 'Very Effective', rating: 100 },
      { response: 'Effective', rating: 75 },
      { response: 'Somewhat Effective', rating: 50 },
      { response: 'Ineffective', rating: 25 },
      { response: 'Very Ineffective', rating: 10 }
    ]
  },
  {
    id: 4,
    question: 'Were the course assessments (quizzes, exams, projects) fair and relevant?',
    responses: [
      { response: 'Very Fair and Relevant', rating: 100 },
      { response: 'Fair and Relevant', rating: 75 },
      { response: 'Neutral', rating: 50 },
      { response: 'Not Fair and Relevant', rating: 25 },
      { response: 'Not at all Fair and Relevant', rating: 10 }
    ]
  },
  {
    id: 5,
    question: 'What topics are you most interested in for online courses?',
    responses: [
      { response: 'Programming', rating: 100 },
      { response: 'Data Science', rating: 75 },
      { response: 'Web Development', rating: 50 },
      { response: 'Design', rating: 25 },
      { response: 'Business', rating: 10 }
    ]
  }
];

function Survey() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initialize responses with default values
    const initialResponses = {};
    surveyQuestions.forEach((question) => {
      initialResponses[question.id] = 0;
    });
    setResponses(initialResponses);
  }, []);

  const handleNextStep = () => {
    if (step < surveyQuestions.length) {
      setStep(step + 1);
    } else if (step === surveyQuestions.length) {
      // If on the last step, submit the survey
      handleSubmit();
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleResponseChange = (event) => {
    const selectedRating = surveyQuestions[step - 1].responses.find(
      (response) => response.response === event.target.value
    ).rating;

    setResponses({
      ...responses,
      [step]: selectedRating,
    });
  };
  const isNextDisabled = step !== 0 && !responses[step];

  const handleSubmit = async () => {
    setIsSubmitting(true);
  
    try {
      const formattedResponses = {};
      surveyQuestions.forEach((question) => {
        const rating = parseFloat(responses[question.id]);
        formattedResponses[`question${question.id}`] = !isNaN(rating) ? rating : 0;
      });
  
      const response = await axios.post('http://localhost:5000/surveys/save', {
        responses: formattedResponses,
      });
  
      console.log('Survey responses saved successfully:', response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error saving survey responses:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="survey-container">
      <form className="survey-form">
        <div className={`form-question${step}`} key={step}>
          {step === 0 && !isSubmitted && (
            <div className="first-survey-content">
              <header className="header">
                <h1 className="middle">
                  Welcome to learnova website!
                </h1>
                <p className="middle description">
                  In order to benefit from your experience, please fill out the survey below!
                </p>
              </header>
              <div className="form">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="submit"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step > 0 && step <= surveyQuestions.length && !isSubmitted && (
            <>
              <p>{surveyQuestions[step - 1].question}</p>
              <div className="radio-options">
                {surveyQuestions[step - 1].responses.map((response, index) => (
                  <label
                  key={index}
                  className={responses[step] === response.rating ? 'selected' : ''}
                >
                  <input
                    type="radio"
                    name={`question-${step}`}
                    value={response.response}
                    checked={responses[step] === response.rating}
                    onChange={handleResponseChange}
                  />
                  {response.response}
                </label>
                ))}
              </div>
              <div className="form">
                {step < surveyQuestions.length && !isSubmitted && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="submit"
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                )}

                {step === surveyQuestions.length && !isSubmitted && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="submit"
                    disabled={!responses[step] || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
                {step > 0 && (
                  <button type="button" onClick={handlePrevStep} className="submit">
                    Back
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        {isSubmitted && (
          <div className="thank-you-message">
            <p>Thank you for submitting the survey!</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Survey;
