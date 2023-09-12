import React, { useState } from 'react';
import './Survey.css'; // Import your CSS file if needed

function Survey() {

  const [radioValue, setRadioValue] = useState(null);

  const [checkboxValues, setCheckboxValues] = useState({
    hello: false,
    post: false,
    Neutral: false,
    fetch: false,
    update: false,
  });

  // Handler for radio buttons
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setRadioValue(value === radioValue ? null : value); // Toggle the selection
  };

  // Handler for checkboxes
  const handleCheckboxChange = (name) => {
    setCheckboxValues({
      hello: false,
      post: false,
      Neutral: false,
      fetch: false,
      update: false,
      [name]: true, // Set the clicked checkbox to true
    });
  };


  return (
    <div className="survey-container">
      <header className="header">
        <h1 className="middle">
          Welcome to the learnova website!
        </h1>
        <p className="middle description">
          In order to benefit from your experience, please fill out the survey below!
        </p>
      </header>
      <form className="survey-form">
        <div className="form">
          <label className="name-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="blank"
            placeholder="What's your name?"
            required
          />
        </div>
        <div className="form">
          <label className="email-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="blank"
            placeholder="me@email.com"
            required
          />
        </div>
        <div className="form">
          <label>
            Age<span className="response"></span>
          </label>
          <input
            type="number"
            name="age"
            min="0"
            max="100"
            className="blank"
            placeholder="Your age?"
          />
        </div>
        <div className="form">
          <p>How would you rate your overall experience on our course website?</p>
          <select name="form" className="blank" required>
            <option disabled selected value>
              Very Satisfied
            </option>
            <option value="Aang">Satisfied</option>
            <option value="Korra">Neutral</option>
            <option value="Korra">Dissatisfied</option>
            <option value="Korra">Very Dissatisfied</option>
          </select>
        </div>

        <div className="form">
          <p>How did you find the course content</p>
          <label>
            <input
              name="Excellent"
              value="Excellent"
              type="radio"
              className="radio"
              checked={radioValue === "Excellent"}
              onChange={handleRadioChange}
            />
            Excellent
          </label>
          <label>
            <input
              name="Good"
              value="Good"
              type="radio"
              className="radio"
              checked={radioValue === "Good"}
              onChange={handleRadioChange}
            />
            Good
          </label>
          <label>
            <input
              name="Average"
              value="Average"
              type="radio"
              className="radio"
              checked={radioValue === "Average"}
              onChange={handleRadioChange}
            />
            Average
          </label>
          <label>
            <input
              name="Fair"
              value="Fair"
              type="radio"
              className="radio"
              checked={radioValue === "Fair"}
              onChange={handleRadioChange}
            />
            Fair
          </label>
          <label>
            <input
              name="Poor"
              value="Poor"
              type="radio"
              className="radio"
              checked={radioValue === "Poor"}
              onChange={handleRadioChange}
            />
            Poor
          </label>
        </div>

        <div className="form">
          <p>How would you rate the effectiveness of the course instructors</p>
          <select name="form" className="blank" required>
            <option disabled selected value>
              Very Effective
            </option>
            <option value="Air">Airbending</option>
            <option value="Effective">Effective</option>
            <option value="Somewhat Effective">Somewhat Effective</option>
            <option value="Ineffective">Ineffective</option>
            <option value="Very Ineffective">Very Ineffective</option>
          </select>
        </div>

        <div className="form">
          <p>Were the course assessments (quizzes, exams, projects) fair and relevant?</p>
          <label>
            <input
              name="hello"
              value="hello"
              type="checkbox"
              className="cb"
              checked={checkboxValues.hello}
              onChange={() => handleCheckboxChange("hello")}
            />
            Very Fair and Relevant
          </label>
          <label>
            <input
              name="post"
              value="post"
              type="checkbox"
              className="cb"
              checked={checkboxValues.post}
              onChange={() => handleCheckboxChange("post")}
            />
            Fair and Relevant
          </label>
          <label>
            <input
              name="Neutral"
              value="Neutral"
              type="checkbox"
              className="cb"
              checked={checkboxValues.Neutral}
              onChange={() => handleCheckboxChange("Neutral")}
            />
            Neutral
          </label>
          <label>
            <input
              name="fetch"
              value="fetch"
              type="checkbox"
              className="cb"
              checked={checkboxValues.fetch}
              onChange={() => handleCheckboxChange("fetch")}
            />
            Not Fair and Relevant
          </label>
          <label>
            <input
              name="update"
              value="update"
              type="checkbox"
              className="cb"
              checked={checkboxValues.update}
              onChange={() => handleCheckboxChange("update")}
            />
            Not at all Fair and Relevant
          </label>
        </div>
        <div className="form">
          <p>Please provide any suggestions you have for improving our course website and your learning experience. Your input is valuable to us.</p>
          <textarea className="textarea" name="textarea" placeholder="Your suggestion!"></textarea>
        </div>

        <div className="form">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Survey;
