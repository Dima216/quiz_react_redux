import React from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/ui/loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/action/ActionQuiz'

class QuizList extends React.Component {
   
    componentDidMount(){
        this.props.fetchQuizes()
       // console.log(this.props.st) 
    }
 


    
    renderQuizes(){
        return this.props.quizes.map(quiz => {
            return(
            <li key={quiz.id}>
                <NavLink to={'/quiz/'+ quiz.id}>
                   {quiz.name} 
                </NavLink>
            </li>
            )
        })
    }
  render(){
  return (
    <div className={classes.QuizList}>
       <div>
           <h1> Список тестов </h1>
            { this.props.loading && this.props.quizes.length !== 0  
                   ? <Loader/>
                   : <ul>
                      {this.renderQuizes()}
                     </ul>
            }  
        </div>

    </div>
  )
 }
}
function mapStateToProps(state){
      return {
          quizes: state.quiz.quizes,
          loading: state.quiz.loading,
         // st: state
          
      }
  }
  function mapDispatchToProps(dicpatch){
      return{
          fetchQuizes: () => dicpatch(fetchQuizes())
          
      }
  }

export default connect(mapStateToProps,mapDispatchToProps)(QuizList)
