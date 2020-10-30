import {
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    REPEAT
} from '../action/ActionTypes'

const initialState ={
    // state QuizList
    quizes:[],
    loading: false,
    error: null,
    //state Quz
    results:{},// это для результата(FinishedQuiz)
    finished:false,// это чтобы пейти к результатам,когда закончаться вопросы
    answerState:null,// для изменения стилей(красный,зелёный)
    numberQuestion:0,// для перехода на другой вопрос
    quiz: null
}

export default function quizReducer( state = initialState,action){
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {...state,loading: true}
        case FETCH_QUIZES_SUCCESS:
            return {...state, quizes:action.payload, loading: false}
        case FETCH_QUIZES_ERROR:
            return {...state,loading: false, error: action.payload}
        case FETCH_QUIZ_SUCCESS:
                return {...state, quiz: action.payload, loading: false} 
        case QUIZ_SET_STATE:
                return {...state, answerState: action.answerState,results: action.results}
        case FINISH_QUIZ:
                return {...state, finished: true} 
        case QUIZ_NEXT_QUESTION:
                return {...state, numberQuestion: action.numberQuestion, answerState:null} 
        case REPEAT:
                return {...state, results:{}, finished:false, answerState:null,numberQuestion:0}    
        default:
            return state;
    }
}