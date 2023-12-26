import React from 'react';
import { connect } from 'react-redux';
// import * as actionCreators from '../state/action-creators'
import { inputChange, postQuiz, resetForm } from '../state/action-creators';
// import {form} from '../state/reducers';

// const initialFormState = {
//   newQuestion: '',
//   newTrueAnswer: '',
//   newFalseAnswer: '',
// }


export function Form(props) {
       const{inputChange, postQuiz, resetForm, form} = props;

  const onChange = evt => {
        const {id, value} = evt.target;
    inputChange(id, value);
  }

  const onSubmit = evt => {
        evt.preventDefault();
        postQuiz(form);
        resetForm();

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => ({
  form: state.form // Assuming form state has the structure { newQuestion, newTrueAnswer, newFalseAnswer }
});


export default connect(mapStateToProps, { inputChange, postQuiz, resetForm })(Form);