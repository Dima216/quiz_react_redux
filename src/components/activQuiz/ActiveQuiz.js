import React from 'react';
import classes from './ActiveQuiz.module.scss';
import AnswersList from './answerslist/AnswersList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
           <span>
               <strong>{props.numberQuestion}.</strong>&nbsp;
               {props.question}
            </span>
            <small>{props.numberQuestion} из {props.quizLenght}</small>
        </p>
        <AnswersList
            answers={props.answers}
            onAnswer={props.onAnswer}
            state={props.state}
        />

    </div>
)
export default ActiveQuiz;