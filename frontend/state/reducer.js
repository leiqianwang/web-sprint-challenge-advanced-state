// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
   
      case MOVE_CLOCKWISE:
        // If the current position is the last cog (5), wrap around to the first cog (0)
        return state === 5 ? 0 : state + 1;
  
      case MOVE_COUNTERCLOCKWISE:
        // If the current position is the first cog (0), wrap around to the last cog (5)
        return state === 0 ? 5 : state - 1;
  
      default:
        return state;
    }
  }

const initialQuizState = null
function quiz(state = initialQuizState, action) {
     switch(action.type) {
      case SET_QUIZ_INTO_STATE:
          return action.payload;
          default:
            return state;
     }

}

const initialSelectedAnswerState = {};
function selectedAnswer(state = initialSelectedAnswerState, action) {
    switch(action.type) {
       case SET_SELECTED_ANSWER:
         // Assuming action.payload is structured as { quiz_id, answer_id }
      //const { answer_id } = action.payload;
      return action.payload;
      default:
        return state;
    }
  }


const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
       switch(action.type) {
          case SET_INFO_MESSAGE:
            return action.payload;
        default:
          return state;
      }
    }

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
     switch(action.type) {
        case INPUT_CHANGE:
          return {
        ...state,
        [action.payload.name]: action.payload.value
        //newQuestion: action.paylaod,
        //newTrueAnswer: action.paylaod,
        //newFalseAnswer: action.payload
      };
      case RESET_FORM: 
      return initialFormState;
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
