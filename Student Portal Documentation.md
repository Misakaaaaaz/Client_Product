# COMP5615 F12_02_P42

## API Document

Note that except for the three functions of login, registration, and forgotten password, other functions require valid token request data，The format is as follows.

### 1. Login&Register

#### 1.1 Send Verification Code API To Register

- Basic Info

  ```
  Request URL：/api/student/send-code
  
  Request ：POST
  
  API Description： Sending verification code to the registered email for user registration.
  ```

- Request 

  Format：json

  Explanation：

  | Parameter Name    | Data Type | If Mandatory | Comment |
  | ----------------- | --------- | ------------ | ------- |
  | studentEmail      | string    | Yes          | /       |
  | verification code |           |              |         |

  Request Sample：

  ~~~json
  {
      	"studentEmail": "user@example.com",
        "code": "123456",  // Verification code received from send code API
        "studentPassword": "your_password",
     
  }
  ~~~
  
- Response

  Format：json

  Explanation：

  | Parameter Name | Data Type | Whether Mandatory | Comment                          |
  | -------------- | --------- | ----------------- | -------------------------------- |
  | code           | number    | Yes               | Response Code，1-success，0-fail |
  | msg            | string    | No                | /                                |
  | data           | object    | No                | /                                |

  Response Sample：

  ~~~json
  {
      "code": 1,
      "msg": "success",
      "data": "Verification code sent to user@example.com"
  }
  ~~~



#### 1.2 Login

- Basic info

  ~~~
  URL：/api/student/login
  
  Method：POST
  
  Description：User login, validating email and password, returning JWT. 
  ~~~

- Request

  Format：json

  Explanation：

  | Parameter Name | Data Type | If mandatory | Comment |
  | -------------- | --------- | ------------ | ------- |
  | username       | string    | Yes          | /       |
  | password       | string    | Yes          | /       |

  Example：

  ~~~json
  {
      "studentEmail": "user@example.com",
      "studentPassword": "your_password"
  }
  ~~~

- Response

  Format：json

  Explanation：

  | Parameter Name | Data Type | If mandatory | Comment |
  | -------------- | --------- | ------------ | ------- |
  | code           | number    | Yes          | /       |
  | msg            | string    | No           | /       |
  | data           | string    | Yes          | /       |

  Example：

  ~~~json
  {
      "code": 1,
      "msg": "success",
      "data": { 
          "student_id": 123
          "token": "your_jwt_token",
         
      }
  }
  ~~~



#### 1.3 Reset Password

- Basic Info

  ```
  URL: /api/student/forgotpassword/reset
  Method: POST
  Description: Validate the verification code and reset the user password.
  ```

- Request Body

  ```
  {
      "studentEmail": "user@example.com",
      "code": "123456",  // Verification code received from send code API
      "newPassword": "new_password"
  }
  ```

- Response 

  ```
  {
      "code": 1,
      "msg": "success",
      "data": "Password reset successfully"
  }
  ```

  

### 2. Survey&Display

#### 2.1 All Section Questions Query

- Basic Info

  ```
  URL：/api/student/survey/{surveyID}/all
  
  Method：GET
  
  Description：get questions of certain survey 
  ```

- Request

  /

