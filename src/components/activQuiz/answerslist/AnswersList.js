import React from 'react';
import classes from './AnswersList.module.scss';
import AnswerItem from './answerItem/AnswerItem'

const AnswersList = props => (
    
        <ul className={classes.AnswersList}>
           {props.answers.map((answer,index)=>{
                   return(
                           <AnswerItem key={index}
                              answer={answer}
                              onAnswer={props.onAnswer}
                              state={props.state?props.state[answer.id]:null}
                           />
                   )

           })}
        </ul>

    
)
export default AnswersList;