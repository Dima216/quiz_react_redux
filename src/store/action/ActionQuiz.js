import {
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    REPEAT
} from './ActionTypes'
import axios from 'axios'

export function fetchQuizes(){
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
     try{ const response = await axios.get('https://react-quiz-d732c.firebaseio.com/quizes.json')
          const quizes=[]
          //console.log(response.data)
          Object.keys(response.data).forEach((key,index)=>{
              quizes.push({
                  id:key,
                  name:`Тест №${index+1}`
              })
            })
            dispatch(fetchQuizesSuccess(quizes))  
       } catch(e){
           dispatch(fetchQuizesError(e))
       }
 } 
} 
export function fetchQuizById(quizId){
    return async (dispatch) => {
        dispatch(fetchQuizesStart(quizId))
        try{ const response = await axios.get(`https://react-quiz-d732c.firebaseio.com/quizes/${quizId}.json`)
        const quiz = response.data
        dispatch(fetchQuizSuccess(quiz)) 
        }catch(e){
        dispatch(fetchQuizesError(e))
      }
    }

} 
export function onAnswer(answerId){
    return (dispatch,getState) => {
        const state = getState().quiz
        if(state.answerState){
            const key= Object.keys(state.answerState)[0]
            if(state.answerState[key]==='success'){
            return
        }//это чтобы при двойном клике по правильному ответу не пропускался следующий вопрос
        }
      const question = state.quiz[state.numberQuestion]
      const results = state.results// это для результата(FinishedQuiz)
      if(question.rightAnswerId===answerId){

          if(!results[question.id]){
          results[question.id]='success'
        }
        dispatch(quizSetState({[answerId]:'success'},results))
          
          const timout=setTimeout(()=>{
             if(finish(state)){
                 dispatch(finishQuiz())
             }else{
                 dispatch(quizNextQuestion(state.numberQuestion+1))
            }
              clearTimeout(timout)
          },1000)
          
      }else{
          results[question.id]='error'
          dispatch(quizSetState({[answerId]:'error'},results))
        
        }

    }
    
}
function finish (state) {
    return state.numberQuestion + 1 === state.quiz.length
}

export function fetchQuizesStart(){
    return{
        type:FETCH_QUIZES_START
       }
}
 export function fetchQuizesSuccess(quizes){
     return{
         type:FETCH_QUIZES_SUCCESS,
         payload: quizes
        
    }
 }
export function fetchQuizesError(e){
    return{
        type:FETCH_QUIZES_ERROR,
        payload: e
        
    }
}
export function fetchQuizSuccess(quiz){
    return{
        type:FETCH_QUIZ_SUCCESS,
        payload: quiz
        
    }
}
export function quizSetState(answerState,results){
    return {
        type: QUIZ_SET_STATE,
        answerState, // если ключ изначения одинаковые ,можно сакратить до одгого answerState
        results// тоже
    }
}
export function finishQuiz(){
    return {
        type: FINISH_QUIZ,
        
    }
}
export function quizNextQuestion(numberQuestion){
    return {
        type: QUIZ_NEXT_QUESTION,
        numberQuestion    
    }
}
export function repeat(){
    return{
        type: REPEAT
    }
}