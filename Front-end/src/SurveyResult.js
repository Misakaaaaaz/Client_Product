import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './SurveyResult.css';
import { mockHelpApi } from './mockApi';

// Register Chart.js components
ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SurveyResult() {
    const navigate = useNavigate();
    const [surveyData, setSurveyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await mockHelpApi();
            setSurveyData(response.data);
        };
        fetchData();
    }, []);

    // Find the maximum value from the data
    const maxValue = Math.max(
        surveyData.section1?.h || 0,
        surveyData.section1?.p || 0,
        surveyData.section1?.a || 0,
        surveyData.section1?.l || 0,
        surveyData.section1?.f || 0,
        surveyData.section1?.s || 0
    );

    // Radar chart data and configuration
    const radarData = {
        labels: ['H', 'P', 'A', 'L', 'F', 'S'],
        datasets: [
            {
                label: 'Value',
                data: [
                    surveyData.section1?.h,
                    surveyData.section1?.p,
                    surveyData.section1?.a,
                    surveyData.section1?.l,
                    surveyData.section1?.f,
                    surveyData.section1?.s,
                ],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: Math.max(maxValue, 50), // Use the maximum value from the data as the chart's max value
                ticks: {
                    display: false, // Hide tick values
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Disable legend
            },
        },
    };

    const barDataHorizontal = {
        labels: ['A', 'S', 'I', 'C', 'E', 'R'],
        datasets: [
            {
                label: 'Career Orientation',
                data: [
                    surveyData.section2?.a,
                    surveyData.section2?.s,
                    surveyData.section2?.i,
                    surveyData.section2?.c,
                    surveyData.section2?.e,
                    surveyData.section2?.r,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barOptionsHorizontal = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false, // Disable legend
            },
        },
    };

    const barDataVertical = {
        labels: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'],
        datasets: [
            {
                label: 'MBTI Test Results',
                data: [
                    surveyData.section3?.e,
                    surveyData.section3?.i,
                    surveyData.section3?.s,
                    surveyData.section3?.n,
                    surveyData.section3?.t,
                    surveyData.section3?.f,
                    surveyData.section3?.j,
                    surveyData.section3?.p,
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barOptionsVertical = {
        plugins: {
            legend: {
                display: false, // Disable legend
            },
        },
    };

    const lineData = {
        labels: ['Q1', 'Q2', 'Q3'],
        datasets: [
            {
                label: 'Creativity/Lateral Thinking',
                data: [
                    surveyData.section4?.q1,
                    surveyData.section4?.q2,
                    surveyData.section4?.q3,
                ],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
        ],
    };

    const lineOptions = {
        plugins: {
            legend: {
                display: false, // Disable legend
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const handleInterestHub = () => navigate('/InterestHub');
    const handleAcademic = () => navigate('/Academic');
    const handleHelpPage = () => navigate('/HelpPage');
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        navigate('/login');
    }

    return (
        <div className="interest-hub-page">
            <header className="topbar">
                <div className="logo">
                    <img src="logo1.png" alt="OIC Logo" className="logo-image" />
                    <h2>OIC Education</h2>
                </div>
                <div className="user-info">
                    <span>User1</span>
                    <img src="User1.png" alt="User Avatar" className="user-avatar" />
                </div>
            </header>

            <div className="main-content">
                <nav className="sidebar">
                    <button className="menu-item" onClick={() => navigate('/homepage')}>
                        <img src="home-icon.png" alt="Home Icon" className="menu-icon" />
                        Homepage
                    </button>
                    <button className="menu-item" onClick={handleInterestHub}>
                        <img src="interest-icon.png" alt="Interest Icon" className="menu-icon" />
                        Interest Hub
                    </button>
                    <button className="menu-item" onClick={handleAcademic}>
                        <img src="academic-icon.png" alt="Academic Icon" className="menu-icon" />
                        Academic & Career
                    </button>
                    <button className="menu-item" onClick={() => navigate('/calendar')}>
                        <img src="calendar-icon.png" alt="Calendar Icon" className="menu-icon" />
                        Calendar
                    </button>
                    <button className="menu-item" onClick={handleHelpPage}>
                        <img src="help-icon.png" alt="Help Icon" className="menu-icon" />
                        Help Button
                    </button>
                    <div className="settings">
                        <button className="menu-item">
                            <img src="settings-icon.png" alt="Settings Icon" className="menu-icon" />
                            Settings
                        </button>
                        <button className="menu-item" onClick={handleSignOut}>
                            <img src="signout-icon.png" alt="Sign Out Icon" className="menu-icon" />
                            Sign Out
                        </button>
                    </div>
                </nav>

                <section className="survey-content">
                    <h1>Survey Results</h1>
                    <p>You can find the survey results of your child here!</p>

                    <div className="survey-sections">
                        <div className="survey-card1">
                            <h2>Value</h2>
                            <Radar data={radarData} options={radarOptions} style={{ marginTop: 'auto' }} />
                            <ul style={{ marginTop: 'auto' }}>
                                <li>H: Homework</li>
                                <li>P: Participation</li>
                                <li>A: Attendance</li>
                                <li>L: Late Submission</li>
                                <li>F: Final Exam</li>
                                <li>S: Semester Grade</li>
                            </ul>
                        </div>

                        <div className="survey-card2">
                            <h2>Career Orientation</h2>
                            <Bar data={barDataHorizontal} options={barOptionsHorizontal} style={{ marginTop: 'auto' }} />
                            <ul style={{ marginTop: 'auto' }}>
                                <li>A: Artistic</li>
                                <li>S: Social</li>
                                <li>I: Investigative</li>
                                <li>C: Conventional</li>
                                <li>E: Enterprising</li>
                                <li>R: Realistic</li>
                            </ul>
                        </div>

                        <div className="survey-card3">
                            <h2>Personality Types</h2>
                            <Bar data={barDataVertical} options={barOptionsVertical} style={{ marginTop: '30px' }} />
                            <p>MBTI Result: {surveyData.section3?.type}</p>
                        </div>

                        <div className="survey-card4">
                            <h2>Creativity/Lateral Thinking</h2>
                            <Line data={lineData} options={lineOptions} style={{ marginTop: '30px' }} />
                            <p>Total Score: {surveyData.section4?.total}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SurveyResult;
