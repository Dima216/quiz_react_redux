import React from 'react';
import classes from './FinishedQuiz.module.scss';
import Button from '../ui/button/Button';
import {Link} from 'react-router-dom'


const FinishedQuiz = props => {
    const successCount=Object.keys(props.results).reduce((total,key)=>{
        if(props.results[key]==='success'){
            total++
        }
        return total
    },0)
    // это для подсчёта правильных ответов
    return(
    <div className={classes.FinishedQuiz}>
        <ul>
          {
              props.quiz.map((quizItem,index)=>{
                 const cls=['fa',
                 props.results[quizItem.id]=== 'error' ? 'fa-times':'fa-check',
                 classes[props.results[quizItem.id]]
                ]
                  return(
                <li key={index}>
                   <strong>{index+1}. </strong>
                 {quizItem.question}
                   <i className={cls.join(' ')}/>
                </li>
              )})
          }
        </ul>
        <p>Правильно {successCount} из {props.quiz.length}</p>
        <div>
          <Button onClick={props.repeat} type='primary'>Повторить</Button>
          <Link to='/'>
              <Button type='success'>Перейти в список тестов</Button>
          </Link>
          
        </div>
    </div>
)}
export default FinishedQuiz;