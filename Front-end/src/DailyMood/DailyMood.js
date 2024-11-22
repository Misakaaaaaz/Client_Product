import React, { useState } from 'react';
import styles from './DailyMood.module.css';
import { useNavigate } from 'react-router-dom';

const MoodTrackerPopup = ({ studentId = 1, onSubmit }) => {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleSubmit = () => {
        if (selectedMood !== null) {
            const currentDate = new Date().toISOString().split('T')[0];
            onSubmit({
                studentId: studentId,
                moodDate: currentDate,
                moodScore: selectedMood,
            });
            navigate('../homepage')
        } else {
            alert('Please select a mood before submitting.');
        }
    };

    const handleLater = () => {
        setSelectedMood(null)
        navigate('../homepage')
        onSubmit(null);
    }

    return (
        <div className={styles.moodTrackerPopup}>
            <h2 className={styles.title}>Hi! What's your mood today?</h2>
            <div className={styles.moodOptions}>
                {[1, 2, 3, 4, 5].map((mood) => (
                    <div
                        key={mood}
                        className={`${styles.moodOption} ${selectedMood === mood ? styles.selected : ''}`}
                        onClick={() => handleMoodSelect(mood)}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/daily_mood/${mood}.png`}
                            alt={`Mood ${mood}`}
                            className={styles.moodImage}
                        />
                        <p className={styles.moodLabel}>{['Despondent', 'Frustrated', 'Neutral', 'Content', 'Ecstatic'][mood - 1]}</p>
                    </div>
                ))}
            </div>
            <button className={styles.goButton} onClick={handleSubmit}>GO!</button>
            <button className={styles.maybeLaterButton} onClick={handleLater}>Maybe Later</button>
        </div>
    );
};

export default MoodTrackerPopup;
