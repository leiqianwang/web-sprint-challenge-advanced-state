import React from 'react';
import { connect } from 'react-redux';
// import * as actionCreators from '../state/action-creators'
import { inputChange, postQuiz, resetForm } from '../state/action-creators';


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
        const { newQuestion, newTrueAnswer, newFalseAnswer } = form;
           postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
        //postQuiz(form);
        resetForm();

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={form.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled={form.newQuestion.trim().length < 1 || form.newTrueAnswer.trim().length < 1 || form.newFalseAnswer.trim().length < 1} 
      id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => ({
  form: state.form // Assuming form state has the structure { newQuestion, newTrueAnswer, newFalseAnswer }
});


export default connect(mapStateToProps, { inputChange, postQuiz, resetForm })(Form);