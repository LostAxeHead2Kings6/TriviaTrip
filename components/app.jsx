import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Categories from './categoryBanner.jsx'
import Quiz from './quiz.jsx'
import Results from './results.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
      this.state = {
        phase: 'selectCategory',
        questions: [],
        score: 0,
        categoryNum: null,
      }

    this.chooseCategory = this.chooseCategory.bind(this);
    this.showResults = this.showResults.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  chooseCategory(categoryNum) {
    axios.get(`https://opentdb.com/api.php?amount=5&category=${categoryNum}&difficulty=medium&type=multiple`)
    .then((response) => {
      console.log(response.data.results);
      this.setState({
        questions: response.data.results,
        phase: 'quiz',
        categoryNum: categoryNum
      })
    })
  }

  showResults(scoreNum) {
    this.setState({
      phase: 'results',
      score: scoreNum
    })
  }

  playAgain() {
    this.setState({
      phase: 'selectCategory',
      score: 0,
      questions: [],
      categoryNum: null
    })
  }

  render() {
    var categoryNum = this.state.categoryNum;
    var phase = this.state.phase;
    var questions = this.state.questions;
    var chooseCategory = this.chooseCategory;
    var score = this.state.score;
    var playAgain = this.playAgain;
    var showResults = this.showResults;

    return (
      <div>
        <h1>Trivia QuickDraw</h1>
        <div>
          {(function() {
            switch(phase) {
               case 'selectCategory':
                   return <Categories handleClick={chooseCategory} />;
               case 'quiz':
                   return <Quiz questions={questions}  onCompletion={showResults} />;
               case 'results':
                    return <Results category={categoryNum} score={score}  playAgain={playAgain} />;
            }
          })()}
        </div>
      </div>
    )

  }
}

ReactDOM.render(<App />, document.getElementById('app'));
