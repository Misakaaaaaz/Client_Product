import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { Card } from 'antd';
import MoodDoughnutChart from './MoodDoughnutChart'
import DailyMood from '../DailyMood/DailyMood'
import SurveyProgress from '../SurveyProgress/SurveyProgress';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Line, Bar } from 'recharts';
import { UserOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function HomePage() {
    const navigate = useNavigate();

    const [careerInterest, setCareerInterest] = useState([]);
    const [moodData, setMoodData] = useState([]);
    const [academic, setAcademic] = useState([]);
    const [educationSystem, setEducationSystem] = useState("");
    const [percentile, setPercentile] = useState(0);
    const [personalInfo, setPersonalInfo] = useState(null);
    const [isDailyMoodOpen, setIsDailyMoodOpen] = useState(false);
    const [surveyProgress, setSurveyProgress] = useState(null)
    const [loadDailyMood, setLoadDailyMood] = useState(true);

    useEffect(() => {
        // Get Personal Info
        // axios.get('/test_data/personalInfo.json')
        const student_id = localStorage.getItem('student_id');  // Get student_id
        const token = localStorage.getItem('token');  // Get token
        axios.get(`/api/student/personal-info/${student_id}`, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then(response => {
                if (response.data.code === 1) {
                    setPersonalInfo(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching personal info:', error);
            });
        
        // Career Interest
        // axios.get('/test_data/careerInterest.json')
        axios.get(`/api/student/career-interest/${student_id}`, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then(response => {
                const careerInterests = response.data.data
                    .filter(item => item.ranking <= 3)
                    .map(item => ({
                        rank: `No.${item.ranking}`,
                        title: item.foeName
                    }));
                setCareerInterest(careerInterests)
                // console.log(careerInterests);
            })
            .catch(error => {
                console.error('Error fetching career interest data:', error);
            });
        
        // Daily Mood, use loadDailyMood to control the initializing and reloading
        if (loadDailyMood === true) {
            // axios.get('/test_data/recentDailyMood.json')
            axios.get(`/api/student/week-mood/${student_id}`, {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            })
                .then(response => {
                    if (response.data.code === 1) {
                        const moodEntries = response.data.data;
                        setMoodData(response.data.data);

                        // Determine if an emotional state has been recorded for the day
                        const today = new Date().toISOString().split('T')[0];
                        const hasTodayMood = moodEntries.some(entry => entry.moodDate === today);
                        // Show popups when there is no emotional state for the day
                        if (!hasTodayMood) {
                            setIsDailyMoodOpen(true);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching mood data:', error);
                });
            setLoadDailyMood(false)
        }
        
        // Academic Performance
        // axios.get('/test_data/basicAndAcademic.json')
        axios.get(`/api/student/academic-info/${student_id}`, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then((response) => {
                const performances = response.data.data.performances;
                const formattedData = performances.map(item => ({
                    subjectName: item.subjectName,
                    scorePercentage: (item.scoreObtained / item.scoreTotal) * 100,
                    medianPercentage: (item.scoreMedian / item.scoreTotal) * 100,
                }));

                setAcademic(formattedData);

                // Set education system and percentile
                setEducationSystem(response.data.data.country.educationSystem);
                setPercentile(response.data.data.studentInfo.percentile);
            })
            .catch((error) => {
                console.error('Error fetching academic performance:', error);
            });
        
        // Survey Progree
        // axios.get('test_data/surveyProgress.json')
        axios.get(`/api/student/answers?studentId=${student_id}&surveyId=1`, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then((response) => { 
                const surveyInfo = response.data.data.surveyAnswerInfo;
                const temp_surveyProgress = [
                    surveyInfo.totalSections.map(num => `Section${String(num)}`),
                    surveyInfo.currentSection,
                    surveyInfo.currentSectionTotalQuestions,
                    surveyInfo.currentNumOfQuestion
                ];
                setSurveyProgress(temp_surveyProgress)
            })
            .catch((error) => {
                console.error('Error fetching survey progress:', error);
            })
    }, [loadDailyMood]);

    if (!personalInfo) {
        return <div>Loading...</div>;
    }

    // Personal Info Process
    const { firstName, middleName, lastName, studentEmail, currentCity, currentCountry, age } = personalInfo;
    const fullName = middleName
        ? `${lastName} ${middleName} ${firstName}`
        : `${lastName} ${firstName}`;
    const location = `${currentCity}, ${currentCountry}`;


    return (
        <div className={styles.home_page}>
            {/* Daily Mood */}
            {isDailyMoodOpen && (
                <Modal
                    isOpen={isDailyMoodOpen}
                    onRequestClose={() => setIsDailyMoodOpen(false)}
                    style={{
                        content: {
                            inset: '0',
                            padding: '0',
                            border: 'none',
                            background: 'none',
                            zIndex: '1002'
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            zIndex: '1001'
                        }
                    }}
                >
                    <DailyMood
                        studentId={personalInfo?.studentId}
                        onSubmit={(data) => {
                            // Close the pop-up
                            setIsDailyMoodOpen(false);
                            if (data) {
                                // User Click Go
                                const student_id = localStorage.getItem('student_id');  // Get student_id
                                const token = localStorage.getItem('token');  // Get token
                                axios.post('/api/student/daily-mood', data, {
                                    headers: {
                                        'Content-Type': 'application/json',  // Set content type to JSON
                                        'Authorization': `Bearer ${token}`,  // Add authorization token
                                    }
                                })
                                    .then((response) => {
                                        setLoadDailyMood(true)
                                    })
                                    .catch((error) => {
                                        console.error('Error sending daily mood:', error);
                                    });

                                console.log('Daily Mood Submitted:', data);
                                // setLoadDailyMood(true)
                            } else {
                                // User Click MaybeLater
                                console.log('User chose Maybe Later.');
                            }
                        }}
                    />
                </Modal>
            )}

            <header className="topbar">
                <div className="logo">
                    <img src={`${process.env.PUBLIC_URL}/logo1.png`} alt="OIC Logo" className="logo-image" />
                    <h2>OIC Education</h2>
                </div>
                <div className="user-info">
                    <span>User1</span>
                    <img src={`${process.env.PUBLIC_URL}/User1.png`} alt="User Avatar" className="user-avatar" />
                </div>
            </header>

            <div className="main-content">
                <nav className="sidebar">
                    <button className="menu-item active" onClick={() => navigate('/homepage')}>
                        <img src={`${process.env.PUBLIC_URL}/home-icon.png`} alt="Home Icon" className="menu-icon" />
                        Homepage
                    </button>
                    <button className="menu-item" onClick={() => navigate('/InterestHub')}>
                        <img src={`${process.env.PUBLIC_URL}/interest-icon.png`} alt="Interest Icon" className="menu-icon" />
                        Interest Hub
                    </button>
                    <button className="menu-item" onClick={() => navigate('/Academic')}>
                        <img src={`${process.env.PUBLIC_URL}/academic-icon.png`} alt="Academic Icon" className="menu-icon" />
                        Academic & Career
                    </button>
                    <button className="menu-item" onClick={() => navigate('/calendar')}>
                        <img src={`${process.env.PUBLIC_URL}/calendar-icon.png`} alt="Calendar Icon" className="menu-icon" />
                        Calendar
                    </button>
                    <button className="menu-item" onClick={() => navigate('/HelpPage')}>
                        <img src={`${process.env.PUBLIC_URL}/help-icon.png`} alt="Help Icon" className="menu-icon" />
                        Help Button
                    </button>
                    <div className="settings">
                        <button className="menu-item">
                            <img src={`${process.env.PUBLIC_URL}/settings-icon.png`} alt="Settings Icon" className="menu-icon" />
                            Settings
                        </button>
                        <button className="menu-item" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('student_id');
                            navigate('/login')
                        }}>
                            <img src={`${process.env.PUBLIC_URL}/signout-icon.png`} alt="Sign Out Icon" className="menu-icon" />
                            Sign Out
                        </button>
                    </div>
                </nav>

                <section className={styles.homeContent}>
                    <div style={{ width: '75%', alignSelf: 'center' }}>
                        <div className={styles.homeItem}>
                            {/* Profile Card */}
                            <Card
                                style={{
                                    width: '100%',
                                    maxWidth: '600px',
                                    // height: '100%',
                                    minHeight: '280px',
                                    backgroundColor: '#e0f7f7',
                                    color: '#00b3b3',
                                    border: 'none',
                                    position: 'relative',
                                    padding: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                {/* Title */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 16,
                                        fontWeight: 'bolder',
                                        fontSize: '20px',
                                        color: '#00b3b3',
                                    }}
                                >
                                    Profile
                                </div>

                                {/* User Image */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 50,
                                        left: 16,
                                        width: '190px',
                                        height: '190px',
                                        borderRadius: '50%',
                                        background: `url(${process.env.PUBLIC_URL}/career-icon.png) no-repeat center/cover`,
                                    }}
                                ></div>

                                {/* User Info */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 55,
                                        left: 220,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        color: '#595959',
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', fontSize: '44px', marginBottom: '8px', color: '#00b3b3' }}>{fullName}</div>
                                    <div style={{ position: 'absolute', left: 10 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                            <UserOutlined style={{ marginRight: '8px' }} />
                                            Age {age}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                            <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                            {location}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <MailOutlined style={{ marginRight: '8px' }} />
                                            {studentEmail}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Daily Mood Card */}
                            <Card
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    height: '100%',
                                    maxHeight: '280px',
                                    backgroundColor: '#00AAAA',
                                    color: '#fff',
                                    border: 'none',
                                    position: 'relative',
                                    padding: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                {/* Title */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 16,
                                        fontWeight: 'bolder',
                                        fontSize: '20px',
                                        color: '#fff',
                                    }}
                                >
                                    Daily Mood
                                </div>
                                {/* Description */}
                                <p style={{
                                    position: 'absolute',
                                    top: 40,
                                    left: 16,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#D6D6D6',
                                }}>
                                    Visualization of moods for last 15 days
                                </p>
                                {/* MoodDoughnutChart Component */}
                                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                    <MoodDoughnutChart moodData={moodData} />
                                </div>
                            </Card>
                        </div>
                        <div className={styles.homeItem}>
                            {/* Career Interest Card */}
                            <Card
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    height: '100%',
                                    maxHeight: '300px',
                                    backgroundColor: '#e0f7f7',
                                    color: '#00b3b3',
                                    border: 'none',
                                    position: 'relative',
                                    padding: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                {/* Title */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 16,
                                        fontWeight: 'bolder',
                                        fontSize: '20px',
                                        color: '#00b3b3',
                                    }}
                                >
                                    Career Interest
                                </div>
                                {/* Description */}
                                <p style={{
                                    position: 'absolute',
                                    top: 40,
                                    left: 16,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#AAAAAA',
                                }}>
                                    The Top3 Career Interest of You
                                </p>

                                {/* "View More" Button */}
                                <button
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 16,
                                        backgroundColor: '#00b3b3',
                                        color: '#fff',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        outline: 'none',
                                    }}
                                    onClick={() => navigate('/Academic')}
                                >
                                    View more
                                </button>
                                {/* List of Interests */}
                                <div style={{ marginTop: '60px' }}>
                                    {careerInterest.map((item, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                            <div
                                                style={{
                                                    flex: '1',
                                                    backgroundColor: '#00b3b3',
                                                    color: '#fff',
                                                    padding: '12px',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span>{item.rank}</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Survey Progress */}
                            <Card
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    maxWidth: '600px',
                                    height: '100%',
                                    maxHeight: '300px',
                                    backgroundColor: '#00AAAA',
                                    color: '#fff',
                                    border: 'none',
                                    position: 'relative',
                                    padding: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                {/* Title */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 16,
                                        fontWeight: 'bolder',
                                        fontSize: '20px',
                                        color: '#fff',
                                    }}
                                >
                                    Your Survey
                                </div>
                                {/* Description */}
                                <p style={{
                                    position: 'absolute',
                                    top: 40,
                                    left: 16,
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#D6D6D6',
                                }}>
                                    Here is the progress of your survey
                                </p>
                                {/* SurveyProgress Component */}
                                <div style={{
                                    // marginTop: '40px', textAlign: 'center'
                                    position: 'absolute',
                                    top: 100,
                                    left: 17,
                                    // flex: 1,
                                    // display: 'flex',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    // width: '100%',
                                    // height: '100%',
                                }}>
                                    {/* Make sure the Card Component applies display: flex, or the linking line will be hidden */}
                                    {surveyProgress && <SurveyProgress
                                        total_sections={surveyProgress[0]}
                                        current_section={surveyProgress[1]}
                                        total_questions={surveyProgress[2]}
                                        current_question={surveyProgress[3] - 1}
                                        // Make the component smaller
                                        custom_style={{
                                            transform: 'scale(0.8)',
                                            transformOrigin: 'top left',
                                            // width: '50%'
                                            gap: '5px'
                                        }}
                                    />}
                                </div>
                                {/* Buttons */}
                                <div
                                    style={{
                                        marginTop: '165px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '30px',
                                        width: '100%',
                                    }}
                                >
                                    <button
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#00AAAA',
                                            border: '2px solid #00AAAA',
                                            borderRadius: '25px',
                                            padding: '15px 25px',
                                            fontSize: '18px',
                                            fontWeight: "bold",
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s, color 0.3s',
                                        }}
                                        onClick={() => { navigate('../survey') }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#00AAAA';
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fff';
                                            e.currentTarget.style.color = '#00AAAA';
                                        }}
                                    >
                                        Jump to Your Survey
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: '#fff',
                                            color: '#00AAAA',
                                            border: '2px solid #00AAAA',
                                            borderRadius: '25px',
                                            padding: '15px 25px',
                                            fontSize: '18px',
                                            fontWeight: "bold",
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s, color 0.3s',
                                        }}
                                        onClick={() => { navigate('../surveyResult') }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#00AAAA';
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fff';
                                            e.currentTarget.style.color = '#00AAAA';
                                        }}
                                    >
                                        View Your Survey Result
                                    </button>
                                </div>
                            </Card>
                        </div>
                        <div className={styles.homeItem} style={{ marginBottom: '100px' }}>
                            {/* Academic Performance */}
                            <Card
                                style={{
                                    width: '100%',
                                    maxWidth: '1020px',
                                    height: '100%',
                                    maxHeight: '400px',
                                    backgroundColor: '#e0f7f7',
                                    color: '#00b3b3',
                                    border: 'none',
                                    position: 'relative',
                                    padding: '16px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                            >
                                {/* Title */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        left: 16,
                                        fontWeight: 'bolder',
                                        fontSize: '20px',
                                        color: '#00b3b3',
                                    }}
                                >
                                    Academic Performance
                                </div>

                                {/* Additional Fields - Education System and Percentile */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 16,
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: '#00b3b3',
                                    }}
                                >
                                    <div>Education System: {educationSystem}</div>
                                    <div>Percentile in System: {(percentile * 100).toFixed(2)}%</div>
                                </div>

                                {/* Academic Form */}
                                <ResponsiveContainer width="100%" height={350}>
                                    <ComposedChart data={academic}>
                                        <XAxis dataKey="subjectName" />
                                        <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip formatter={(value, name) => `${value.toFixed(2)}%`} />
                                        <Legend />

                                        <Bar dataKey="scorePercentage" name="Student Score (%)" fill="#00b3b3" barSize={30} />
                                        {/* #8884d8 */}
                                        <Line dataKey="medianPercentage" name="Median Score (%)" stroke="#ff7300" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}
