import React from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/activQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz'
import Loader from '../../components/ui/loader/Loader'
//import axios from '../../axio/Axio'// создали компанент импортировали туда axios, чтобы сократить url адрес 
import {connect} from 'react-redux'
import{fetchQuizById,onAnswer,repeat} from '../../store/action/ActionQuiz'

class Quiz extends React.Component {
    /* state={
        results:{},// это для результата(FinishedQuiz)
        finished:false,// это чтобы пейти к результатам,когда закончаться вопросы
        answerState:null,// для изменения стилей(красный,зелёный)
        numberQuestion:0,// для перехода на другой вопрос
        loading:true,
        quiz: []
    } */
   
    //повтор теста
    /* repeat=()=>{
        this.setState({
            results:{},
            finished:false,
            answerState:null,
            numberQuestion:0
        })
    } */
   componentDidMount(){
       // console.log('Quiz ID =',this.props.match.params.id)
        this.props.fetchQuizById(this.props.match.params.id)
}
   componentWillUnmount(){
    this.props.repeat()
   }
  render(){
  return (
    <div className={classes.Quiz}>
       
       <div className={classes.QuizWrapper}>
           <h1>Ответьте на все вопросы</h1>
          { this.props.loading || !this.props.quiz  
            ? <Loader/>
            :this.props.finished
           ?<FinishedQuiz
                results={this.props.results}
                quiz={this.props.quiz}
                repeat={this.props.repeat}
           /> 

           :<ActiveQuiz
              answers={this.props.quiz[this.props.numberQuestion].answers}
              question={this.props.quiz[this.props.numberQuestion].question}
              onAnswer={this.props.onAnswer}
              quizLenght={this.props.quiz.length}
              numberQuestion={this.props.numberQuestion+1}
              state={this.props.answerState}

           />
           }
       </div>
    </div>
  )
 }
}

function mapStateToProps(state){
    return {
        results: state.quiz.results,
        finished: state.quiz.finished,
        answerState: state.quiz.answerState,
        numberQuestion: state.quiz.numberQuestion,
        loading: state.quiz.loading,
        quiz: state.quiz.quiz
        
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
        onAnswer: (answerId)=> dispatch(onAnswer(answerId)),
        repeat: () => dispatch(repeat())

        
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)