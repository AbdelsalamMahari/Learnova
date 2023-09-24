import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from "../../components/sidebars/AdminSideBar";
import "./assets/css/style.css";
import Icons from "../../assets/icons/icons";
import { Chart } from 'chart.js/auto';

const surveyQuestions = [
    {
        id: 1,
        question: 'What topics are you most interested in for online courses?',
    },
    {
        id: 2,
        question: 'How did you find the course content?',
    },
    {
        id: 3,
        question: 'How would you rate the effectiveness of the course instructors?',
    },
    {
        id: 4,
        question: 'Were the course assessments (quizzes, exams, projects) fair and relevant?',
    },
    {
        id: 5,
        question: 'How would you rate the overall quality of the website course?',
    }
];

const SurveyAveragesComponent = () => {
    const [surveyData, setSurveyData] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/surveys/schema");
                const data = response.data;
                setSurveyData(data);
            } catch (error) {
                console.error('Error fetching survey data:', error);
            }
        };

        fetchSurveyData();
    }, []);

    useEffect(() => {
        let chartInstance = null;

        // Function to create or update the pie chart
        const createOrUpdatePieChart = () => {
            const chartCanvas = document.getElementById('pieChart');
            if (!chartCanvas || !surveyData) return;

            const questionAverages = surveyData.questionAverages;

            const data = {
                labels: surveyQuestions.map(question => `Question ${question.id}`),
                datasets: [{
                    data: surveyQuestions.map(question => questionAverages[`question${question.id}`].average),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                    ],
                }],
            };

            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance
            }

            chartInstance = new Chart(chartCanvas, {
                type: 'pie',
                data,
            });
        };

        createOrUpdatePieChart();

        return () => {
            // Clean up and destroy the chart instance when the component is unmounted
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [surveyData]);

    useEffect(() => {
        let chartInstance = null;

        // Function to create or update the bar chart
        const createOrUpdateBarChart = () => {
            const chartCanvas = document.getElementById('barChart');
            if (!chartCanvas || !surveyData) return;

            const questionAverages = surveyData.questionAverages;

            const data = {
                labels: surveyQuestions.map(question => `Question ${question.id}`),
                datasets: [{
                    label: 'Average',
                    data: surveyQuestions.map(question => questionAverages[`question${question.id}`].average),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }],
            };

            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance
            }

            chartInstance = new Chart(chartCanvas, {
                type: 'bar',  // Use 'bar' for a bar chart
                data,
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        };

        createOrUpdateBarChart();

        return () => {
            // Clean up and destroy the chart instance when the component is unmounted
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [surveyData]);



    return (
        <div className="container-admin">
            <SideBar />
            <div className="main-admin">
                <div className="topbar">
                    <div className="toggle">
                        <Icons.Bars size={24} />
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
                </div>
                <div className="dash-container">
                    <div className='dash-survey'>
                        <h2>Survey Averages</h2>
                        <div className="charts">
                        <div className='pie-chart'>
                            <canvas id="pieChart" width="400" height="400" /> {/* Adjust the width and height here */}
                        </div>
                        <div className='batton-chart'>
                            {/* Adjust the width and height attributes to make the chart smaller */}
                            <canvas id="barChart" width="400" height="400" />
                        </div>
                        </div>
                        {surveyQuestions.map((question) => (
                            <div key={question.id}>
                                <h3>{`Question ${question.id}: ${question.question}`}</h3>
                                <p><b>The average is : </b>{surveyData ? surveyData.questionAverages[`question${question.id}`].average : 'Loading...'}</p>
                            </div>
                        ))}
                        <h3>The Total Rating (By Users) For The Questions Is :</h3>

                        <p><b>Total Ratings : </b> {surveyData ? surveyData.totalRatings : 'Loading...'}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SurveyAveragesComponent;
