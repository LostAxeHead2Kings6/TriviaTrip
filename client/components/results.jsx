import React from 'react'
import {Button, Table} from 'react-bootstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


function Results(props) {
  return (
      <ReactCSSTransitionGroup
       className="container"
       component="div"
       transitionName="fade"
       transitionEnterTimeout={800}
       transitionLeaveTimeout={500}
       transitionAppear
       transitionAppearTimeout={500}
     >
      <div id="reportCard">
       <h3>REPORT CARD</h3>
       <Table>
         <tr>
           <td><strong>Subject</strong></td>
           <td class="cardNotes">{subjects[props.category]}</td>
         </tr>
         <tr>
           <td><strong>Number Correct</strong></td>
           <td class="cardNotes">{props.score} for 5</td>
         </tr>
         <tr>
           <td><strong>Grade</strong></td>
           <td class="cardNotes">{grades[props.score]}</td>
         </tr>
       </Table>
       <div style={{textAlign: 'center'}}>
         <Button bsStyle="primary" bsSize="large" onClick={props.playAgain}>
             Play Again?
          </Button>
       </div>
      </div>
    </ReactCSSTransitionGroup>
  );
}

const subjects = {
  17: 'Science',
  25: 'Art',
  23: 'History',
  10: 'Literature',
  19: 'Math',
  22: 'Geography'
}

const grades = {
  0: 'F',
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'B+',
  5: 'A'
}

export default Results;
