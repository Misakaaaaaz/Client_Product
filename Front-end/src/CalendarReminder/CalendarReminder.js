import React, {useState, useEffect} from 'react'
import styles from './CalendarReminder.module.css'
import { useNavigate } from 'react-router-dom';
import { Badge, Calendar, Select, Button, Drawer, Input, List } from 'antd';
import axios from 'axios'

export default function CalendarReminder() {

    const navigate = useNavigate();
    const [allCalendar, setAllCalendar] = useState(null);
    const [selectedCalendar, setSelectedCalendar] = useState('all'); 
    const [selectedDate, setSelectedDate] = useState(null);

    // Antd: Subscription Drawer
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subscriptionUrl, setSubscriptionUrl] = useState('');
    const [subscriptionName, setSubscriptionName] = useState('');

    // Show Drawer
    const showDrawer = () => {
        setOpen(true);
    };

    // Close Drawer
    const closeDrawer = () => {
        setOpen(false);
        setSubscriptionUrl(''); 
        setSubscriptionName('');
    };

    // Process the subscribe submit
    const handleSubscribe = async () => {
        if (subscriptionUrl && subscriptionName) {
            setLoading(true);
            try {
                const student_id = localStorage.getItem('student_id');  // Get student_id
                const token = localStorage.getItem('token');  // Get token
                const response = await axios.post(`/api/student/tasks/subscribe?calendarUrl=${subscriptionUrl}&subscriptionName=${subscriptionName}&studentId=${student_id}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',  // Set content type to JSON
                        'Authorization': `Bearer ${token}`,  // Add authorization token
                    }
                });
                console.log('Subscription successful:', response.data);
                setLoading(false);
                // Close Drawer after success
                closeDrawer(); 
                await fetchAllCalendar();
            } catch (error) {
                console.error('Error subscribing to calendar:', error);
                alert('Error subscribing to calendar:', error)
                setLoading(false);
            }
        } else {
            alert('Please enter both the subscription URL and the calendar name.');
        }
    };

    const handleUnsubscribe = async (subscriptionName) => {
        setLoading(true);
        try {
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            const response = await axios.delete(`/api/student/tasks/unsubscribe?studentId=${student_id}&descriptionName=${subscriptionName}`, {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            });
            console.log('Unsubscribe successful:', response.data);
            // Update local status to remove deleted subscriptions
            setAllCalendar((prevState) => ({
                ...prevState,
                subscriptions: prevState.subscriptions.filter(sub => sub.subscriptionName !== subscriptionName),
            }));
            setLoading(false);
        } catch (error) {
            console.error('Error unsubscribing from calendar:', error);
            setLoading(false);
        }
    };

    // Requesting and processing Calendar data when initializing a page
    const fetchAllCalendar = async () => {
        try {
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            const response = await axios.get(`/api/student/tasks/tasksWithDatesAndSubscriptions?studentId=${student_id}`, {
                headers: {
                    'Content-Type': 'application/json',  // Set content type to JSON
                    'Authorization': `Bearer ${token}`,  // Add authorization token
                }
            });
            const allCalendarData = response.data.data;
            // Iterate over each subscription and request data for the corresponding subscriptionName
            const updatedSubscriptions = await Promise.all(allCalendarData.subscriptions.map(async (subscription) => {
                const student_id = localStorage.getItem('student_id');  // Get student_id
                const token = localStorage.getItem('token');  // Get token
                const subscriptionResponse = await axios.get(`/api/student/tasks/tasksBySubscription?studentId=${student_id}&subscriptionName=${subscription.subscriptionName}`, {
                    headers: {
                        'Content-Type': 'application/json',  // Set content type to JSON
                        'Authorization': `Bearer ${token}`,  // Add authorization token
                    }
                });
                const subscriptionData = subscriptionResponse.data;
                // Add the dates field to the current subscription
                return {
                    ...subscription,
                    dates: subscriptionData.dates,
                };
            }));

            setAllCalendar({
                ...allCalendarData,
                subscriptions: updatedSubscriptions,
            });
        } catch (error) {
            console.error('Error fetching all alendar data:', error);
        }
    };

    // Requesting and processing Calendar data when initializing a page
    useEffect(() => {
        fetchAllCalendar();
    }, []);

    // Define the event colors
    const colorTypes = ['success', 'error', 'default', 'processing', 'warning', 'info'];
    const statusToColorMap = new Map([
        ['success', '#ffc107'],  
        ['error', '#1E90FF'],    
        ['default', '#F48FB1'],  
        ['processing', '#7B68EE'], 
        ['warning', '#FF7043'],  
        ['info', '#00FA9A'],     
    ]); 


    const descriptionColorMap = new Map();

    const getListData = (value) => {
        let listData = [];

        if (allCalendar && allCalendar.subscriptions) {
            allCalendar.subscriptions.forEach(subscription => {
                // Filter by selectedCalendar
                if (selectedCalendar === 'all' || selectedCalendar === subscription.subscriptionName) {
                    subscription.tasks.forEach(task => {
                        if (task.date === value.format('YYYY-MM-DD')) {
                            const description = task.description || '';

                            // Assign a color status to each description
                            if (!descriptionColorMap.has(description)) {
                                const colorIndex = descriptionColorMap.size % colorTypes.length;
                                descriptionColorMap.set(description, colorTypes[colorIndex]);
                            }

                            const eventColor = statusToColorMap.get(descriptionColorMap.get(description));

                            listData.push({
                                color: eventColor,
                                content: task.name,
                            });
                        }
                    });
                }
            });
        }

        return listData;
    };

    const monthCellRender = (value) => {
        let hasTasks = false;

        if (allCalendar && allCalendar.subscriptions) {
            allCalendar.subscriptions.forEach((subscription) => {
                // Filter by selectedCalendar
                if (selectedCalendar === 'all' || selectedCalendar === subscription.subscriptionName) {
                    subscription.tasks.forEach((task) => {
                        // If the date of the task is in the current month, mark it as having a task
                        if (task.date.startsWith(value.format('YYYY-MM'))) {
                            hasTasks = true;
                        }
                    });
                }
            });
        }

        return hasTasks ? (
            <div className="notes-month">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00bfbf', margin: 'auto' }}></div>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        // Get a list of tasks for this date
        const listData = getListData(value); 
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge color={item.color} text={item.content} /> 
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    // Handle date selection
    const onSelectDate = (value) => {
        setSelectedDate(value);  // Update selected date state
    };

    // Function to get tasks for the selected date
    const getTasksForDate = (date) => {
        let tasks = [];
        if (allCalendar && allCalendar.subscriptions) {
            allCalendar.subscriptions.forEach((subscription) => {
                if (selectedCalendar === 'all' || selectedCalendar === subscription.subscriptionName) {
                    subscription.tasks.forEach((task) => {
                        if (task.date === date.format('YYYY-MM-DD')) {
                            tasks.push(task);
                        }
                    });
                }
            });
        }
        return tasks;
    };

    // Used to align the event tag color with the color in Calendar
    const setTagColor = (element, description) => {
        if (element) {
            let color = statusToColorMap.get(descriptionColorMap.get(description))
            element.style.backgroundColor = color;
        }
    };


    return (
        <div className={styles.calendar_page}>
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
                    <button className="menu-item active" onClick={() => navigate('/calendar')}>
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
                    <section className={styles.calendarContent}>
                        <div className={styles.calendarSidebar}>
                            <Select
                                defaultValue="all"
                                className={styles.calendarSelect}
                                style={{
                                    width: 200,
                                    marginBottom: 20,
                                    border: '3px solid #00bfbf', 
                                    borderRadius: '10px', 
                                }}
                                dropdownStyle={{
                                    backgroundColor: '#00bfbf',
                                    color: 'white',
                                }}
                                onChange={(value) => setSelectedCalendar(value)}
                                options={[
                                    {
                                        value: 'all',
                                        label: 'All Calendars',
                                    },
                                    ...(allCalendar ? allCalendar.subscriptions.map((subscription) => ({
                                        value: subscription.subscriptionName,
                                        label: subscription.subscriptionName,
                                    })) : []),
                                ]}
                            />
                            <section className={styles.todayTasks}>
                                <h3 className={styles.todayTitle}>Upcoming Events</h3>
                                {selectedDate ? (
                                    <ul className={styles.taskList}>
                                        {getTasksForDate(selectedDate).map((task, index) => (
                                            <li key={index} className={styles.taskItem}>
                                                <div className={styles.taskTime}>{task.event_time || 'No time specified'}</div>
                                                <div className={styles.taskName}>{task.name}</div>
                                                <div className={styles.taskTag}>
                                                    <span
                                                        className={styles.taskTagDot}
                                                        // Define Style does not work
                                                        // style={{ backgroundColor: statusToColorMap.get(descriptionColorMap.get(task.description)) || 'white' }}
                                                        ref={(element) => setTagColor(element, task.description)}
                                                    ></span>
                                                    {task.description}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className={styles.noTaskMessage}>Please select a date to see tasks.</p>
                                )}
                            </section>
                        </div>
                        <div className={styles.calendar}>
                            <section className={styles.calendarSubscriber}>
                                <Button type="primary" onClick={showDrawer} style={{ backgroundColor: '#00bfbf', marginBottom: '20px' }}>
                                    Manage your calendar subscription
                                </Button>
                                <Drawer
                                    title="Manage Your Calendar Subscription"
                                    placement="right"
                                    closable
                                    onClose={closeDrawer}
                                    open={open}
                                >
                                    {/* Subscribe a new Calendar Section */}
                                <h3 style={{color: '#00bfbf', marginBottom: '10px' }}>Subscribe a new Calendar</h3>
                                    <Input
                                        placeholder="Enter subscription URL"
                                        value={subscriptionUrl}
                                        onChange={(e) => setSubscriptionUrl(e.target.value)}
                                        className={styles.subscriptionInput}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Input
                                        placeholder="Enter calendar name"
                                        value={subscriptionName}
                                        onChange={(e) => setSubscriptionName(e.target.value)}
                                        className={styles.subscriptionInput}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={handleSubscribe}
                                        loading={loading}
                                        style={{ marginBottom: '20px', backgroundColor: '#00bfbf' }}
                                    >
                                        Subscribe
                                    </Button>

                                    {/* Manage your Calendars Section */}
                                <h3 style={{ color: '#00bfbf', marginBottom: '10px' }}>Manage your Calendars</h3>
                                    <List
                                        bordered
                                        dataSource={allCalendar?.subscriptions || []}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <Button
                                                        type="link"
                                                        danger
                                                        onClick={() => handleUnsubscribe(item.subscriptionName)}
                                                    >
                                                        Unsubscribe
                                                    </Button>
                                                ]}
                                            >
                                                {item.subscriptionName}
                                            </List.Item>
                                        )}
                                    />
                                </Drawer>
                            </section>
                            {/* Ensure that allCalendar data exists before rendering the Calendar */}
                            {allCalendar ? (
                            <Calendar cellRender={cellRender} onSelect={onSelectDate}
                                    style={{ width: '97%', transform: 'scale(0.97)' }} />
                            ) : (
                                <p>Loading calendar data...</p>
                            )}
                        </div>
                    </section>
            </div>
        </div>
    )
}
