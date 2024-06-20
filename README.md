<p align="center">
 <img src="https://opentdb.com/images/logo.png">
</p>


# Trivia Project App

Play some trivia provided and submitted by various users with the use of OpenTDB!

## Link to Webpage
<a href="https://app317-trivia-app.netlify.app/">Trivia App</a>


## Acknowledgements

 - [OpenTDB API](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)



## Features

- Category selection featuring various topics
- Instant feedback on a correct/incorrect answers
- Total correct/incorrect answers for a given category
- Continue and return to category options for the results screen



## API Reference

#### Get url from Axios

```javascript
await axios.get()
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` |  Fetches url from API |

```javascript 
const response = await axios.get(url)
```
## Documentation
### useTriviaStore.jsx
`useTriviaStore` is a very crucial part of our application by managing the state for trivia categories, questions, and any other user interactions. Zustand makes setting up state variables efficient, making it easy to retrieve and update them across our multiple components, which helps in overall avoiding code redundancy and excessive local state mangement. 

Here's two of the most vital functions within `useTriviaStore`

`fetchQuestions`
```javascript
  fetchQuestions: async (category) => {
    set({ loading: true, error: null });
    const token = get().sessionToken;

    if (!token) {
      set({ loading: false, error: 'Failed to fetch session token' });
      return;
    }
    try {
      console.log('Fetching questions with token: ', token);
      await delay(5000); //To adhere to the rate limiter
      const questions = await getQuestions(category, token);
      console.log('Questions fetched:', questions);
      set({ questions, currentQuestionIndex: 0, loading: false });
      get().shuffleAnswers();
      if (questions.length === 0) {
        set({
          loading: false,
          error:
            'No questions available for selected category. You have exhausted all questions or your session has expired.',
        });
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      set({ loading: false, error: 'Failed to fetch questions' });
    }
  },

 
```
`fetchQuestions` handles the core functionality of fetching trivia questions from OpenTDB. It sets the loading state and checks for a session token, which helps to avoid retriving duplicate questions. The function then attempts to fetch the questions, while also adhering to OpenTDB's rate limit by utilizing a five second delay. If no questions are returned, or if an error occured, it sends out the error messages.
```javascript
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
``` 
The `delay` utility function is important to manage the API rate limits and preventing 429 errors due to excessive requests.

`shuffleAnswers`
```javascript
  shuffleAnswers: () => {
    const currentQuestionIndex = get().currentQuestionIndex;
    const questions = get().questions;
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];
      set({ shuffledAnswers: shuffleArray(answers) });
    }
  },
```
OpenTDB returns the correct and incorrect answers separately, so this function combines them into one array and shuffles it to prevent the correct answer from always appearing in the same position.

```javascript
export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
``` 
A custom sort to randomize the answers.

### Home.jsx
`Home.jsx` serves as the landing page for the app, allowing users to select a trivia category and start the quiz.

### Quiz.jsx
 ```javascript
 {he.decode(currentQuestion.question)}
 {he.decode(answer)}
 ```
In `Quiz.jsx`, I use the 'he' library to decode HTML characters found in the API's questions and answers. This approach is preferable to using functions like innerHTML or dangerouslySetInnerHTML, which could bypass React's virtual DOM checks and lead to potential XSS attacks.

### Results.jsx
`Results.jsx` displays the total correct and incorrect answers for a category when the quiz is concluded, while also giving the option to continue with another quiz within the same category, or returning home.
## 🔗 Links
[![Static Badge](https://img.shields.io/badge/Trivia_App-61DBFB?style=for-the-badge&logo=react&labelColor=black)](https://app317-trivia-app.netlify.app/)

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://app317-portfolio.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anthony-muniz-bueno-644648215/)






