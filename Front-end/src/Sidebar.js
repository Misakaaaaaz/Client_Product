import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import './HelpPage.css';  // Import CSS file

function HelpPage() {
    const navigate = useNavigate();  // Get navigate object for routing

    // Navigation handlers
    const handleInterestHub = () => {
        navigate('/InterestHub');  // Navigate to Interest Hub page
    };

    const handleAcademic = () => {
        navigate('/Academic');  // Navigate to Academic page
    };

    const handleHelpPage = () => {
        navigate('/HelpPage');  // Navigate to Help page
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        navigate('/login');  // Navigate to login page
    };

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
                    <button className="menu-item">
                        <img src="home-icon.png" alt="Home Icon" className="menu-icon" />
                        Homepage
                    </button>
                    <button className="menu-item active" onClick={handleInterestHub}>
                        <img src="interest-icon.png" alt="Interest Icon" className="menu-icon" />
                        Interest Hub
                    </button>
                    <button className="menu-item" onClick={handleAcademic}>
                        <img src="academic-icon.png" alt="Academic Icon" className="menu-icon" />
                        Academic & Career
                    </button>
                    <button className="menu-item">
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
            </div>
        </div>
    );
}

export default HelpPage;
