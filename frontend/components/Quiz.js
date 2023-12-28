import React from 'react';
import { connect } from 'react-redux';
import { selectAnswer } from '../state/action-creators';
import { setMessage } from '../state/action-creators';
import { useEffect } from 'react';
import { fetchQuiz, postAnswer } from '../state/action-creators';

const Quiz = (props) => {
  const { quiz, selectAnswer, selectedAnswer, setMessage, postAnswer, fetchQuiz } = props;

  console.log(selectedAnswer);
  useEffect(() => {
    !quiz && fetchQuiz();
  }, []);


  const toggleSelected = (answerId) => {
    // Retrieve the current selected answer for this quiz
    if (!quiz) return; // If quiz data is not available, exit the function

    const currentSelectedAnswer = selectedAnswer[quiz.quiz_id] || null;
    const newSelectedAnswer = currentSelectedAnswer === answerId ? null : answerId;
  
    selectAnswer({ quiz_id: quiz.quiz_id, answer_id: newSelectedAnswer });
  };

  const handleAnswerClick = () => {
    if (quiz) {
      const answerId = selectedAnswer.answer_id;
      if (answerId) {
        postAnswer({quiz_id: quiz.quiz_id, answer_id: answerId});
      }
    }
  };
 

  return (
    <div className='quiz'>

      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div className={selectedAnswer.answer_id === quiz.answers[0].answer_id ? 'selectedAnswer' : ''}>
            {quiz.answers[0].text}
            <button onClick={() => toggleSelected(quiz.answers[0].answer_id)}>
              {selectedAnswer.answer_id === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
            </button>
          </div>
          <div className={selectedAnswer.answer_id === quiz.answers[1].answer_id ? 'selectedAnswer' : ''}>
            {quiz.answers[1].text}
            <button onClick={() => toggleSelected(quiz.answers[1].answer_id)}>
              {selectedAnswer.answer_id === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button id="submitAnswerBtn" onClick={() => postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })}>Submit answer</button>

          </div>
        </>
      ) : (
        <p>Loading next quiz...</p>
      )}
    </div>

  );
};


const mapStateToProps = state => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer
});

export default connect(mapStateToProps, { selectAnswer, setMessage, fetchQuiz, postAnswer })(Quiz);