- Response

  Format：json

  Explanation：

  | Parameter Name                    | Data Type | Comment |
  | --------------------------------- | --------- | ------- |
  | code                              | number    | /       |
  | msg                               | string    | /       |
  | data                              | object    | /       |
  | \|- surveyId                      | Number    | /       |
  | \|- surveyName                    | string    | /       |
  | \| - surveyDescription            | string    | /       |
  | \| - createdAt                    | datetime  | /       |
  | \| - allSections                  | object[]  | /       |
  | \|- \|- sectionId                 | string    | /       |
  | \|- \|- sectionNumOfSurvey        | string    | /       |
  | \|- \| - sectionName              | string    | /       |
  | \|- \|- surveyId                  | number    | /       |
  | \|- \|- questionsOfSingleSection  | object[]  | /       |
  | \|- \|- \| - questionId           | number    | /       |
  | \|- \|- \| - questionNumOfSection | number    | /       |
  | \|- \|- \| - questionName         | string    | /       |
  | \|- \|- \|- questionText          | string    | /       |
  | \|- \|- \|- questionDescription   | string    | /       |
  | \|- \|- \|- questionInstruction   | string    | /       |
  | \|- \|- \|- questionType          | string    | /       |
  | \|- \|- \|- imgurl                | string    | /       |
  | \|- \|- \|- sectionId             | number    | /       |
  | \|- \|- \|- options               | object[]  | /       |
  | \|- \|- \|- optionId              | number    | /       |
  | \|- \|- \|- optionText            | string    | /       |
  | \|- \|- \|-  optionMeaning        | String    | /       |
  
  Example：
  
  ```json
  {
      "code": 1,
      "msg": "success",
      "data": [
          {
              "surveyId": 1,
              "surveyName": "OIC Education Oxford Career Choice Assessment",
              "surveyDescription": "This survey assesses is a dummy survey.",
              "createdAt": "2024-09-10T15:30:06",
              "allSections": [
                  {
                      "sectionId": 5,
                      "sectionNumOfSurvey": 0,
                      "sectionName": "Information About You",
                      "surveyId": 1,
                      "questionsOfSingleSection": [
                          {
                              "questionId": "12",
                              "questionNumOfSection": 1,
                              "questionName": null,
                              "questionText": "Your Email",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "13",
                              "questionNumOfSection": 2,
                              "questionName": null,
                              "questionText": "Your Name",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "14",
                              "questionNumOfSection": 3,
                              "questionName": null,
                              "questionText": "Your first language",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "15",
                              "questionNumOfSection": 4,
                              "questionName": null,
                              "questionText": "If other, what's your first language?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "16",
                              "questionNumOfSection": 5,
                              "questionName": null,
                              "questionText": "Your usual country of residence",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "17",
                              "questionNumOfSection": 6,
                              "questionName": null,
                              "questionText": "If other, what's your usual country of residence?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "18",
                              "questionNumOfSection": 7,
                              "questionName": null,
                              "questionText": "Your age",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "19",
                              "questionNumOfSection": 8,
                              "questionName": null,
                              "questionText": "If other, what's your age please?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "20",
                              "questionNumOfSection": 9,
                              "questionName": null,
                              "questionText": "Which school year are you in?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "21",
                              "questionNumOfSection": 10,
                              "questionName": null,
                              "questionText": "If other, which school year are you in?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "22",
                              "questionNumOfSection": 11,
                              "questionName": null,
                              "questionText": "In which country is your school located?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "23",
                              "questionNumOfSection": 12,
                              "questionName": null,
                              "questionText": "If other, which country is your school located?",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          },
                          {
                              "questionId": "24",
                              "questionNumOfSection": 13,
                              "questionName": null,
                              "questionText": "Your parent's email",
                              "questionDescription": null,
                              "questionInstruction": null,
                              "questionType": "short_answer",
                              "imgUrl": null,
                              "sectionId": "5",
                              "options": []
                          }
                      ]
                  },
                  {
                      "sectionId": 1,
                      "sectionNumOfSurvey": 1,
                      "sectionName": "Your Values",
                      "surveyId": 1,
                      "questionsOfSingleSection": [
                          {
                              "questionId": "1",
                              "questionNumOfSection": 1,
                              "questionName": "Lottery Win",
                              "questionText": "If you won a lot of money on the lottery (assuming you’re now 18), what would you do first? ",
                              "questionDescription": null,
                              "questionInstruction": "Rate, in rank order, the thing you are most likely to do, down to the thing you are least likely to do (1= Most Likely, 6 = Least Likely) Whilst we appreciate that you may want to give two options the same rank, please avoid this. \nGive a rank of 1, 2, 3, 4, 5 or 6 to each option. Clearly write your rank number next to each question number (ignore the box which includes a letter – this is for scoring purposes only). ",
                              "questionType": "ranking",
                              "imgUrl": "/images/survey_content/c0fd4acd-976d-479d-8995-d56304093923.png",
                              "sectionId": "1",
                              "options": [
                                  {
                                      "optionId": 6,
                                      "optionText": "Get financial advice - invest wisely in a secure savings plan and give some to parents/family for safe-keeping",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 1,
                                      "optionText": "Go out and celebrate, celebrate, celebrate!",
                                      "meaning": "H"
                                  },
                                  {
                                      "optionId": 2,
                                      "optionText": "Buy that car, big house, and those other luxuries you’ve always wanted",
                                      "meaning": "P"
                                  },
                                  {
                                      "optionId": 3,
                                      "optionText": "Pay off the debts of family & friends and support a charity close to your heart",
                                      "meaning": "A"
                                  },
                                  {
                                      "optionId": 4,
                                      "optionText": "Invest it in your education",
                                      "meaning": "L"
                                  },
                                  {
                                      "optionId": 5,
                                      "optionText": "Set up your own business",
                                      "meaning": "F"
                                  }
                              ]
                          },
                          {
                              "questionId": "2",
                              "questionNumOfSection": 2,
                              "questionName": "Dinner Guest",
                              "questionText": "Who would you prefer as a dinner guest (living or dead), from the list of people below?",
                              "questionDescription": null,
                              "questionInstruction": "Rank order, the person you would most prefer, down to the one you would avoid at all costs (1= Most Prefer, 6 = Most Avoid) Whilst we appreciate that you may want to give two options the same rank, please avoid this.\nGive a rank of 1, 2, 3, 4, 5 or 6 to each option. Clearly write your rank number next to each question number. (ignore the box which includes a letter – this is for scoring purposes only). ",
                              "questionType": "ranking",
                              "imgUrl": "/images/survey_content/c0fd4acd-976d-479d-8995-d56304093923.png",
                              "sectionId": "1",
                              "options": [
                                  {
                                      "optionId": 7,
                                      "optionText": "A well-known celebrity or social media star",
                                      "meaning": "H"
                                  },
                                  {
                                      "optionId": 8,
                                      "optionText": "A rich and successful entrepreneur/businessperson",
                                      "meaning": "F"
                                  },
                                  {
                                      "optionId": 9,
                                      "optionText": "A campaigner for human rights or spiritual / religious leader",
                                      "meaning": "A"
                                  },
                                  {
                                      "optionId": 10,
                                      "optionText": "A president, prime minister, or world leader",
                                      "meaning": "P"
                                  },
                                  {
                                      "optionId": 11,
                                      "optionText": "A close friend or family member",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 12,
                                      "optionText": "A Nobel prize winning academic or chancellor/professor of a top university",
                                      "meaning": "L"
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "sectionId": 2,
                      "sectionNumOfSurvey": 2,
                      "sectionName": "Your Interests",
                      "surveyId": 1,
                      "questionsOfSingleSection": [
                          {
                              "questionId": "3",
                              "questionNumOfSection": 1,
                              "questionName": "Library",
                              "questionText": "When visiting a book shop or library, which section would you prefer to visit?",
                              "questionDescription": null,
                              "questionInstruction": "Rank in order from 1 = first choice to 6= last choice\nWhilst we appreciate that you may want to give two options the same rank, please avoid this.\nGive a rank of 1, 2, 3, 4, 5 or 6 to each option. Clearly write your rank number next to each question number (please ignore the letter in each box – these are for scoring purposes only)",
                              "questionType": "ranking",
                              "imgUrl": "/images/survey_content/c0fd4acd-976d-479d-8995-d56304093923.png",
                              "sectionId": "2",
                              "options": [
                                  {
                                      "optionId": 18,
                                      "optionText": "Science – either fiction or non-fiction",
                                      "meaning": "I"
                                  },
                                  {
                                      "optionId": 17,
                                      "optionText": "Other non-fiction books, guides & manuals (e.g. revision guides, IT & computing, planning events, etc.)",
                                      "meaning": "C"
                                  },
                                  {
                                      "optionId": 13,
                                      "optionText": "Arts, music, film & literature",
                                      "meaning": "A"
                                  },
                                  {
                                      "optionId": 14,
                                      "optionText": "Business, politics & leadership",
                                      "meaning": "E"
                                  },
                                  {
                                      "optionId": 15,
                                      "optionText": "Well-being, psychology & self-help",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 16,
                                      "optionText": "Nature, geography, sports & the outdoors",
                                      "meaning": "R"
                                  }
                              ]
                          },
                          {
                              "questionId": "4",
                              "questionNumOfSection": 2,
                              "questionName": "Podcast",
                              "questionText": "Which podcast category are you most likely to tap into?",
                              "questionDescription": null,
                              "questionInstruction": "Rank in order from 1 = first choice to 6= last choice\nWhilst we appreciate that you may want to give two options the same rank, please avoid this.\nGive a rank of 1, 2, 3, 4, 5 or 6 to each option. Clearly write your rank number next to each question number (please ignore the letter in each box – these are for scoring purposes only)",
                              "questionType": "ranking",
                              "imgUrl": "/images/survey_content/c0fd4acd-976d-479d-8995-d56304093923.png",
                              "sectionId": "2",
                              "options": [
                                  {
                                      "optionId": 19,
                                      "optionText": "Comedy",
                                      "meaning": "A"
                                  },
                                  {
                                      "optionId": 20,
                                      "optionText": "Science, research & discovery",
                                      "meaning": "I"
                                  },
                                  {
                                      "optionId": 21,
                                      "optionText": "Business & leadership",
                                      "meaning": "E"
                                  },
                                  {
                                      "optionId": 22,
                                      "optionText": "Sports and outdoor pursuits",
                                      "meaning": "R"
                                  },
                                  {
                                      "optionId": 23,
                                      "optionText": "Social issues and current affairs",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 24,
                                      "optionText": "Organisation, productivity and/or managing your money",
                                      "meaning": "C"
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "sectionId": 3,
                      "sectionNumOfSurvey": 3,
                      "sectionName": "Personality & Style Questions",
                      "surveyId": 1,
                      "questionsOfSingleSection": [
                          {
                              "questionId": "5",
                              "questionNumOfSection": 1,
                              "questionName": null,
                              "questionText": "I like to keep my feelings to myself rather than sharing them with everyone",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": "https://www.bing.com/images/search?view=detailV2&ccid=3r1vguZy&id=D66BA18EE154D133745ABEF43F0A4AE1418ADA84&thid=OIP.3r1vguZyWFUJ80A2Nf2k3AHaEK&mediaurl=https%3a%2f%2fimg-blog.csdnimg.cn%2f2021051521244130.jpg%3fx-oss-process%3dimage%2fwatermark%2ctype_ZmFuZ3poZW5naGVpdGk%2cshadow_10%2ctext_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl81MzQ0Nzc3Ng%3d%3d%2csize_16%2ccolor_FFFFFF%2ct_70&exph=1440&expw=2560&q=%e5%9b%be%e7%89%87&simid=608050649994888498&FORM=IRPRST&ck=86AD3FCD36463661C7CBA8A9759BE54B&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0",
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 27,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 26,
                                      "optionText": "Disagree",
                                      "meaning": "E"
                                  },
                                  {
                                      "optionId": 25,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "E"
                                  },
                                  {
                                      "optionId": 28,
                                      "optionText": "Agree",
                                      "meaning": "I"
                                  },
                                  {
                                      "optionId": 29,
                                      "optionText": "Strongly Agree",
                                      "meaning": "I"
                                  }
                              ]
                          },
                          {
                              "questionId": "6",
                              "questionNumOfSection": 2,
                              "questionName": null,
                              "questionText": "I'm often the person my friends rely on to organise things",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": null,
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 34,
                                      "optionText": "Strongly Agree",
                                      "meaning": "J"
                                  },
                                  {
                                      "optionId": 32,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 31,
                                      "optionText": "Disagree",
                                      "meaning": "P"
                                  },
                                  {
                                      "optionId": 30,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "P"
                                  },
                                  {
                                      "optionId": 33,
                                      "optionText": "Agree",
                                      "meaning": "J"
                                  }
                              ]
                          },
                          {
                              "questionId": "7",
                              "questionNumOfSection": 3,
                              "questionName": null,
                              "questionText": "After a busy week, I'd rather relax by spending time with my friends than on my own",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": null,
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 39,
                                      "optionText": "Strongly Agree",
                                      "meaning": "E"
                                  },
                                  {
                                      "optionId": 35,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "I"
                                  },
                                  {
                                      "optionId": 36,
                                      "optionText": "Disagree",
                                      "meaning": "I"
                                  },
                                  {
                                      "optionId": 37,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 38,
                                      "optionText": "Agree",
                                      "meaning": "E"
                                  }
                              ]
                          },
                          {
                              "questionId": "8",
                              "questionNumOfSection": 4,
                              "questionName": null,
                              "questionText": "I prefer learning about facts and details rather than theories and ideas",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": null,
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 40,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 41,
                                      "optionText": "Disagree",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 43,
                                      "optionText": "Agree",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 44,
                                      "optionText": "Strongly Agree",
                                      "meaning": "S"
                                  },
                                  {
                                      "optionId": 42,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  }
                              ]
                          },
                          {
                              "questionId": "9",
                              "questionNumOfSection": 5,
                              "questionName": null,
                              "questionText": "It's important to show kindness and respect for people, even if you don't like or understand them",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": null,
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 45,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "T"
                                  },
                                  {
                                      "optionId": 47,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 48,
                                      "optionText": "Agree",
                                      "meaning": "F"
                                  },
                                  {
                                      "optionId": 49,
                                      "optionText": "Strongly Agree",
                                      "meaning": "F"
                                  },
                                  {
                                      "optionId": 46,
                                      "optionText": "Disagree",
                                      "meaning": "T"
                                  }
                              ]
                          },
                          {
                              "questionId": "10",
                              "questionNumOfSection": 6,
                              "questionName": null,
                              "questionText": "I tend to plan and start tasks early rather than leaving them to the last minute",
                              "questionDescription": "These questions only require one answer each.\nChoose only one box to tick to rate your agreement with each statement. Try to avoid using the neutral/middle option as far as possible.",
                              "questionInstruction": null,
                              "questionType": "single_choice",
                              "imgUrl": null,
                              "sectionId": "3",
                              "options": [
                                  {
                                      "optionId": 54,
                                      "optionText": "Strongly Agree",
                                      "meaning": "J"
                                  },
                                  {
                                      "optionId": 53,
                                      "optionText": "Agree",
                                      "meaning": "J"
                                  },
                                  {
                                      "optionId": 52,
                                      "optionText": "Neutral/Don't Know",
                                      "meaning": "N"
                                  },
                                  {
                                      "optionId": 51,
                                      "optionText": "Disagree",
                                      "meaning": "P"
                                  },
                                  {
                                      "optionId": 50,
                                      "optionText": "Strongly Disagree",
                                      "meaning": "P"
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "sectionId": 4,
                      "sectionNumOfSurvey": 4,
                      "sectionName": "Creative Thinking",
                      "surveyId": 1,
                      "questionsOfSingleSection": [
                          {
                              "questionId": "11",
                              "questionNumOfSection": 1,
                              "questionName": null,
                              "questionText": "There has been a 30% drop in use of the food canteen/restaurant within one of the high schools in your area over the past six months. You have been asked to make some suggestions to solve the problem.",
                              "questionDescription": "Please complete the following example question for only 3 minutes, which will help get you into the right frame of mind before you complete the real questions. ",
                              "questionInstruction": "List as many potential ideas you have to resolve this issue using the numbered lines below. \nRemember to come up with a range of different ideas – no matter how silly they seem!",
                              "questionType": "short_answer",
                              "imgUrl": "/images/survey_content/c0fd4acd-976d-479d-8995-d56304093923.png",
                              "sectionId": "4",
                              "options": []
                          }
                      ]
                  }
              ]
          }
      ]
  }
  ```
  



