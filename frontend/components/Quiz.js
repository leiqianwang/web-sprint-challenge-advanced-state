import React from 'react';
import { connect } from 'react-redux';
import { selectAnswer } from '../state/action-creators';
import { setMessage } from '../state/action-creators';
import { useEffect } from 'react';
import { fetchQuiz } from '../state/action-creators';

const Quiz = (props) => {
  const { quiz, selectAnswer, selectedAnswer, setMessage, fetchQuiz } = props;

          console.log(quiz);
          useEffect(() => {
            !quiz && fetchQuiz();
          }, []);


          const toggleSelected = (answerId) => {
            console.log(answerId);
            selectAnswer(selectedAnswer === answerId ? null : answerId);
          };
        
          const handleMessageDisplay = () => {
            const answerIsCorrect = quiz.answerId === selectedAnswer;
            if (answerIsCorrect) {
              setMessage('Nice job! That was the correct answer');
            } else {
              setMessage('What a shame! That was the incorrect answer');
            }
          };


      return (
        <div className='quiz'>
       
          {quiz ? (
            <>
              <h2>{quiz.question}</h2>
              <div className={selectedAnswer === quiz.answers[0].answer_id ? 'selectedAnswer' : ''}>
                {quiz.answers[0].text}
                <button onClick={() => toggleSelected(quiz.answers[0].answer_id)}>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
              <div className={selectedAnswer === quiz.answers[1].answer_id ? 'selectedAnswer' : ''}>
                {quiz.answers[1].text}
                <button onClick={() => toggleSelected(quiz.answers[1].answer_id)}>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button id="submitAnswerBtn" onClick={handleMessageDisplay}>Submit answer</button>
               
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
    
    export default connect(mapStateToProps, { selectAnswer, setMessage, fetchQuiz })(Quiz);