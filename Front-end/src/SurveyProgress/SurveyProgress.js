import React from 'react';
import styles from './SurveyProgress.module.css';

function SurveyProgress({ total_sections, current_section, total_questions, current_question, custom_style={}}) {
    return (
        <div className={styles.surveyProgress} style={custom_style}>
            {total_sections.map((section, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`${styles.sectionBubble} ${index < current_section
                                ? styles.completed
                                : index === current_section
                                    ? styles.current
                                    : styles.notYet
                            }`}
                    >
                        <span className={styles.sectionTitle}>{section}</span>
                        <span className={styles.sectionStatus}>
                            {index < current_section
                                ? 'Completed'
                                : index === current_section
                                    // If the section is in progress, shows the question progress of this section
                                    ? `${current_question}/${total_questions}`
                                    : 'Not yet'}
                        </span>
                    </div>
                    {index < total_sections.length - 1 && (
                        <span
                            className={`${styles.connector} ${index < current_section ? styles.connectorCompleted : ''
                                }`}
                        ></span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}


export default SurveyProgress;