#### 2.2 All Section Answer Save

- Basic Info

  ```
  URL：/api/student/answer/text
  
  Method：POST
  
  Description：store all answers made by student in certain survey。 
  ```

- Request

- Format：json

  Explanation：

  | Parameter Name           | Data Type | If mandatory | Comment                        |
  | ------------------------ | --------- | ------------ | ------------------------------ |
  | surveyAnswerInfo         | number    | Yes          | 响应码，1 代表成功，0 代表失败 |
  | \| - studentId           | string    | No           | 提示信息                       |
  | \| - surveyId            | number    | Yes          | 返回的数据                     |
  | \|- currentSection       | number    | Yes          |                                |
  | \|- currentNumOfQuestion | number    | Yes          |                                |
  | answerStringDetails      | object[]  | Yes          |                                |
  | \|- questionId           | string    | Yes          |                                |
  | \|- answerText           | object[]  | Yes          |                                |

  Example：

  ```json
  {
    "surveyAnswerInfo": {
      "studentId": 1032,
      "surveyId": 1,
      "currentSection": 3,
      "currentNumOfQuestion": 3
    },
    "answerStringDetails": [
      {
        "questionId": "2",
        "answerText": [
          "A well-known celebrity or social media star",
          "A rich and successful entrepreneur/businessperson",
          "A campaigner for human rights or spiritual / religious leader",
          "A president, prime minister, or world leader",
          "A close friend or family member",
          "A Nobel prize winning academic or chancellor/professor of a top university"
        ]
      },
      {
        "questionId": "9",
        "answerText": [
          "Agree"
        ]
      },
      {
        "questionId": "15",
        "answerText": [
          "rank1031"
        ]
      },
      {
        "questionId": "1",
        "answerText": [
          "Go out and celebrate, celebrate, celebrate!",
          "Get financial advice - invest wisely in a secure savings plan and give some to parents/family for safe-keeping",
          "Buy that car, big house, and those other luxuries you’ve always wanted",
          "Pay off the debts of family & friends and support a charity close to your heart",
          "Invest it in your education",
          "Set up your own business"
        ]
      },
      {
        "questionId": "24",
        "answerText": [
          "daadad@qdq"
        ]
      },
      {
        "questionId": "23",
        "answerText": [
          "China"
        ]
      },
      {
        "questionId": "22",
        "answerText": [
          "China"
        ]
      },
      {
        "questionId": "4",
        "answerText": []
      },
      {
        "questionId": "3",
        "answerText": [
          "Arts, music, film & literature",
          "Other non-fiction books, guides & manuals (e.g. revision guides, IT & computing, planning events, etc.)",
          "Science – either fiction or non-fiction",
          "Business, politics & leadership",
          "Well-being, psychology & self-help",
          "Nature, geography, sports & the outdoors"
        ]
      },
      {
        "questionId": "21",
        "answerText": [
          ""
        ]
      },
      {
        "questionId": "7",
        "answerText": [
          []
        ]
      },
      {
        "questionId": "6",
        "answerText": [
          "Neutral/Don't Know"
        ]
      },
      {
        "questionId": "5",
        "answerText": [
          "Neutral/Don't Know"
        ]
      },
      {
        "questionId": "8",
        "answerText": [
          "Strongly Agree"
        ]
      }
    ]
  }
  ```

- Response

  Format：json

  Explanation：

  | Parameter Name | Data Type | If mandatory | Comment |
  | -------------- | --------- | ------------ | ------- |
  | code           | number    | Yes          | /       |
  | msg            | string    | No           | /       |
  | data           | object    | No           | /       |

  Example：

  ~~~json
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ~~~



#### 2.3 Student Section score

- Basic Info

  ```
  URL：/api/student/scores/{studentId}
  
  Method：GET
  ```
  
- Request Parameter: /

- Response

  Format：json

  Explanation：

  Example：
  
  ~~~json
  {
      "code": 1,
      "msg": "success",
      "data": {
          "section1": {
              "studentId": 2,
              "maxScore": 60,
              "p": 15,
              "a": 17,
              "h": 33,
              "l": 22,
              "f": 24,
              "s": 36
          },
          "section2": {
              "studentId": 2,
              "maxScore": 60,
              "a": 32,
              "s": 20,
              "i": 25,
              "c": 18,
              "e": 16,
              "r": 27
          },
          "section3": {
              "studentId": 2,
              "type": "ISFJ",
              "p": 0,
              "t": 0,
              "f": 2,
              "s": 3,
              "i": 4,
              "e": 0,
              "n": 0,
              "j": 1
          },
          "section4": {
              "studentId": 2,
              "total": 16,
              "q1": 6,
              "q2": 7,
              "q3": 3
          }
      }
  }
  ~~~



### 3. Daily Mood

#### 3.1 Save today's mood

- Basic Info

  ```
  URL：/api/student/daily-mood
  
  Method：POST
  ```
  
  

- Request

  ```json
  {
      "studentId": 1,
      "moodDate": "2024-10-21",
      "moodScore": 3
  }
  ```

- Response

  Example：

  ```json
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```



#### 3.2 Get Recent 15 Mood

- Basic Info

  ```
  URL：/api/student/week-mood/1
  
  Method：GET
  ```
  
  

- Request

  ```
  /api/student/week-mood/{studentId}
  ```

  

