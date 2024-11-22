import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { mockFetchCareersApi } from './mockApi';  // Import mock API
import './Academic.css';

function Academic() {
    const navigate = useNavigate();  // Get navigate object for routing
    const [careers, setCareers] = useState([]);  // State for career data
    const [errorMessage, setErrorMessage] = useState('');  // State for error messages

    // Fetch career data when the page loads
    useEffect(() => {
        const student_id = localStorage.getItem('student_id');  // Get student_id
        const token = localStorage.getItem('token');  // Get token

        if (student_id) {
            fetch('/api/student/foe-name', {
                method: 'POST',  // Use POST request
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                },
                body: JSON.stringify({ student_id }),  // Send student_id in request body
            })
                .then((response) => response.json())  // Parse response as JSON
                .then((data) => {
                    if (data.code === 1) {
                        setCareers(data.data);  // Set career data
                    } else {
                        setErrorMessage('No career information found.');  // Display message if no data found
                    }
                })
                .catch(() => setErrorMessage('Error fetching career information.'));  // Display error message on request failure
        } else {
            setErrorMessage('Student ID not found.');  // Display message if student_id is missing
        }
    }, []);

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

    const handleCareer = (career) => {
        navigate('/Career', { state: { title: career.foe_name, foe_code: career.foe_code } });
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

                {/* Career bubbles section */}
                <section className="career-bubbles">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {careers.map((career) => (
                        <div
                            key={career.foe_code}
                            className="career-bubble"
                            onClick={() => handleCareer(career)}
                        >
                            <h3>{career.foe_name}</h3>
                            <p>{career.salary_median}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Academic;
