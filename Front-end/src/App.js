import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import InterestHub from './InterestHub';
import Login from './Login';
import HelpPage from './HelpPage';
import Academic from './Academic';
import Career from './Career';
import Sidebar from './Sidebar';
import SurveyResult from './SurveyResult';
import SurveyPage from './SurveyPage/SurveyPage'
import CalendarReminder from './CalendarReminder/CalendarReminder';
import HomePage from './HomePage/HomePage'
import DailyMood from './DailyMood/DailyMood'

function App() {
    return (
        <Router>
            <Routes>
                {/* Default jump to /login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/SurveyResult" element={<SurveyResult />} />
                <Route path="/Sidebar" element={<Sidebar />} />
                <Route path="/Career" element={<Career />} />
                <Route path="/Academic" element={<Academic />} />
                <Route path="/login" element={<Login />} />
                <Route path="/InterestHub" element={<InterestHub />} />
                <Route path="/HelpPage" element={<HelpPage />} />
                {/* default path */}
                <Route path="/survey" element={<SurveyPage />} />
                {/* dynamic route */}
                <Route path="/survey/:surveyNum/:sectionNum/:questionNum" element={<SurveyPage />} />
                <Route path="/calendar" element={<CalendarReminder />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/daily_mood" element={<DailyMood />} />
            </Routes>
        </Router>
    );
}

export default App;