- Response

  Example：

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": [
          {
              "moodId": 32,
              "studentId": 1,
              "moodDate": "2024-10-24",
              "moodScore": 2
          },
          {
              "moodId": 31,
              "studentId": 1,
              "moodDate": "2024-10-22",
              "moodScore": 4
          },
          {
              "moodId": 28,
              "studentId": 1,
              "moodDate": "2024-10-21",
              "moodScore": 4
          },
          {
              "moodId": 12,
              "studentId": 1,
              "moodDate": "2024-10-19",
              "moodScore": 3
          },
          {
              "moodId": 11,
              "studentId": 1,
              "moodDate": "2024-10-18",
              "moodScore": 5
          },
          {
              "moodId": 15,
              "studentId": 1,
              "moodDate": "2024-10-17",
              "moodScore": 3
          },
          {
              "moodId": 13,
              "studentId": 1,
              "moodDate": "2024-10-15",
              "moodScore": 3
          },
          {
              "moodId": 22,
              "studentId": 1,
              "moodDate": "2024-10-13",
              "moodScore": 4
          }
      ]
  }
  ```



### 4. Calendar

#### 4.1 Calendar Insert

- Basic Info

  ```
  URL：/api/student/tasks/subscribe?calendarUrl=https://timetable.sydney.edu.au/even/rest/calendar/ical/074c9ac2-d54a-4b6c-8f4a-15e59c0d3ba2&subscriptionName=JustTest&studentId=2
  
  Method：POST
  ```
  
- Request

  /

- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": "Subscription Success!"
  }
  ```

#### 4.2 Calendar Query

- Basic Info

  ```
  URL：/api/student/tasks/tasksWithDatesAndSubscriptions?studentId=1
  
  Method：GET
  
  Description：用于学生查询个人日历。
  ```

- Request：路径参数

- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": {
          "subscriptions": [
              {
                  "subscriptionName": "hiscalendar",
                  "tasks": [
                      {
                          "date": "2024-07-29",
                          "name": "Software Engineering Project, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 323,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-31",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 272,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-31",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 297,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 284,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 348,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 310,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-07",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 273,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-07",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 298,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 285,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 349,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 311,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 324,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 336,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-14",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 274,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-14",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 299,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 286,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 350,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 312,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 325,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 337,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-21",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 275,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-21",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 300,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 287,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 351,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 313,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 326,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 338,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-28",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 276,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-28",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 301,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 288,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 352,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 314,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 327,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 339,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-04",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 277,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-04",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 302,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 289,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 353,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 315,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 328,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 340,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-11",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 278,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-11",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 303,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 290,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 354,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 316,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 329,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 341,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-18",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 279,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-18",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 304,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 291,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 355,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 317,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 330,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 342,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-25",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 280,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-25",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 305,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 292,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 356,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 318,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 331,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 343,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-09",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 281,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-09",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 306,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 293,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 357,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 319,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 332,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 344,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-16",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 282,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-16",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 307,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 294,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 358,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 320,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 333,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 345,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-23",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 283,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-23",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 308,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 295,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 359,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 321,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 334,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 346,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-30",
                          "name": "Pervasive Computing, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 271,
                          "event_time": "13:00:00"
                      },
                      {
                          "date": "2024-10-30",
                          "name": "Advanced Data Models, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 309,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Pervasive Computing, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 296,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 360,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Advanced Data Models, Practical",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 322,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Software Engineering Project, Workshop",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 335,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Internet Software Platforms, Lab",
                          "description": "hiscalendar",
                          "student_id": 1,
                          "id": 347,
                          "event_time": "17:00:00"
                      }
                  ]
              },
              {
                  "subscriptionName": "Yixuan",
                  "tasks": [
                      {
                          "date": "2024-07-29",
                          "name": "Software Engineering Project, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 854,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-31",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 803,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-31",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 828,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 815,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 879,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 841,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-07",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 804,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-07",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 829,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 816,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 880,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 842,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 855,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 867,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-14",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 805,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-14",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 830,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 817,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 881,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 843,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 856,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 868,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-21",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 806,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-21",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 831,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 818,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 882,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 844,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 857,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 869,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-28",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 807,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-28",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 832,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 819,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 883,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 845,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 858,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 870,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-04",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 808,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-04",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 833,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 820,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 884,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 846,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 859,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 871,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-11",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 809,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-11",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 834,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 821,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 885,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 847,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 860,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 872,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-18",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 810,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-18",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 835,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 822,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 886,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 848,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 861,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 873,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-25",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 811,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-25",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 836,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 823,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 887,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 849,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 862,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 874,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-09",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 812,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-09",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 837,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 824,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 888,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 850,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 863,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 875,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-16",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 813,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-16",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 838,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 825,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 889,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 851,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 864,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 876,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-23",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 814,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-23",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 839,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 826,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 890,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 852,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 865,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 877,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-30",
                          "name": "Pervasive Computing, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 802,
                          "event_time": "13:00:00"
                      },
                      {
                          "date": "2024-10-30",
                          "name": "Advanced Data Models, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 840,
                          "event_time": "18:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Pervasive Computing, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 827,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 891,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Advanced Data Models, Practical",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 853,
                          "event_time": "19:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Software Engineering Project, Workshop",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 866,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Internet Software Platforms, Lab",
                          "description": "Yixuan",
                          "student_id": 1,
                          "id": 878,
                          "event_time": "17:00:00"
                      }
                  ]
              },
              {
                  "subscriptionName": "ClientDemo",
                  "tasks": [
                      {
                          "date": "2024-07-29",
                          "name": "Software Engineering Project, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1179,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-29",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1228,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-07-31",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1154,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1166,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-01",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1204,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-05",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1229,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-05",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1217,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-08-07",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1155,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1167,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-08",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1205,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1180,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-09",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1192,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-12",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1230,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-12",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1220,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-08-14",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1156,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1168,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-15",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1206,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1181,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-16",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1193,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-19",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1231,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-19",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1218,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-08-21",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1157,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1169,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-22",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1207,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1182,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-23",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1194,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-26",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1232,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-26",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1221,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-08-28",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1158,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1170,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-29",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1208,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1183,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-08-30",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1195,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-02",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1233,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-02",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1222,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-09-04",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1159,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1171,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-05",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1209,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1184,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-06",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1196,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-09",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1234,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-09",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1223,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-09-11",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1160,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1172,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-12",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1210,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1185,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-13",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1197,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-16",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1235,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-16",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1224,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-09-18",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1161,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1173,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-19",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1211,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1186,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-20",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1198,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-23",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1236,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-23",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1219,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-09-25",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1162,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1174,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-26",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1212,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1187,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-09-27",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1199,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-09",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1163,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1175,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-10",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1213,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1188,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-11",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1200,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-14",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1237,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-14",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1225,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-10-16",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1164,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1176,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-17",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1214,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1189,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-18",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1201,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-21",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1238,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-21",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1226,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-10-23",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1165,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1177,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-24",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1215,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1190,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-10-25",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1202,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-28",
                          "name": "Signals, Software and Health, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1239,
                          "event_time": "14:00:00"
                      },
                      {
                          "date": "2024-10-28",
                          "name": "Signals, Software and Health, LabTutorial",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1227,
                          "event_time": "16:00:00"
                      },
                      {
                          "date": "2024-10-30",
                          "name": "Pervasive Computing, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1153,
                          "event_time": "13:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Pervasive Computing, Practical",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1178,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-10-31",
                          "name": "Internet Software Platforms, Lecture",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1216,
                          "event_time": "17:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Software Engineering Project, Workshop",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1191,
                          "event_time": "12:00:00"
                      },
                      {
                          "date": "2024-11-01",
                          "name": "Internet Software Platforms, Lab",
                          "description": "ClientDemo",
                          "student_id": 1,
                          "id": 1203,
                          "event_time": "17:00:00"
                      }
                  ]
              }
          ],
          "dates": [
              "2024-09-20",
              "2024-08-15",
              "2024-09-27",
              "2024-08-16",
              "2024-09-23",
              "2024-08-12",
              "2024-09-25",
              "2024-08-14",
              "2024-09-26",
              "2024-08-08",
              "2024-10-09",
              "2024-08-09",
              "2024-09-11",
              "2024-07-31",
              "2024-09-16",
              "2024-08-05",
              "2024-09-18",
              "2024-08-07",
              "2024-09-19",
              "2024-09-12",
              "2024-08-01",
              "2024-09-13",
              "2024-07-29",
              "2024-09-09",
              "2024-11-01",
              "2024-10-30",
              "2024-08-30",
              "2024-10-31",
              "2024-09-05",
              "2024-09-06",
              "2024-09-02",
              "2024-09-04",
              "2024-10-28",
              "2024-10-25",
              "2024-10-23",
              "2024-10-24",
              "2024-10-21",
              "2024-08-21",
              "2024-08-26",
              "2024-08-28",
              "2024-08-29",
              "2024-08-22",
              "2024-08-23",
              "2024-08-19",
              "2024-10-18",
              "2024-10-16",
              "2024-10-17",
              "2024-10-14",
              "2024-10-10",
              "2024-10-11"
          ]
      }
  }
  ```

#### 4.3 Calendar Unsubscribe 

- Basic Info

  ```
  /api/student/tasks/unsubscribe?studentId=2&descriptionName=JustTest
  ```

- Response

  ```
  {
      "code": 1,
      "msg": "success",
      "data": "Subscription deleted successfully!"
  }
  ```





#### 4.4 Calendar Query By Subscription Name

- Basic Info

  ```
  /api/student/tasks/tasksBySubscription?studentId=1&subscriptionName=mycalendar
  ```

- Response

  ```
  {
      "tasks": [],
      "dates": [
          "2024-07-29",
          "2024-07-31",
          "2024-08-01",
          "2024-08-05",
          "2024-08-07",
          "2024-08-08",
          "2024-08-09",
          "2024-08-12",
          "2024-08-14",
          "2024-08-15",
          "2024-08-16",
          "2024-08-19",
          "2024-08-21",
          "2024-08-22",
          "2024-08-23",
          "2024-08-26",
          "2024-08-28",
          "2024-08-29",
          "2024-08-30",
          "2024-09-02",
          "2024-09-04",
          "2024-09-05",
          "2024-09-06",
          "2024-09-09",
          "2024-09-11",
          "2024-09-12",
          "2024-09-13",
          "2024-09-16",
          "2024-09-18",
          "2024-09-19",
          "2024-09-20",
          "2024-09-23",
          "2024-09-25",
          "2024-09-26",
          "2024-09-27",
          "2024-10-09",
          "2024-10-10",
          "2024-10-11",
          "2024-10-14",
          "2024-10-16",
          "2024-10-17",
          "2024-10-18",
          "2024-10-21",
          "2024-10-23",
          "2024-10-24",
          "2024-10-25",
          "2024-10-28",
          "2024-10-30",
          "2024-10-31",
          "2024-11-01"
      ]
  }
  ```

  

### 5. Interesting Hub

#### 5.1 Post List Pagination

- Basic Info

  ```
  URL：/api/student/interesting-hub/post
  
  Method：GET
  ```
  
- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": {
          "total": 20,
          "rows": [
              {
                  "postId": 3,
                  "title": "My Interesting Post",
                  "context": "This is the content of the post.",
                  "foeId": 2,
                  "foeName": "Information Systems",
                  "createdAt": "2024-10-14T22:04:21",
                  "clickNum": 23,
                  "images": []
              },
              {
                  "postId": 4,
                  "title": "My Interesting Post Again",
                  "context": "This is the content of the post.",
                  "foeId": 3,
                  "foeName": "Business and Management",
                  "createdAt": "2024-10-14T22:05:17",
                  "clickNum": 31,
                  "images": [
                      {
                          "imageId": 2,
                          "postId": 4,
                          "imgUrl": "/images/interesting_hub_post/c0fd4acd-976d-479d-8995-d56304093923.png"
                      }
                  ]
              },
              {
                  "postId": 5,
                  "title": "USYD Software",
                  "context": "The capstone project will provide students an opportunity to apply the knowledge and practise the skills acquired in the prerequisite and qualifying units, in the context of designing and building a substantial software system in diverse application domains including life sciences. In particular, students will need to demonstrate sensible application of their discipline knowledge and skills (computer science and/or software development/engineering/information system/cybersecurity) in their project. Specifically, software development/engineering projects include deciding on and implementing most suitable software design and architecture, appropriate testing techniques, coding with maintainability and extensibility in-mind, and realizing relevant system’s non-functional properties including performance, security, reliability, and usability. Computer Science projects will focus on deciding on most suitable data structure and algorithms, algorithmic analysis for problem-solving, and methods for developing a robust, efficient and secure system. Information System projects will focus on end-user needs, strategic planning, system development, system implementation, and operational management. For cybersecurity projects, students will need to demonstrate sensible application of cybersecurity knowledge and skills in their project including deciding on most suitable authentication protocols, cryptographic primitives, security assessment strategies, and security proofs (if applicable).\n\nStudents will also need to demonstrate the proper use of software development tools and practices that lead to effective and efficient development processes. Working in groups for an external/internal client combined with academic supervision, students will need to carry out the full range of activities including requirements capture, analysis and design, coding, testing and documentation. Students will use the XP methodology and professional tools for the management of their project.",
                  "foeId": 2,
                  "foeName": "Information Systems",
                  "createdAt": "2024-10-14T22:08:41",
                  "clickNum": 12,
                  "images": []
              },
              {
                  "postId": 6,
                  "title": "Advanced Data Model",
                  "context": "Welcome to Advanced Data Models (COMP4338/COMP5338)\n\nThis unit of study gives a comprehensive overview of post-relational data models and of latest developments in data storage technologies. Particular emphasis is put on document model, graph model, spatial and time series models. This unit covers practical knowledge of  a few dominant NoSQL systems as well as conceptual understandings of design principles and architectures of various data base systems.   Such combination is reflected in tutorial as well as in assessment package. \n\n\nClasses: 2 hour lecture + 1 hour tutorial per week\n\n\nAssessment: Through semester assessment (60%) and Final Exam (40%)\n\n\nAssumed knowledge\n\n\nThis unit of study assumes fundamental knowledge of relational database systems as taught in COMP5138/COMP9120 (Database Management Systems) or INFO2120/INFO2820/ISYS2120 (Database Systems 1).\n\nLearning Materials can be accessed from the Modules.\n\n\nTeaching staff and contact details\n\n\nCoordinator: Dr. Ying Zhou ying.zhou@sydney.edu.au\n\n\nTutor Lab Allocation for now\n\nNormal lab starts from week 2 on Wednesday and Thursday. There will be an optional help desk session on week 1 to help you install MongoDB. ",
                  "foeId": 4,
                  "foeName": "Dentistry",
                  "createdAt": "2024-10-14T22:09:49",
                  "clickNum": 6,
                  "images": [
                      {
                          "imageId": 3,
                          "postId": 6,
                          "imgUrl": "/images/interesting_hub_post/d48e5a6c-7868-4fb7-9b19-6d760d869bdf.png"
                      },
                      {
                          "imageId": 4,
                          "postId": 6,
                          "imgUrl": "/images/interesting_hub_post/94f2580c-f9d3-4c59-9bc5-ba7b44cb9619.png"
                      }
                  ]
              },
              {
                  "postId": 7,
                  "title": "Pervasive Computing",
                  "context": "Welcome to Pervasive Computing (COMP5047/COMP4447)! \nAre you ready to bridge the gap between the digital and physical worlds? Welcome to \"Pervasive Computing\", an advanced, research-driven, technical course that will equip you to build interactive systems that break out of the box of desktop computers and mobile phones. \n\nWhat Will You Learn?\nHands-on Experience with Arduino: Dive into the versatile world of electronics and microcontrollers. You will start with the basics and quickly advance to creating complex systems using sensors and actuators.\nArtificial Intelligence Integration: Harness the power of AI APIs to build intelligent devices that can recognize speech, process images, and make decisions.\nCutting-edge Prototyping: Design devices with Fusion 360 and bring your designs to life using 3D printing and laser cutting. Create custom enclosures and components for your projects.\nIoT and Networking: Connect your devices to the Internet and explore the fascinating world of the Internet of Things (IoT). Collect and analyse data from your creations in real time.\nPost-desktop interaction design: Learn about the latest advances in novel interaction modalities and techniques beyond the keyboard and mouse, including gesture, sound, gaze, wearables and much more.\nWhy Take This Course?\nInnovative Learning: This course combines theory with practical, hands-on projects. You will not only learn the concepts but also apply them in exciting practical projects.\nCutting-edge Technology: Learn about state-of-the-art tools and technologies. From AI APIs to 3D printers, you will witness the latest advances in interactive systems design.\nCreative Freedom: This is your chance to turn your ideas into reality. Whether you want to build a smart home device, a wearable gadget, or an interactive art installation, you'll have the tools and support to make it happen.\nCareer Advancement: Equip yourself with skills that are in high demand. Physical computing, IoT, and AI are among the fastest-growing fields in tech, and this course will give you a competitive edge.\nWho Should Enroll?\nAspiring Innovators: If you have a passion for technology and creativity, this course is for you. No prior electronics experience is needed—just a willingness to learn and experiment.\nDevelopers and Engineers: Expand your skill set beyond software and delve into the world of hardware and interaction design.\nDesigners and Creators: Learn how to integrate digital intelligence into your physical designs and explore new dimensions of interactivity.\nJoin us for a 13-week journey where you'll transform from a coder into a maker, capable of designing and building interactive systems that inspire and innovate. By the end of this course, you will have everything that it takes to build a portfolio of impressive projects showcasing your skills.\n\nGet ready to embark on an exciting adventure in pervasive computing!\n\nAssumed knowledge\nBackground in programming and operating systems that is sufficient for the student to independently learn new programming tools from standard online technical materials. Ability to conduct a literature search. Ability to write reports of work done.",
                  "foeId": 5,
                  "foeName": "Veterinary Science",
                  "createdAt": "2024-10-15T14:42:03",
                  "clickNum": 3,
                  "images": []
              },
              {
                  "postId": 8,
                  "title": "Elec 9609",
                  "context": "This is the content of the This unit of study will focus on the design, the architecture and the development of web applications using technologies currently popular in the marketplace including open source environments and cloud technologies. There are three key themes examined in the unit: Presentation layer, Persistence layer, and Interoperability. The unit will examine practical technologies such as Python, cloud based architecture, database technologies, advanced persistence using ORM, and JSON-based REST services and Ajax, in support of the theoretical themes identified. \n                           \n                           On completion the students should be able to: \n                           \n                           Compare different web application development technologies, for example PHP vs Python vs ASP; \n                           Use, and be familiar with, relevant developer tools; \n                           Be able to develop a real application on one of those environments; \n                           Use JSON to implement simple web services and AJAX applications..",
                  "foeId": 1,
                  "foeName": "Physics and Astronomy",
                  "createdAt": "2024-10-15T16:36:24",
                  "clickNum": 6,
                  "images": [
                      {
                          "imageId": 6,
                          "postId": 8,
                          "imgUrl": "/images/interesting_hub_post/bd18b972-f43d-4800-b58e-8d3ba3fcebb6.png"
                      }
                  ]
              },
              {
                  "postId": 9,
                  "title": "My Interesting Post 1015",
                  "context": "This is the content of the post.",
                  "foeId": 1,
                  "foeName": "Physics and Astronomy",
                  "createdAt": "2024-10-16T17:31:56",
                  "clickNum": 7,
                  "images": [
                      {
                          "imageId": 7,
                          "postId": 9,
                          "imgUrl": "/images/interesting_hub_post/c7db4325-fb73-4392-97a5-b2ff192b8243.png"
                      }
                  ]
              },
              {
                  "postId": 10,
                  "title": "Usyd Capstone",
                  "context": "UG Capstone Projects\nCOMP3888_COMP3988_SOFT3888_INFO3600_COMP5615_ISYS3888_CSEC3888\nFinal Project Presentation & Demo (Group)\ntarget_circle_icon_gray.png Goals\nThe aim of this assignment is to allow you to summarize the whole project that has been carried out by your group and present your ultimate outcomes in the week12 tutorial. It is a concise summary of your group project report. And the emphasis is the work completed after the first presentation.\n\ncollaborate_circle_icon_gray.png Scope\nThe presentation and demo should cover the points below (including but not limited to)  in the following order:\n\nOverview of the project including goals, objectives, achievements, stakeholders and scope (concise and clear)\nSystem specification and design including:\nSummary of key functional and non-functional requirements expressed in the format of user stories\nExamples of representative user stories with the corresponding acceptance criteria\nEach user story should be the smallest unit of work for specific functional or non-functional requirement instead of a combination of several user stories\nEach user story should be clearly described and designed based on client's needs\nEach user story should be testable and estimable\nTechnical and other constraints\nFinal (complete) system architecture and design\nMay include high-level designs (e.g., mock-ups, UIs, system/software components and its interactions)\nQuality of the whole work including:\nTesting plans such as user acceptance testing, system testing, API testing and/or UI testing\nUse of relevant testing types (e.g., unit tests, regression testing, integration, system, usability and/or acceptance testing)\nA justification for why these tests are sufficient should also be included.\nUse of relevant testing techniques (e.g. Equivalence partitioning, boundary analysis) to design test cases\nAny other quality aspects or testing-related work specific to the project nature (e.g., API testing, UI testing, stress testing)\nDemonstrate execution of designed test cases and corresponding results (e.g., bugs, bug fixes)\nTest cases should be consistent with user stories and cover different aspects of all user stories\nExplain why the current test cases are enough for the project\nDemonstrate enough test coverage and explain why it is enough for the scope of the project\nSummary of the significance and limitations of tests \nThe application of discipline knowledge and tools (refer to the detailed requirements in 'Final Project Report (Group)') :\nUse and application of discipline knowledge\nTools used to build the systems\nResponses to key changes requested by the client (especially after the first client deployment) and how well these changes were handled or implemented as improvements or new features.\nDemonstration (video or live) of the final product/design:\nIt should cover all the implemented elements in the system/software/design or any work required to be completed by the client\nIt should match the user stories/requirements described above\nThe demo should be included in the submission along with the presentation slides.\nIt will be assessed based on how well (quality) the most crucial user stories are implemented\nGroup processes including collaboration and roles, client interaction, and reflections on key improvements after the first set of assessment\nSummary of collaboration and teamwork\nA systematic process of work - weekly plan and task allocation\n“Issues” tracking and progress;\nUse of bitbucket and slack and other previously unfamiliar tools\nWork with clients - group interaction with client\nSummary of group member's contribution to the presentation/entire project (1 slide listing role/s of each member in the presentation/entire project)\nCritical assessment and Reflections\nNote: Make sure the presentation outline follows the same structure and order shown above.\n\nNote: if any of the above topics is irrelevant to your project/work, you will need to explicitly justify it. Also, any other details that might be specific to the nature of your project/work and do not fit under any of the above parts should be explicitly added to the presentation.\n\ntools_circle_icon_gray.png Requirements\nEach group has 20 minutes to do the presentation and show their demo followed by a Q&A section lasting 3 to 5 minutes with your tutor and other groups during week12 tutorial.\nAll members must participate in the preparation and delivery of the presentation and the demo. All presentations and demos will be recorded. (Absent students will not get the group mark and may receive 0 marks if they do not contribute to the preparation and the presentation.)\nThe maximum of slides is 25 (excluding the front page and references if there's any).\nThere must be a cover page including the information of team members (names, SID, and Unikeys), formal group name (e.g., SOFT3888_TH17_03), formal project name (e.g., P01 - Autonomous Car Using Neural Networks and Computer Vision), client name, your tutor name and tutorial time. (For group members who are doing multiple capstone units/projects, add a note to indicate the student name, and the other group name and the project name.)\nThe presentation and slides should be concise, clear, formal and attractive to audiences.\nBe sure you have appropriate body language and eye contacts.\nThe overall effect of the presentation and your own performance will be measured by tutors during the tutorial. But the finalization of assessment will take some time after the tutorial.\ncalendar_event_circle_icon_gray.png Submissions\nEach group has to submit your slides and prototype demo (.zip file) through the submission link provided in this Canvas page.\nThere should be one submission per group\nName your submission using the group name and project number (e.g., COMP3888_TU17_02_P02.pdf)\nassignment_circle_icon_gray.png Marking Guide\nQuality of the overview of the project (10%)\nQuality of system specification and design (15%)\nQuality of the test-related work (15%)\nQuality of the application of discipline knowledge and tools (10%)\nQuality of response to key changes (5%)\nQuality of the Demonstration (video or live) of the final product/design (15%)\nQuality of group processes (5%)\nQuality of the presentation (15%):\nPresentation is well-structured and has logical flow of information\nPresentation is well-prepared and well-rehearsed\nThe delivery is within the time limit\nFully and appropriate utilization of presentation tools (slides, animation, visuals, etc.)\nThe slides are easy-to-read, clear and concise with appropriate titles and styles and without too much text\nQuality of Q&As and Group Contribution (10%) - convincing and sensible answers that show understanding of the work done and all members have sensible contributions to the presentation, demo and Q&A.\nNote: No-contributing and/or absent students will not get the group mark.",
                  "foeId": 1,
                  "foeName": "Physics and Astronomy",
                  "createdAt": "2024-10-22T17:30:41",
                  "clickNum": 0,
                  "images": [
                      {
                          "imageId": 8,
                          "postId": 10,
                          "imgUrl": "/images/interesting_hub_post/419d4947-a536-432c-9f2e-975b57e1ea6a.png"
                      }
                  ]
              },
              {
                  "postId": 11,
                  "title": "Usyd Capstone",
                  "context": "introduction story of evolution design\n\n1. 19 thirties(1937)  Henry Dreyfuss- Model302\n\n   - **Henry Dreyfuss**(1904-1972)  design telephone Model 302\n   - companies own/repair telephones\n   - telephone long shelf life but heavy/bulky/resistant\n   - Think about **handset-->triangular profile** is uncomfortable when not being held by hands.(like holding the phone handset with your neck）\n   - Research:\n     1. Object research: To see how the phones were breaking\n     2. User research: how people use the phone\n\n2. 1949 Model 500 **flat profile handset**\n\n   - something new:\n     1. flat profile handset\n     2. moved the numbers out of the rings(avoid wearing out)\n     3. give some little dots(target to help people hone into the hole)\n   - Research further:\n     - Specific user group-teenage girls: put telephone on their chest when lying on the bed-->heavy\n   - Conclusion: Need target specific user demographics-->instead of average user\n\n3. Telephone Princess 1959\n\n   - phone designed particularly for women\n   - Tradeoff usability like fast dialing/robustness\n   - they wanted to reshape the phone from a utilitarian device into an object of desire\n\n4. Evolution of telephone&pervasive computing\n\n   1. start by focusing on structural integrity of the system(focusing on the object)\n   2. studying anatomy and behaviour of typical/avarage users(design for most people)\n   3. targeting a specific consumer demographics",
                  "foeId": 3,
                  "foeName": "Business and Management",
                  "createdAt": "2024-10-22T18:51:06",
                  "clickNum": 2,
                  "images": [
                      {
                          "imageId": 9,
                          "postId": 11,
                          "imgUrl": "/images/interesting_hub_post/f44e975a-d95a-41dd-89be-0e4abc3ed840.png"
                      }
                  ]
              }
          ]
      }
  }
  ```

