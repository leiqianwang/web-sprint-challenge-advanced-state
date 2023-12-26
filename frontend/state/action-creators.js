import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, 
  SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types";

  import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
     return {
      type: MOVE_CLOCKWISE
     }
 }

export function moveCounterClockwise() { 
     return {type: MOVE_COUNTERCLOCKWISE}
}

export function selectAnswer(answer_id) {
  console.log(answer_id);
  return {
    type: SET_SELECTED_ANSWER, payload: answer_id
  }
 }

export function setMessage(message) {
  return {
        type: SET_INFO_MESSAGE, payload: message };
  };

export function setQuiz(quiz) { 
  return {type: SET_QUIZ_INTO_STATE, payload: quiz}
}

export function inputChange(name, value) { 
  return {
          type: INPUT_CHANGE, 
           payload: {name, value}}
}

export function resetForm() { 
  return {type: RESET_FORM}
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // Dispatch an action to reset the quiz state and display the loading message
    console.log("fetch quiz");
    dispatch(setQuiz(null));
        //console.log(fetchQuiz());
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {      // On successful GET:
      // - Dispatch an action to send the obtained quiz to its state
      console.log(res);
      dispatch(setQuiz(res.data));   //res.data.data??
    })
    .catch(err => {
      const errToDisplay = err.response ? err.response.data.message : err.message
      dispatch(setMessage(errToDisplay)) 
    })
  }
}

export function postAnswer(answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    dispatch(selectAnswer(null));
    // - Dispatch an action to set the server message to state
   
    axios.post('http://localhost:9000/api/quiz/answer', { answer_id: selectedAnswer, quiz_id: quiz.id })
    .then(res => {
      dispatch(selectAnswer(res.data));
      const message = res.data.isCorrect
      ? 'Nice job! That was the correct answer'
      : 'What a shame! That was the incorrect answer';
    setMessage(message);
  })
    
    dispatch(fetchQuiz());
    // - Dispatch the fetching of the next quiz, (assuming fetchQuiz is another action creator)
      
    // .finally(res => {
    //   res.dispatch({type: SET_QUIZ_INTO_STATE, payload: setQuiz(quizData)});
    // })
  }
}

export function postQuiz(quizData) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    axios.post('http://localhost:9000/api/quiz/new', quizData)
    .then(res => {
      // Assuming the server response includes a property to indicate if the answer was correct
      const message = res.data.message || 'Quiz submitted successfully!';
      dispatch(setMessage(message));
      
      // Reset the form
      dispatch(resetForm());
    })

      // Dispatch action to reset the form
      // Replace RESET_FORM_ACTION_TYPE with the actual action type you have for resetting the form
  
    .catch(err => {
      const errorMessage = err.response.data.message;
      dispatch(setMessage(errorMessage));
    })
    .finally(() => {
       dispatch(fetchQuiz())
    });
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
}