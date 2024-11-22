import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SurveyProgress from '../SurveyProgress/SurveyProgress';
import styles from './SurveyPage.module.css';
import axios from 'axios';
import { Radio, Space, Select, Tag, Input } from 'antd';

// Antd Ranking question function
const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    // Define a color array for different ranks
    const colors = ['#ff4d4f', '#faad14', '#52c41a', '#1890ff', '#722ed1'];
    const index = props.index; // Get the current option's index
    const color = colors[index % colors.length]; // Assign color based on index

    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginInlineEnd: 4,
                fontSize: '14px', 
                padding: '5px 10px'
            }}
        >
            {`${index + 1}. ${label}`} {/* Display the ranking order */}
        </Tag>
    );
};

function SurveyPage() {
    const navigate = useNavigate();

    // Get Router Parameters instead of creating state
    const { surveyNum, sectionNum, questionNum } = useParams();

    // Store the answer to response
    const [responses, setResponses] = useState([]);
    const handleResponseChange = (questionId, answer, questionType) => {
        setResponses((prevResponses) => {
            const existingResponseIndex = prevResponses.findIndex((r) => r.questionId === questionId);
            if (existingResponseIndex >= 0) {
                // Update the existing response
                const updatedResponses = [...prevResponses];
                updatedResponses[existingResponseIndex].answer = answer;
                updatedResponses[existingResponseIndex].questionType = questionType;
                return updatedResponses;
            } else {
                // Add a new response
                return [...prevResponses, { questionId, answer, questionType }];
            }
        });
    };

    // Antd - Ratio Component
    const [value, setValue] = useState(null);
    const onChange = (e) => {
        setValue(e.target.value);
        // Monitor User Selection
        console.log("Selected single choice option:", e.target.value);
        handleResponseChange(currentQuestionData.questionId, e.target.value, currentQuestionData.questionType);
    };

    // Antd - Ranking Component
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleRankingChange = (value) => {
        setSelectedOptions(value);;
        // console.log("Selected ranking options (in order):", typeof value);
        handleResponseChange(currentQuestionData.questionId, value, currentQuestionData.questionType);
    };

    // Antd - Input Component
    const { TextArea } = Input;
    const [inputValue, setInputValue] = useState("")
    const handleInputChange = (e) => {
        // Monitor user input
        console.log('Current Input Value:', e.target.value);
        // handleResponseChange(currentQuestionData.questionId, e.target.value);
        setInputValue(e.target.value);
        handleResponseChange(currentQuestionData.questionId, e.target.value, currentQuestionData.questionType);
    };

    const [surveyData, setSurveyData] = useState(null);
    const [surveyProgress, setSurveyProgress] = useState([0, 1]);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        if (!surveyNum || !sectionNum || !questionNum) {
            // axios.get('/test_data/surveyProgress.json')
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            axios.get(`/api/student/answers?studentId=${student_id}&surveyId=1`, {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            })
                .then(progressResponse => {
                    const progress = progressResponse.data.data.surveyAnswerInfo;
                    if (progress.currentSection !== null && progress.currentNumOfQuestion !== null) {
                        // Jump to the corresponding topic according to the progress
                        setSurveyProgress([progress.currentSection, progress.currentNumOfQuestion])
                        navigate(`/survey/${progress.surveyId}/${progress.currentSection}/${progress.currentNumOfQuestion}`);
                    } else {
                        // If there is no progress, the default jump is to the first question
                        navigate(`/survey/1/0/1`);
                    }
                })
                .catch(() => {
                    navigate(`/survey/1/0/1`);
                });
        }
        // axios.get('/test_data/survey.json')
        if (surveyData === null) {
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            axios.get('/api/student/survey/1/all', {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            })
                .then(response => {
                    console.log('Survey Data is Collect!:', response.data.data[0].allSections)
                    setSurveyData(response.data.data[0].allSections);
                })
                .catch(error => {
                    console.error('Error fetching survey data:', error);
                });
        }

        // Initialize state based on saved responses
        const existingResponse = responses.find((r) => r.questionId === currentQuestionData?.questionId);
        if (existingResponse) {
            if (currentQuestionData.questionType === 'single_choice') {
                setValue(existingResponse.answer);
            } else if (currentQuestionData.questionType === 'ranking') {
                setSelectedOptions(existingResponse.answer);
            } else if (currentQuestionData.questionType === 'short_answer') {
                setInputValue(existingResponse.answer);
            }
        }
    }, [navigate, questionNum, sectionNum, surveyNum, surveyData, responses]);

    // initialize the progress
    useEffect(() => {
        if (surveyData && !hasInitialized) {
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            // Load existing responses from surveyProgress.json
            axios.get(`/api/student/answers?studentId=${student_id}&surveyId=1`, {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            })
                .then((progressResponse) => {
                    const savedResponses = progressResponse.data.data.answerStringDetails;
                    const formattedResponses = savedResponses.map((answer) => {
                        const questionId = answer.questionId.toString();
                        const finalAnswerText = answer.finalAnswerText;
                        const questionData = surveyData?.flatMap(section => section.questionsOfSingleSection).find(q => q.questionId === questionId);
                        if (!questionData) return null;

                        let formattedAnswer;
                        if (questionData.questionType === 'single_choice') {
                            const optionId = parseInt(finalAnswerText, 10);
                            const option = questionData.options.find(opt => opt.optionId === optionId);
                            formattedAnswer = option ? option.optionText : '';
                        } else if (questionData.questionType === 'ranking') {
                            const optionIds = finalAnswerText.split(',').map(str => parseInt(str, 10));
                            formattedAnswer = optionIds.map(optionId => {
                                const option = questionData.options.find(opt => opt.optionId === optionId);
                                return option ? option.optionText : '';
                            }).filter(text => text !== '');
                        } else if (questionData.questionType === 'short_answer') {
                            formattedAnswer = finalAnswerText;
                        }
                        return {
                            questionId,
                            answer: formattedAnswer,
                            questionType: questionData.questionType
                        };
                    }).filter(Boolean);
                    setResponses(formattedResponses);
                })
                .catch((error) => {
                    console.error('Error fetching existing responses:', error);
                });
            setHasInitialized(true);
        }
    }, [surveyData, hasInitialized]);


    if (!surveyData) {
        return <div>Loading...</div>;
    }

    // Get current section and question data
    const currentSectionIndex = parseInt(sectionNum, 10);
    const currentQuestionIndex = parseInt(questionNum, 10) - 1;

    const currentSectionData = surveyData[currentSectionIndex];
    const currentQuestionData = currentSectionData.questionsOfSingleSection[currentQuestionIndex];


    const handleNextQuestion = () => {
        // set the final progress, only update if the progress is larger than current one
        if ((currentSectionIndex > surveyProgress[0]) || (currentSectionIndex === surveyProgress[0] && currentQuestionIndex > surveyProgress[1])) {
            setSurveyProgress([currentSectionIndex, currentQuestionIndex + 1])
        }
        
        // Save the current answer
        if (currentQuestionData.questionType === 'short_answer') {
            if (inputValue.trim()) {
                handleResponseChange(currentQuestionData.questionId, inputValue, currentQuestionData.questionType);
            }
        } else {
            if (value || selectedOptions.length > 0) {
                handleResponseChange(currentQuestionData.questionId, value || selectedOptions, currentQuestionData.questionType);
            }
        }

        // Reset state for new question
        setValue(null);
        setSelectedOptions([]);
        setInputValue("");

        if (currentQuestionIndex < currentSectionData.questionsOfSingleSection.length - 1) {
            navigate(`/survey/${surveyNum}/${sectionNum}/${currentQuestionIndex + 2}`);
        } else if (currentSectionIndex < surveyData.length - 1) {
            navigate(`/survey/${surveyNum}/${currentSectionIndex + 1}/1`);
        }
    };

    const handleLastQuestion = () => {
        // set the final progress, only update if the progress is larger than current one
        if ((currentSectionIndex > surveyProgress[0]) || (currentSectionIndex === surveyProgress[0] && currentQuestionIndex > surveyProgress[1])) {
            setSurveyProgress([currentSectionIndex, currentQuestionIndex+1])
        }

        // Save the current answer
        if (currentQuestionData.questionType === 'short_answer') {
            if (inputValue.trim()) {
                handleResponseChange(currentQuestionData.questionId, inputValue, currentQuestionData.questionType);
            }
        } else {
            if (value || selectedOptions.length > 0) {
                handleResponseChange(currentQuestionData.questionId, value || selectedOptions, currentQuestionData.questionType);
            }
        }

        // Reset state for previous question
        setValue(null);
        setSelectedOptions([]);
        setInputValue("");

        if (currentQuestionIndex > 0) {
            navigate(`/survey/${surveyNum}/${sectionNum}/${currentQuestionIndex}`);
        } else if (currentSectionIndex > 0) {
            const prevSection = surveyData[currentSectionIndex - 1];
            navigate(`/survey/${surveyNum}/${currentSectionIndex - 1}/${prevSection.questionsOfSingleSection.length}`);
        }
    };

    const handleSubmit = () => {
        // set the final progress, only update if the progress is larger than current one
        if ((currentSectionIndex > surveyProgress[0]) || (currentSectionIndex === surveyProgress[0] && currentQuestionIndex > surveyProgress[1])) {
            setSurveyProgress([currentSectionIndex, currentQuestionIndex + 1])
        }
        
        if (currentQuestionData.questionType === 'short_answer') {
            if (inputValue.trim()) {
                handleResponseChange(currentQuestionData.questionId, inputValue, currentQuestionData.questionType);
            }
        } else {
            if (value || selectedOptions.length > 0) {
                handleResponseChange(currentQuestionData.questionId, value || selectedOptions, currentQuestionData.questionType);
            }
        }

        const student_id = localStorage.getItem('student_id');  // Get student_id
        // Prepare the data in the required format
        const surveyAnswerInfo = {
            studentId: student_id, //get from localStorage
            surveyId: parseInt(surveyNum, 10),
            currentSection: surveyProgress[0],
            currentNumOfQuestion: surveyProgress[1]
        };

        const answerStringDetails = responses.map((response) => {
            if (response.questionType === 'single_choice') {
                return {
                    questionId: response.questionId,
                    answerText: [response.answer]
                };
            } else if (response.questionType === 'ranking') {
                return {
                    questionId: response.questionId,
                    answerText: response.answer
                };
            } else if (response.questionType === 'short_answer') {
                return {
                    questionId: response.questionId,
                    answerText: [response.answer]
                };
            } else {
                return {
                    questionId: response.questionId,
                    answerText: [response.answer?.toString() || ""]
                };
            }
        });

        const payload = {
            surveyAnswerInfo,
            answerStringDetails
        };

        const token = localStorage.getItem('token');  // Get token
        axios.post('/api/student/answer/text', payload, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then(() => {
                navigate("../homepage");
            })
            .catch((error) => {
                console.error('Error submitting survey responses:', error);
                alert('Error submitting survey responses:', error)
            });
    };

    const handleBack = () => {
        if (currentQuestionData.questionType === 'short_answer') {
            if (inputValue.trim()) {
                handleResponseChange(currentQuestionData.questionId, inputValue, currentQuestionData.questionType);
            }
        } else {
            if (value || selectedOptions.length > 0) {
                handleResponseChange(currentQuestionData.questionId, value || selectedOptions, currentQuestionData.questionType);
            }
        }

        const student_id = localStorage.getItem('student_id');  // Get student_id
        // Prepare the data in the required format
        const surveyAnswerInfo = {
            studentId: student_id, // default value
            surveyId: parseInt(surveyNum, 10),
            currentSection: surveyProgress[0],
            currentNumOfQuestion: surveyProgress[1]
        };

        const answerStringDetails = responses.map((response) => {
            if (response.questionType === 'single_choice') {
                return {
                    questionId: response.questionId,
                    answerText: [response.answer]
                };
            } else if (response.questionType === 'ranking') {
                // console.log(response.answer)
                return {
                    questionId: response.questionId,
                    answerText: response.answer
                };
            } else if (response.questionType === 'short_answer') {
                return {
                    questionId: response.questionId,
                    answerText: [response.answer]
                };
            } else {
                // Addressing other possibilities
                return {
                    questionId: response.questionId,
                    answerText: [response.answer?.toString() || ""]
                };
            }
        });

        const payload = {
            surveyAnswerInfo,
            answerStringDetails
        };

        // Print the JSON object to console
        console.log(JSON.stringify(payload, null, 2));

        const token = localStorage.getItem('token');  // Get token
        axios.post('/api/student/answer/text', payload, {
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
                'Authorization': `Bearer ${token}`,  // Add authorization token
            }
        })
            .then(() => {
                navigate("../homepage");
            })
            .catch((error) => {
                console.error('Error submitting survey responses:', error);
                alert('Error submitting survey responses:', error)
            });
    };

    return (
        <div className={styles.survey_page}>
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
                    <button className="menu-item" onClick={() => navigate('/homepage')}>
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

                <section className={styles.surveyContent}>
                    <SurveyProgress
                        total_sections={surveyData.map((section, index) => `Section${index}: ${section.sectionName}`)}
                        current_section={currentSectionIndex}
                        total_questions={currentSectionData.questionsOfSingleSection.length}
                        current_question={currentQuestionIndex + 1}
                    />

                    <section className={styles.questionContainer}>
                        {/* Section Info */}
                        {(currentQuestionIndex === 0) && (
                            <div className={styles.sectionInfo}>
                                <h2 className={styles.sectionTitle}>Section {currentSectionIndex}: {currentSectionData.sectionName}</h2>
                            </div>
                        )}
                        {/* Question Info */}
                        <div className={styles.questionInfo}>
                            <h3 className={styles.questionTitle}>Question {currentQuestionIndex + 1}</h3>
                            {/* image */}
                            {(currentQuestionData.imgUrl !== null) && (
                                <div className={styles.questionInfoItem}>
                                    <img src={"http://172.20.10.5:8080"+currentQuestionData.imgUrl} alt="img" className={styles.questionInfoImg} />
                                </div>
                            )}
                            {/* text */}
                            {(currentQuestionData.questionText !== null) && (
                                <div className={styles.questionInfoItem}>
                                    <p>{currentQuestionData.questionText}</p>
                                </div>
                            )}
                            {/* description */}
                            {(currentQuestionData.questionDescription !== null) && (
                                <div className={styles.questionInfoItem}>
                                    <p>{currentQuestionData.questionDescription}</p>
                                </div>
                            )}
                            {/* instruction */}
                            {(currentQuestionData.questionInstruction !== null) && (
                                <div className={styles.questionInfoItem}>
                                    <p>{currentQuestionData.questionInstruction}</p>
                                </div>
                            )}
                        </div>

                        {/* Rendering different types of questions using nested ternary operators */}
                        {currentQuestionData.questionType === 'single_choice' ? (
                            <div className={styles.radioContent}>
                                <Radio.Group onChange={onChange} value={value} className={styles.custom_radio}>
                                    <Space direction="vertical" className={styles.optionsList}>
                                        {currentQuestionData.options.map((option, index) => (
                                            <Radio key={index} value={option.optionText} className={styles.optionItem}>
                                                {option.optionText}
                                            </Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </div>
                        ) : currentQuestionData.questionType === 'ranking' ? (
                            <div className={styles.rankingContent}>
                                <Select
                                    mode="multiple"
                                    tagRender={(props) => tagRender({ ...props, index: selectedOptions.indexOf(props.value) })}
                                    placeholder="Please rank your options"
                                    style={{
                                        minWidth: "700px"
                                    }}
                                    onChange={handleRankingChange}
                                    value={selectedOptions}
                                    options={currentQuestionData.options.map(option => ({
                                        value: option.optionText,
                                        label: option.optionText
                                    }))}
                                />
                            </div>
                        ) : (
                            <div className={styles.inputContent}>
                                <TextArea rows={4} placeholder="Please type your answer"
                                    value={inputValue}
                                onChange={handleInputChange} />
                            </div>
                        )}

                        {/* Navigation Button */}
                        <div className={styles.navigationButtons}>
                            {/* Hide Last if it is the first question */}
                            {(currentSectionIndex !== 0 || currentQuestionIndex !== 0) && (
                                <button className={styles.navButton} onClick={handleLastQuestion} disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}>
                                    <b>Last</b>
                                </button>
                            )}
                            {/* Hide Next if it is the last question */}
                            {(currentSectionIndex !== surveyData.length - 1 || currentQuestionIndex !== currentSectionData.questionsOfSingleSection.length - 1) && (
                                <button className={styles.navButton} onClick={handleNextQuestion} disabled={currentSectionIndex === surveyData.length - 1 && currentQuestionIndex === currentSectionData.questionsOfSingleSection.length - 1}>
                                    <b>Next</b>
                                </button>
                            )}
                            {/* Show the Submit button if it is the last question */}
                            {(currentSectionIndex === surveyData.length - 1 && currentQuestionIndex === currentSectionData.questionsOfSingleSection.length - 1) && (
                                <button className={styles.navButton} onClick={handleSubmit}>
                                    <b>Submit!</b>
                                </button>
                            )}
                        </div>
                    </section>
                    <div className={styles.backButton}>
                        <button className="back-btn1" onClick={handleBack}>◀ Back</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SurveyPage;