#### 5.2 Get Post By Id

- Basic Info

  ```
  URL：/api/student/interesting-hub/post/9
  
  Method：GET
  ```
  
- Request

  ```
  /student/single-hub/9
  ```

- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": {
          "postId": 9,
          "title": "My Interesting Post 1015",
          "context": "This is the content of the post.",
          "foeId": 1,
          "foeName": "Physics and Astronomy",
          "createdAt": "2024-10-16T17:31:56",
          "clickNum": 7,
          "images": [
              {
                  "imageId": 7,
                  "postId": 9,
                  "imgUrl": "/images/interesting_hub_post/c7db4325-fb73-4392-97a5-b2ff192b8243.png"
              }
          ]
      }
  }
  ```



#### 5.3 View Duration & Click Number

- Basic Info

  ```
  URL：/api/student/interesting-hub/operation
  
  Method：POST
  ```
  
- Request：json

  ```json
  {
      "studentId": 1,
      "postId": 9,
      "viewDuration": 1000
  }
  ```

- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": null
  }
  ```

#### 5.4 Create New Post

- Basic Info

  ```
  URL：/api/student/interesting-hub/post
  
  Method：POST
  ```
  
- Request：form-data

  | Field Name | Data Type      | Comment     |
  | ---------- | -------------- | ----------- |
  | title      | string         | Primary key |
  | context    | string         |             |
  | foeId      | string         |             |
  | Files      | multipart-file |             |

