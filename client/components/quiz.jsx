import React from 'react'
import notecard from '../images/notecard3.jpg'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Quiz extends React.Component {
  constructor(props) {
  	super(props)
      this.state = {
        questionIndex: 0,
        currentQuestion: '',
        answer: '',
        answerChoices: [],
        score: 0
      }
    this.handleUserAnswer = this.handleUserAnswer.bind(this);
  }

  componentWillMount() {
    //this makes a fused array of the correct answer
    //mingled with the incorrect answer
    const combinedAnswers = [].concat(this.props.questions[0].incorrect_answers,
                                      [this.props.questions[0].correct_answer]);

    this.setState({
      currentQuestion: this.props.questions[0].question,
      answer: this.props.questions[0].correct_answer,
      answerChoices: this.shuffleAnswerChoices(combinedAnswers)
    })
  }

  shuffleAnswerChoices(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  handleUserAnswer(answer) {
    var score = this.state.score;

    if (answer === this.state.answer) {
      score += 1;
      this.setState({score: this.state.score+1});
    }

    if (this.state.questionIndex === 4 ) this.props.onCompletion(score);
    else this.nextQuestion();
  }

  nextQuestion() {
    const questionIndex = this.state.questionIndex + 1;
    const nextAnswers = [].concat(this.props.questions[questionIndex].incorrect_answers,
                                  [this.props.questions[questionIndex].correct_answer]);

    this.setState({
        questionIndex: questionIndex,
        currentQuestion: this.props.questions[questionIndex].question,
        answer: this.props.questions[questionIndex].correct_answer,
        answerChoices: this.shuffleAnswerChoices(nextAnswers)
    });
  }

  //this prevents HTML entities from appearing in Question displays
  decodeHTMLEntities(text) {
    var entities = {
      '#039': "'",
      'quot': '"',
      'ldquo': '"',
      'rdquo': '"',
      'rsquo' : "'",
      'eacute' : '`',
      '&uuml': 'ü',
      '&deg': '°'
    }
    return text.replace(/&([^;]+);/gm, function (match, entity) {
      return entities[entity] || match
    })
  }


  renderAnswerOptions(answer, func) {
    return (
      <li className="answerOption"
          onClick={(e)=>func(answer)}
          type="A">
          {answer}
      </li>
    );
  }

  render() {
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
        <div key={this.state.questionIndex}>
          <div id="questionCard">
            <img src={notecard} alt="notecard" />
            <p>{this.decodeHTMLEntities(this.state.currentQuestion)}</p>
          </div>
          <ul className="answerOptions">
            {this.state.answerChoices.map((ans)=>this.renderAnswerOptions(this.decodeHTMLEntities(ans), this.handleUserAnswer))}
          </ul>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
}


export default Quiz;
