import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './HelpPage.css';  // Import CSS file
import { mockHelpApi } from './mockApi';  // Import mock API

function HelpPage() {
    const navigate = useNavigate();  // Get navigate object for routing

    const handleInterestHub = () => {
        navigate('/InterestHub');  // Navigate to Interest Hub page
    };

    const handleAcademic = () => {
        navigate('/Academic');  // Navigate to Academic page
    };

    const handleHelpPage = () => {
        navigate('/HelpPage');  // Navigate to Help page
    };

    // Handle Sign Out and navigate to login page
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        navigate('/login');  // Navigate to login page
    };

    const studentId = localStorage.getItem('student_id');  // Get student ID from localStorage

    // Handle Help Button click, sending studentId and current time to the backend
    const handleHelpClick = async () => {
        const currentTime = new Date().toISOString();  // Get current time in ISO format
        const localTime = new Date(currentTime).toLocaleString();  // Convert to local time for display

        const student_id = localStorage.getItem('student_id'); 
        const requestBody = {
            studentId: student_id,  // Replace with actual student ID
            requestTime: currentTime
        };

        try {
            // Send request to real API
            const token = localStorage.getItem('token');  // Get token
            const response = await fetch('/api/student/help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                },
                body: JSON.stringify(requestBody)  // Convert request body to JSON string
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();  // Parse response data
            console.log('API Response:', data);  // Log API response

            if (data.msg === "success") {
                alert(`Help request sent successfully at ${localTime}`);
            } else {
                alert('Failed to send help request. Please try again.');
            }
        } catch (error) {
            console.error('Error sending help request:', error);
            alert('An error occurred while sending the help request.');
        }
    };

    return (
        <div className="helpPage">
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
                    <button className="menu-item active" onClick={handleHelpPage}>
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

                <section className="help-content">
                    <div className="help-box">
                        <h1 style={{ fontSize: '50px', color: '#00b3b3'}}>NEED HELP?</h1>
                        <p style={{fontSize: '30px', fontWeight: 'normal', marginTop: '20px'}}>Your mental and physical health is important to us!<br />
                            If mental or physical assistance is needed,<br />
                            <b style={{ color: 'red' }}>FEEL FREE</b> to contact us.<br />
                            If you need emergency help, please press it!</p>
                        <button className="help-button" style={{ transform: 'scale(1.5)', marginTop: '100px' }} onClick={handleHelpClick}>
                            HELP!!!
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default HelpPage;
