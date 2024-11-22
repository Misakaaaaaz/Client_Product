import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockFetchCareerInfo, mockFetchUniversityInfo } from './mockApi';  
import './Career.css';

function Career() {
    const navigate = useNavigate();
    const location = useLocation();
    const careerTitle = location.state?.title;
    const foe_code = location.state?.foe_code;
    const student_id = localStorage.getItem('student_id');

    const [careerList, setCareerList] = useState([]);
    const [salaryNumbers, setSalaryNumbers] = useState([0, 0, 0, 0, 0]);
    const [schoolList, setSchoolList] = useState([]);
    const [introduction, setIntroduction] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');  // Get token
    
        if (student_id && foe_code) {
            // Fetch career information
            fetch('/api/student/career-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                },
                body: JSON.stringify({ student_id, foe_code }),  // Send studentId and foe_code
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 1) {
                        const { career_1, career_2, career_3, career_4, career_5, salary_min, salary_q1, salary_median, salary_q3, salary_max, introduction } = data.data;
                        setCareerList([career_1, career_2, career_3, career_4, career_5]);
                        setSalaryNumbers([salary_min, salary_q1, salary_median, salary_q3, salary_max]);
                        setIntroduction(introduction);
                    } else {
                        setErrorMessage('No career information found.');
                    }
                })
                .catch(() => setErrorMessage('Error fetching career information.'));
    
            // Fetch university information
            fetch('/api/student/university-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                },
                body: JSON.stringify({ student_id, foe_code }),  // Send studentId and foe_code
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 1) {
                        setSchoolList(data.data);
                    } else {
                        setErrorMessage('No university information found.');
                    }
                })
                .catch(() => setErrorMessage('Error fetching university information.'));
        } else {
            setErrorMessage('Student ID or Foe Code not found.');
        }
    }, [student_id, foe_code]);  // Re-run when studentId or foe_code changes

    const handleBack = () => navigate('/Academic');

    // Handlers for navigation between different pages
    const handleInterestHub = () => {
        navigate('/InterestHub');
    };

    const handleAcademic = () => {
        navigate('/Academic');
    };

    const handleHelpPage = () => {
        navigate('/HelpPage');
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        navigate('/login');
    };

    return (
        <div className="academic-page">
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
                    {/* Sidebar navigation buttons */}
                    <button className="menu-item" onClick={() => navigate('/homepage')}>
                        <img src="home-icon.png" alt="Home Icon" className="menu-icon" />
                        Homepage
                    </button>
                    <button className="menu-item" onClick={handleInterestHub}>
                        <img src="interest-icon.png" alt="Interest Icon" className="menu-icon" />
                        Interest Hub
                    </button>
                    <button className="menu-item active" onClick={handleAcademic}>
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

                <section className="career-content">
                    <button className="back-btn1" onClick={handleBack}>◀ Back</button>
                    <h1>{careerTitle}</h1>
                    <h3>Salary (USD/Year)</h3>
                    <div className="number-line-container">
                        <div className="number-labels">
                            {salaryNumbers.map((number, index) => (
                                <span key={index}>{number}</span>
                            ))}
                        </div>
                        <img src="number-line.png" alt="Number Line" className="number-line" />
                        <div className="number-labels">
                            <span>min</span>
                            <span></span>
                            <span>median</span>
                            <span></span>
                            <span>max</span>
                        </div>
                    </div>

                    <p>{introduction}</p>

                    <div className="related-Careers">
                        <h2>Related Careers</h2>
                        {careerList.map((career, index) => (
                            <div className="Careers" key={index}>
                                <img src={`career-icon.png`} alt="Career" className="Careers-icon" />
                                <div className="career-info">
                                    <h3 className="career-name">{career}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="related-schools">
                        <h2>Related Schools and Courses</h2>
                        {schoolList.map((school, index) => (
                            <div className="school" key={index}>
                                <img src={`school1.png`} alt="School" className="school-icon" />
                                <div className="school-info">
                                    <h3 className="school-name">{school.university} · {school.course}</h3>
                                    <div className="school-information">
                                        <span>
                                            Duration: {school.duration_weeks} weeks | 
                                            Cost: ${school.course_cost} | 
                                            ATAR Min: {school.atar_min_non_adj} | 
                                            ATAR Median: {school.atar_med_non_adj} | 
                                            Admission Center: {school.admission_center} | 
                                            Code: {school.admission_center_code} | 
                                            Target or Reach: {school.target_or_reach}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Career;