- Response

  ```json
  {
      "code": 1,
      "msg": "success",
      "data": null
  }
  ```

### 6. Need Help Button

- Basic Info

  ```
  URL：/api/student/help
  
  Method：POST
  ```
  
- Request

  ```json
  {
      "studentId":2,
      "studentPhone":"12345678910",
      "studentEmail":"example@example.com"
  }
  ```

- Response

  Example：

  ```json
  {
      "code":1,
      "msg":"success",
      "data":null
  }
  ```



### 7. Career URL & University Rankings

#### 7.1 Foe-Name

- Basic Info

  ```
  URL: /api/student/foe-name
  Method: POST
  Description: Fetches career information (foe_code, foe_name, ranking, salary_median) based on student_id.
  ```

- Request Example:

  ```
  {
      "student_id": "1"
  }
  ```

- Response Example:

  ```
  {
      "code": 1,
      "msg": "success",
      "data": [
          {
              "foe_code": "0103",
              "foe_name": "Information Systems",
              "ranking": 1,
              "salary_median": 100000
          }
      ]
  }
  ```



#### 7.2 Career Info

- Basic Info

  ```
  URL: /api/student/career-info
  Method: POST
  Description: Fetches detailed career information including salary and career names based on student_id and foe_code.
  ```

- Request Example

  ```
  {
      "student_id": "1",
      "foe_code": "0611"
  }
  ```

- Response Example

  ```
  {
      "code": 1,
      "msg": "success",
      "data": {
          "career_1": "Project Implementation Specialist",
          "career_2": "Information Manager",
          "career_3": "Security Analyst",
          "career_4": "Lecturer",
          "career_5": "Consultant",
          "salary_min": 85000,
          "salary_q1": 95000,
          "salary_median": 100000,
          "salary_q3": 115000,
          "salary_max": 140000
      }
  }
  ```

#### 7.3 University Info

- Basic Info

  ```
  URL: /api/student/university-info
  Method: POST
  Description: Fetches university and course information based on student_id and foe_code.
  ```

- Request Example

  ```
  {
      "student_id": "1",
      "foe_code": "0203"
  }
  ```

- Response Example

  ```
  {
      "code": 1,
      "msg": "success",
      "data": [
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
          }
      ]
  }
  ```

  

### 8. Home Page

#### 8.1 Get Academic Performance

- Basic Info

  ```
  URL: /api/student/academic-info/{studentID}
  ```

  

- Request: Path Parameter

- Response Example

  ```
  {
      "code": 1,
      "msg": "success",
      "data": {
          "studentInfo": {
              "studentId": 1,
              "studentName": "Steve Smith",
              "academicCountryId": 1,
              "percentile": 0.005
          },
          "country": {
              "countryId": 1,
              "countryName": "Australia",
              "educationSystem": "ATAR"
          },
          "performances": [
              {
                  "studentScoreId": 2,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Overall",
                  "scoreObtained": 99.5,
                  "scoreTotal": 99.95,
                  "scoreMedian": 95.0
              },
              {
                  "studentScoreId": 3,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Maths",
                  "scoreObtained": 96.0,
                  "scoreTotal": 100.0,
                  "scoreMedian": 90.0
              },
              {
                  "studentScoreId": 4,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Maths Extension",
                  "scoreObtained": 47.0,
                  "scoreTotal": 50.0,
                  "scoreMedian": 40.0
              },
              {
                  "studentScoreId": 5,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "English",
                  "scoreObtained": 94.0,
                  "scoreTotal": 100.0,
                  "scoreMedian": 88.0
              },
              {
                  "studentScoreId": 6,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Physics",
                  "scoreObtained": 93.0,
                  "scoreTotal": 100.0,
                  "scoreMedian": 83.0
              },
              {
                  "studentScoreId": 7,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Chemistry",
                  "scoreObtained": 93.0,
                  "scoreTotal": 100.0,
                  "scoreMedian": 75.0
              },
              {
                  "studentScoreId": 8,
                  "studentId": 1,
                  "academicCountryId": 1,
                  "subjectName": "Economics",
                  "scoreObtained": 94.0,
                  "scoreTotal": 100.0,
                  "scoreMedian": 81.0
              }
          ]
      }
  }
  ```

  

#### 8.2 Student Survey Answer & Progress

- Basic Info

  ```
  URL: /api/student/answers/{studentID}/{surveyID}
  ```

  

- Request: Path Parameter

  ```
  /api/student/answers/2/1
  ```

- Response

  ````
  {
      "code": 1,
      "msg": "success",
      "data": {
          "surveyAnswerInfo": {
              "answerId": 33,
              "studentId": 2,
              "surveyId": 1,
              "createdAt": "2024-10-24T13:52:36",
              "currentSection": 3,
              "currentNumOfQuestion": 5,
              "totalSections": null,
              "currentSectionTotalQuestions": null
          },
          "answerDetails": []
      }
  }
  ````

  



## DB Design

### 1. Login & Register

Student

| Field Name       | Data Type       | Comment     |
| ---------------- | --------------- | ----------- |
| student_id       | BIGINT UNSIGNED | Primary key |
| student_password | VARCHAR(255)    | /           |
| student_email    | VARCHAR(255)    | /           |

### 2.Survey & Display

Survey Section Analysis

- Entity:
  - Survey
  - Specific question content
  - Some questions contain options
  - Response information
