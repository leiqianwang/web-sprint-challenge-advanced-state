import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';


const Wheel = (props)  => {
   const {wheelPosition, moveClockwise, moveCounterClockwise} = props;

   const handleMoveClockwise = () => {
    moveClockwise();
  };

  const handleMoveCounterClockwise = () => {
    moveCounterClockwise();
  };

  return (
    <div id="wrapper">
    <div id="wheel">
      {[...Array(6)].map((_, i) => (
        <div
         key={i} 
        className={`cog ${wheelPosition === i ? 'active' : ''}`} 
        style={{ '--i': i }
        }>
          {wheelPosition === i ? 'B' : ''}
        </div>
      ))}
    </div>
    <div id="keypad">
      <button onClick={handleMoveCounterClockwise}>Counter clockwise</button>
      <button onClick={handleMoveClockwise}>Clockwise</button>
    </div>
  </div>
);

        
        // /* <div className="cog active" style={{ "--i": 0 }}>B</div>
        // <div className="cog" style={{ "--i": 1 }}></div>
        // <div className="cog" style={{ "--i": 2 }}></div>
        // <div className="cog" style={{ "--i": 3 }}></div>
        // <div className="cog" style={{ "--i": 4 }}></div>
        // <div className="cog" style={{ "--i": 5 }}></div>--i is a custom CSS property, no need to touch that nor the style object */
   
      };

  const mapStateToProps = state => {
    return {
      wheelPosition: state.wheel
      }
  }
export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);