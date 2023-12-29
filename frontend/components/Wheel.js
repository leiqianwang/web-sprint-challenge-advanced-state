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
        <div className={wheelPosition === 0 ? 'cog active' : 'cog'} style={{ "--i": 0 }}>{wheelPosition === 0 ? 'B' : ''}</div>
        <div className={wheelPosition === 1 ? 'cog active' : 'cog'} style={{ "--i": 1 }}>{wheelPosition === 1 ? 'B' : ''}</div>
        <div className={wheelPosition === 2 ? 'cog active' : 'cog'} style={{ "--i": 2 }}>{wheelPosition === 2 ? 'B' : ''}</div>
        <div className={wheelPosition === 3 ? 'cog active' : 'cog'} style={{ "--i": 3 }}>{wheelPosition === 3 ? 'B' : ''}</div>
        <div className={wheelPosition === 4 ? 'cog active' : 'cog'} style={{ "--i": 4 }}>{wheelPosition === 4 ? 'B' : ''}</div>
        <div className={wheelPosition === 5 ? 'cog active' : 'cog'} style={{ "--i": 5 }}>{wheelPosition === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => moveClockwise()}>Clockwise</button>
      </div>
    </div>
	);
     {/* --i is a custom CSS property, no need to touch that nor the style object */}
      };
      {/* {[...Array(6)].map((_, i) => (
        <div
         key={i} 
        className={`cog ${wheelPosition === i ? 'active' : ''}`} 
        style={{ '--i': i }
        }>
          {wheelPosition === i ? 'B' : ''}
        </div>
      ))}
    </div> */}
   {/* --i is a custom CSS property, no need to touch that nor the style object */}

        

  const mapStateToProps = state => {
    return {
      wheelPosition: state.wheel
      }
  }
export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);