- Relationship:
  - A survey contains multiple questions, each question belongs to one survey (1:N).
  - A question can have multiple options, each option belongs to one question (1:N).
  - A survey has one response, and one response corresponds to one survey (1:1).
- The Survey Module Database includes:
  - Survey Table (Surveys): Stores the summary information of surveys, such as survey ID, title, creation date, etc.
  - Question Table (Questions): Stores questions within the survey, including question ID, data type, question content, etc.
  - Option Table (Options): Stores options for questions, such as options for single-choice or multiple-choice questions.
  - Response Table (Responses): Stores response data, including response ID, survey ID, question ID, option ID, etc.



#### 1. survey_info Table

| Field Name         | Data Type        | Comment     |
| ------------------ | ---------------- | ----------- |
| survey_id          | BIG INT UNSIGNED | Primary key |
| survey_name        | VARCHAR(255)     | /           |
| Survey_description | TEXT             | /           |
| screated_at        | DATETIME         | /           |

#### 2. section1to4_info Table

| Field Name            | Data Type        | Comment     |
| --------------------- | ---------------- | ----------- |
| section_id            | BIG INT UNSIGNED | Primary key |
| section_num_of_survey | INT UNSIGNED     |             |
| section_name          | VARCHAR(255)     |             |
| survey_id             | BIG INT UNSIGNED | Foreign key |

#### 3. section1to4_question Table

| Field Name              | Data Type                                      | Comment     |
| ----------------------- | ---------------------------------------------- | ----------- |
| question_id             | BIG INT UNSIGNED                               | Primary key |
| question_num_of_section | INT UNSIGNED                                   |             |
| question_name           | VARCHAR(255)                                   |             |
| question_text           | TEXT                                           |             |
| question_description    | TEXT                                           |             |
| question_instruction    | TEXT                                           |             |
| question_type           | ENUM("ranking","single_choice","short_answer") |             |
| img_url                 | TEXT                                           |             |
| section_id              | BIG INT UNSIGNED                               | Foreign key |
| created_at              | DATETIME                                       |             |

#### 4. section1to4_option Table

| Field Name  | Data Type       | Comment     |
| ----------- | --------------- | ----------- |
| option_id   | int             | Primary key |
| question_id | BIGINT UNSIGNED | Foreign key |
| option_text | TEXT            |             |
| meaning     | ENUM()          |             |

#### 5. survey_answer_info Table

| Field Name              | Data Type       | Comment     |
| ----------------------- | --------------- | ----------- |
| answer_id               | BIGINT UNSIGNED | Primary key |
| student_id              | BIGINT UNSIGNED | Foreign key |
| survey_id               | BIGINT UNSIGNED | Foreign key |
| created_at              | DATETIME        |             |
| current_section         | INT             |             |
| current_num_of_question | INT             |             |

#### 6. survey_answer_string_detail Table

| Field Name              | Data Type       | Comment     |
| ----------------------- | --------------- | ----------- |
| answer_string_detail_id | BIGINT UNSIGNED | Primary key |
| answer_id               | BIGINT UNSIGNED | Foreign key |
| question_id             | BIGINT UNSIGNED | Foreign key |
| answer_text             | TEXT            |             |
| created_at              | DATETIME        |             |

#### 7. section1_scores Table

| Field Name | Data Type       | Comment |
| ---------- | --------------- | ------- |
| student_id | BIGINT UNSIGNED |         |
| H          | INT             |         |
| P          | INT             |         |
| A          | INT             |         |
| L          | INT             |         |
| S          | INT             |         |
| max_score  | INT             |         |

#### 8. section2_scores Table

| Field Name | Data Type       | Comment |
| ---------- | --------------- | ------- |
| student_id | BIGINT UNSIGNED |         |
| A          | INT             |         |
| S          | INT             |         |
| I          | INT             |         |
| C          | INT             |         |
| E          | INT             |         |
| R          | INT             |         |
| max_score  | INT             |         |



#### 9. section3_scores Table

| Field Name | Data Type       | Comment |
| ---------- | --------------- | ------- |
| student_id | BIGINT UNSIGNED |         |
| E          | INT             |         |
| I          | INT             |         |
| S          | INT             |         |
| N          | INT             |         |
| T          | INT             |         |
| F          | INT             |         |
| J          | INT             |         |
| P          | INT             |         |
| type       | VARCHAR(255)    |         |



#### 10. section4_scores Table

| Field Name | Data Type       | Comment |
| ---------- | --------------- | ------- |
| student_id | BIGINT UNSIGNED |         |
| Q1         | INT             |         |
| Q2         | INT             |         |
| Q3         | INT             |         |
| total      | INT             |         |



### 3.Daily Mood

daily_mood Table

| Field Name | Data Type       | Comment               |
| ---------- | --------------- | --------------------- |
| mood_id    | BIGINT UNSIGNED | Primary Key           |
| student_id | BIGINT UNSIGNED | *Logical* Foreign Key |
| mood_data  | Date            |                       |
| mood_score | INT UNSIGNED    |                       |



### 4.Calendar

task Table

| Field Name  | Data Type       | Comment |
| ----------- | --------------- | ------- |
| id          | BIGINT UNSIGNED |         |
| date        | DATE            |         |
| name        | VARCHAR(255)    |         |
| event_time  | DATETIME        |         |
| description | DATETIME        |         |
| student_id  | BIGINT UNSIGNED |         |



### 5.Interesting Hub



### 6.Need Help Button

| Field Name       | Data Type       | Comment     |
| ---------------- | --------------- | ----------- |
| help_id          | BIGINT UNSIGNED | Primary Key |
| student_id       | BIGINT UNSIGNED | Foreign Key |
| student_phone    | VARCHAR(20)     |             |
| student_email    | VARCHAR(255)    |             |
| application_date | Date            |             |



### 7. Career Recommendation & University Ranking

#### 1. student _career_info Table

| Field Name    | Data Type       | Comment     |
| ------------- | --------------- | ----------- |
| career_id     | BIGINT UNSIGNED | Primary Key |
| student_id    | BIGINT UNSIGNED | Foreign Key |
| foe_code      | VARCHAR(255)    |             |
| foe_name      | VARCHAR(255)    |             |
| career_1      | VARCHAR(255)    |             |
| career_2      | VARCHAR(255)    |             |
| career_3      | VARCHAR(255)    |             |
| career_4      | VARCHAR(255)    |             |
| career_5      | VARCHAR(255)    |             |
| salary_min    | INT             |             |
| salary_q1     | INT             |             |
| salary_median | INT             |             |
| salary_q3     | INT             |             |
| salary_max    | INT             |             |
| ranking       | INT             |             |



#### 2. student _career_info Table

| Field Name            | Data Type       | Comment     |
| --------------------- | --------------- | ----------- |
| university_id         | BIGINT UNSIGNED | Primary Key |
| student_id            | BIGINT UNSIGNED | Foreign Key |
| foe_code              | VARCHAR(255)    |             |
| university            | VARCHAR(255)    |             |
| course                | VARCHAR(255)    |             |
| duration_weeks        | INT             |             |
| course_cost           | VARCHAR(255)    |             |
| atar_min_non_adj      | DOUBLE          |             |
| atar_med_non_adj      | DOUBLE          |             |
| atar_graduated        | DOUBLE          |             |
| admission_center      | VARCHAR(255)    |             |
| admission_center_code | VARCHAR(255)    |             |
| target_or_reach       | VARCHAR(255)    |             |



### 8. Home Page

#### 1. academic_country Table

| Field Name       | Data Type    | Comment     |
| ---------------- | ------------ | ----------- |
| country_id       | INT UNSIGNED | Primary key |
| country_name     | VARCHAR(255) |             |
| education_system | VARCHAR(50)  |             |

#### 2. academic_performance

| Field Name          | Data Type       | Comment |
| ------------------- | --------------- | ------- |
| student_score_id    | BIGINT UNSIGNED |         |
| student_id          | BIGINT UNSIGNED |         |
| academic_country_id | INT UNSIGNED    |         |
| subject_name        | DECIMAL(5, 2)   |         |
| score_obtained      | DECIMAL(5, 2)   |         |
| score_total         | DECIMAL(5, 2)   |         |
| score_median        | DECIMAL(5, 2)   |         |

#### 3. student_academic_info

| Field Name               | Data Type    | Comment     |
| ------------------------ | ------------ | ----------- |
| student_academic_info_id | INT UNSIGNED | Primary key |
| student_id               | VARCHAR(255) |             |
| student_name             | VARCHAR(255) |             |
| academic_country_id      | INT UNSIGNED |             |
| percentile               | FLOAT        |             |
