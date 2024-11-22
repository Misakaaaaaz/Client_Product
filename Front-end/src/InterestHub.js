import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterestHub.css'; // Import CSS file
import { fetchPosts, mockOperationApi } from './mockApi'; // Import mock APIs
import { Tag } from 'antd';

function InterestHub() {
    const [posts, setPosts] = useState([]); // Store the list of posts
    const [hasMore, setHasMore] = useState(true); // Whether there are more posts to load
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [selectedPost, setSelectedPost] = useState(null); // Currently selected post
    const [viewStartTime, setViewStartTime] = useState(null); // Track the start time of post view
    const [page, setPage] = useState(1); // Current page number
    const pageSize = 5; // Number of posts per page

    const loadMoreRef = useRef(null); // Monitor DOM position
    const navigate = useNavigate(); // Hook for routing

    // Load posts data
    const loadPosts = async (pageNum) => {
        try {
            setIsLoading(true); // Mark as loading
            const student_id = localStorage.getItem('student_id');  // Get student_id
            const token = localStorage.getItem('token');  // Get token
            const response = await fetch(
                `/api/student/interesting-hub/post?page=${pageNum}&pageSize=2`
                , {
                    headers: {
                        'Content-Type': 'application/json',  // Set content type to JSON
                        'Authorization': `Bearer ${token}`,  // Add authorization token
                    }
            }); // Call API with pagination
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); // Parse JSON response
            console.log('API Response:', data); 
    
            if (data.code === 1 && data.data && Array.isArray(data.data.rows)) {
                const newPosts = data.data.rows;
                console.log('New Posts:', newPosts); 
    
                // const addressPrefix = 'http://172.20.10.5:8080'; 
                const addressPrefix = 'http://172.26.117.4:8080'; 
    
                const updatedPosts = newPosts.map((post) => ({
                    ...post,
                    images: post.images.map((img) => ({
                        ...img,
                        imgUrl: `${addressPrefix}${img.imgUrl}`,
                    })),
                }));
    
                console.log('Updated Posts with Full URLs:', updatedPosts);
    
                if (updatedPosts.length === 0) {
                    setHasMore(false); // No more posts to load
                    return;
                }
   
                setPosts((prevPosts) =>
                    pageNum === 1 ? updatedPosts : [...prevPosts, ...updatedPosts]
                );
    
                if (updatedPosts.length < 2) {
                    setHasMore(false);
                }
            } else {
                console.error('Unexpected API response:', data);
            }
        } catch (error) {
            console.error('Failed to load posts:', error); // Log any errors
        } finally {
            setIsLoading(false); // Mark loading as complete
        }
    };
    
    console.log("!!!!!!!!!!!!!!!!!!!!!", posts)
    // Initial load of the first page
    useEffect(() => {
        loadPosts(page);
    }, [page]);

    // Setup IntersectionObserver to load more posts on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    console.log('Loading more posts...');
                    setPage((prevPage) => prevPage + 1); // Increment page number
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasMore, isLoading]);

    const handlePostClick = (post) => {
        setSelectedPost(post); // Open post details
        setViewStartTime(Date.now()); // Record view start time
    };

    const closeModal = async () => {
        if (selectedPost && viewStartTime) {
            const viewDuration = Date.now() - viewStartTime; // Calculate view duration in milliseconds
    
            const requestBody = {
                studentId: 1, // Assume studentId is 1 for the current user
                postId: selectedPost.postId,
                viewDuration: viewDuration,
            };
    
            try {
                const student_id = localStorage.getItem('student_id');  // Get student_id
                const token = localStorage.getItem('token');  // Get token

                const response = await fetch(
                    '/api/student/interesting-hub/operation', // Real API endpoint
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',  // Set content type to JSON
                            'Authorization': `Bearer ${token}`,  // Add authorization token
                        },
                        body: JSON.stringify(requestBody), // Send request body as JSON
                    }
                );
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json(); // Parse JSON response
                console.log('View duration logged:', data); // Log response from real API
    
                if (data.code === 1) {
                    console.log('View duration (ms):', viewDuration); // Log the view duration
                }
            } catch (error) {
                console.error('Failed to send operation data:', error); // Log any errors
            }
        }
    
        setSelectedPost(null); // Close the modal
    };
    

    const handleInterestHub = () => navigate('/InterestHub');
    const handleAcademic = () => navigate('/Academic');
    const handleHelpPage = () => navigate('/HelpPage');
    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('student_id');
        navigate('/login');
    }

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
                    <button className="menu-item" onClick={() => navigate('/homepage')}>
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

                <section className="post-grid">
                    {posts.map((post, index) => {
                        const imageUrl = post.images && post.images.length > 0
                            ? post.images[0].imgUrl 
                            : '/placeholder.png'; 

                        return (
                            <div
                                className="post-card"
                                key={`${post.postId}-${index}`}
                                onClick={() => handlePostClick(post)}
                            >
                                <img
                                    src={imageUrl}
                                    alt={post.title}
                                    className="post-image"
                                    onError={(e) => {
                                        e.target.src = 'Close.png'; 
                                    }}
                                />
                                <h3>{post.title}</h3>
                            </div>
                        );
                    })}
                    <div ref={loadMoreRef} className="load-more">
                        {isLoading
                            ? 'Loading more posts...'
                            : hasMore
                            ? 'Scroll to load more'
                            : 'No more posts available.'}
                    </div>
                </section>

            </div>

            {selectedPost && (
                <div className="modal">
                    <div className="modal-content" style={{
                        border: '6px solid #00b3b3',
                        borderRadius: '15px',
                        padding: '10px',
                    }} >
                        <button className="close-modal" onClick={closeModal}>
                            <img src="Close.png" alt="Close" />
                        </button>

                        <img 
                            src={
                                selectedPost.images && selectedPost.images.length > 0
                                    ? selectedPost.images[0].imgUrl 
                                    : '/placeholder.png'
                            } 
                            alt={selectedPost.title} 
                            className="modal-image"
                            onError={(e) => {
                                e.target.src = 'Close.png'; 
                            }}
                        />

                        <h2>{selectedPost.title}</h2>
                        <div className="modal-body">
                            <div style={{
                                borderRadius: '15px',
                                padding: '10px',
                                backgroundColor: 'rgba(173, 216, 230, 0.3)',
                                lineHeight: '1.5',
                                marginBottom: '20px'
                            }}>
                                <p className="modal-context">{selectedPost.context}</p>
                            </div>
                            <p>
                                <strong>Post on:</strong> {selectedPost.createdAt.replace('T', ' ')}
                            </p>
                            <Tag color="cyan" style={{
                                marginTop: '15px',
                                fontSize: '18px',
                                padding: '5px 10px',
                                fontWeight: 'bold'
                            }}>{selectedPost.foeName}</Tag>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InterestHub;
