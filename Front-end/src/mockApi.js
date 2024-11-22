// mockApi.js

export const mockLoginApi = (studentEmail, studentPassword) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (studentEmail === "test@example.com" && studentPassword === "Password@123") {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: {
                            student_id: 123,
                            token: "mock_jwt_token"
                        }
                    }
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Invalid email or password"
                    }
                });
            }
        }, 1000);
    });
};

export const mockSendVerificationCodeApi = (email) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (email === "newuser@example.com") {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: "Verification code sent to " + email
                    }
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Email is already registered"
                    }
                });
            }
        }, 1000);
    });
};

export const mockSendResetCodeApi = (email) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (email === "registered@example.com") {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: "Verification code sent to " + email
                    }
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Email not registered"
                    }
                });
            }
        }, 1000);
    });
};


export const mockSignupApi = (studentEmail, code, studentPassword) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (code === "123456") {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: "Registration successful"
                    }
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Invalid or expired verification code"
                    }
                });
            }
        }, 1000);
    });
};

export const mockResetPasswordApi = (studentEmail, code, newPassword) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (code === "123456") {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: "Password reset successfully"
                    }
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Invalid or expired verification code"
                    }
                });
            }
        }, 1000);
    });
};

//Academic
export const mockFetchCareersApi = async (studentId) => {
    const mockResponse = {
        code: 1,
        msg: "success",
        data: [
            { foe_code: "0103", foe_name: "Information Systems", ranking: 1, salary_median: "$10,000/month" },
            { foe_code: "0104", foe_name: "Computer Science", ranking: 2, salary_median: "$12,000/month" },
            { foe_code: "0105", foe_name: "Physics", ranking: 3, salary_median: "$11,000/month" },
            { foe_code: "0106", foe_name: "Computer Science", ranking: 4, salary_median: "$12,000/month" },
            { foe_code: "0107", foe_name: "Physics", ranking: 5, salary_median: "$11,000/month" },
        ]
    };

    return new Promise((resolve) => {
        setTimeout(() => resolve(mockResponse), 200); // 模拟0.2秒延迟
    });
};


// Career
export const mockFetchCareerInfo = async (studentId, foeCode) => {
    const mockResponse = {
        code: 1,
        msg: 'success',
        data: {
            career_1: 'Project Implementation Specialist',
            career_2: 'Information Manager',
            career_3: 'Security Analyst',
            career_4: 'Lecturer',
            career_5: 'Consultant',
            salary_min: 85000,
            salary_q1: 95000,
            salary_median: 100000,
            salary_q3: 115000,
            salary_max: 140000,
        },
    };
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 200));
};

export const mockFetchUniversityInfo = async (studentId, foeCode) => {
    const mockResponse = {
        code: 1,
        msg: 'success',
        data: [
            {
                university: 'University of Technology Sydney',
                course: 'Bachelor of Information Systems',
                duration_weeks: 156,
                course_cost: 151200,
                atar_min_non_adj: 69.9,
                atar_med_non_adj: 78.0,
                atar_guaranteed: null,
                admission_center: 'UAC',
                admission_center_code: '603215',
                target_or_reach: 'target',
            },
            {
                "university": "University of Technology Sydney",
                "course": "Bachelor of Information Systems",
                "duration_weeks": 156,
                "course_cost": 151200,
                "atar_min_non_adj": 69.90,
                "atar_med_non_adj": 78.00,
                "atar_guaranteed": null,
                "admission_center": "UAC",
                "admission_center_code": "603215",
                "target_or_reach": "target"
            },
            {
                "university": "University of Technology Sydney",
                "course": "Bachelor of Information Systems",
                "duration_weeks": 156,
                "course_cost": 151200,
                "atar_min_non_adj": 69.90,
                "atar_med_non_adj": 78.00,
                "atar_guaranteed": null,
                "admission_center": "UAC",
                "admission_center_code": "603215",
                "target_or_reach": "target"
            },
        ],
    };
    return new Promise((resolve) => setTimeout(() => resolve(mockResponse), 200));
};


// HelpButton
export const mockHelpApi1 = (studentId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (studentId === '123') {
                resolve({
                    data: {
                        code: 1,
                        msg: "success",
                        data: null,
                    },
                });
            } else {
                resolve({
                    data: {
                        code: 0,
                        msg: "Invalid student ID",
                    },
                });
            }
        }, 100);
    });
};

// InterestHub
export const fetchPosts = (page = 1, pageSize = 16) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const posts = Array.from({ length: pageSize }, (_, index) => ({
                postId: (page - 1) * pageSize + index + 1,
                title: `Post ${index + 1}`,
                context: `This is the content of post ${index + 1}.`,
                foeCodeId: 100 + index,
                createdAt: `2024-10-16T17:31:56`,
                clickNum: 0,
                images: `cover1.png`,
            }));

            resolve({
                data: {
                    code: 1,
                    msg: "success",
                    data: { total: 100, rows: posts }, // Mock total posts
                },
            });
        }, 300);
    });
};

export const mockOperationApi = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Operation data sent:', data); // 用于调试，输出发送的数据
            resolve({
                data: {
                    code: 1,
                    msg: "success",
                    data: null,
                },
            });
        }, 100); // 模拟请求延迟
    });
};


export const mockHelpApi = async () => {
    return {
        code: 1,
        msg: "success",
        data: {
            section1: {
                studentId: 2,
                maxScore: 60,
                p: 15,
                a: 17,
                h: 33,
                l: 22,
                f: 24,
                s: 36,
            },
            section2: {
                studentId: 2,
                maxScore: 60,
                a: 32,
                s: 20,
                i: 25,
                c: 18,
                e: 16,
                r: 27,
            },
            section3: {
                studentId: 2,
                type: "ISFJ",
                p: 0,
                t: 0,
                f: 2,
                s: 3,
                i: 4,
                e: 0,
                n: 0,
                j: 1,
            },
            section4: {
                studentId: 2,
                total: 16,
                q1: 6,
                q2: 7,
                q3: 3,
            },
        },
    };
};

