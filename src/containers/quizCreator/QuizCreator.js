import React from 'react'
import classes from './QuizCreator.module.scss'
import Button from '../../components/ui/button/Button'
import {createControl,validateControl,disabledHandler} from '../../form/formFramework'
import Input from '../../components/ui/input/Input'
import Select from '../../components/ui/select/Select'
import Auxiliary from '../../hoc/auxiliary/Auxiliary'// выступает только как корневой элемент, в оличии от div не создаёт тега
//import axios from 'axios'//это библиотека для работы с данными( передача данных на сервер и наоборот ,как ajax)
import {connect} from 'react-redux'
import{createQuizQuestion,finishCreateQuiz} from '../../store/action/ActionCreate'

function createOptionControl(number){
  return createControl(
    {label:`Вариант ${number}`, errorMessage:'Вариант не введён',id:number},
    {required:true}
  )// так мы функциями убираем дублирование кода( весь дублированный код кладём в функцию( а это объекты,которые являются значениями question и option), а потом вызываем ее в том месте где должен стоять этот код)
}
function createFormControls(){
  return{
    question: createControl(
      {label:'Введите вопрос',errorMessage:'Вопрос не введён'},
      {required:true}
    ),
    option1:createOptionControl(1),
    option2:createOptionControl(2),
    option3:createOptionControl(3),
    option4:createOptionControl(4)
  }
    }// все значения formControls(это объект из question и option) положили в функцию, для того чтобы изменять стейт , не так массивно

class QuizCreator extends React.Component {
  state={
    rightAnswerId:1,
    isFormValid:false,
    formControls:createFormControls()
  }
  onSubmitHandler=(event)=>{
    event.preventDefault()
  }
 addQuestionHandler=()=>{
    const item = this.state.formControls
    const questionItem={
      id: this.props.quiz.length + 1,
      question: item.question.value,
      answers:[
        {text:item.option1.value,id:item.option1.id},
        {text:item.option2.value,id:item.option2.id},
        {text:item.option3.value,id:item.option3.id},
        {text:item.option4.value,id:item.option4.id}
      ],
      rightAnswerId:this.state.rightAnswerId


    }
    this.props.createQuizQuestion(questionItem)
    this.setState({
      rightAnswerId:1,
      isFormValid:false,
      formControls:createFormControls()// обнуляем нашу форму
    })
     
  }
  createQuizHandler=  () => {
      this.setState({
        rightAnswerId:1,
        isFormValid:false,
        formControls:createFormControls()
      })
      this.props.finishCreateQuiz()
  }
  onChangeHandler=(event,controlName)=>{
     const formControlsCopi={...this.state.formControls}
    // console.log(formControlsCopi)
     const control= {...formControlsCopi[controlName]}
    // console.log(control)
     control.value=event.target.value
     control.touched=true
     control.valid= validateControl(control.value,control.validation)
     formControlsCopi[controlName]=control
     /*let isFormValid=true
     Object.keys(formControlsCopi).forEach((name)=>{
     isFormValid=formControlsCopi[name].valid  && isFormValid
     }) это мы перенесли, чисто для удобства в formFramework.js*/
     this.setState({formControls:formControlsCopi,isFormValid:disabledHandler(formControlsCopi)})
     
  }
 
  selectChangeHandler = event =>{
    this.setState({rightAnswerId:+event.target.value})
  }

  render(){
  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        <form onSubmit={this.onSubmitHandler}>
          {Object.keys(this.state.formControls).map((controlName,index)=>{
            const control= this.state.formControls[controlName]
            return(
              <Auxiliary  key={control+index}>
                  <Input 
                     value={control.value}
                     label={control.label}
                     errorMessage={control.errorMessage}
                     valid={control.valid}
                     touched={control.touched}
                     shouldValidate={!!control.validation}   //это значит будет true
                     onChange={(event)=>{this.onChangeHandler(event,controlName)}}
                  />
                  {index === 0 ? <hr/> : null}
              </Auxiliary>
            )
          })}
          
          <Select
          label = 'Выберите правильный ответ'
          value = {this.state.rightAnswerId}
          onChange={this.selectChangeHandler}
          option={[
            {text:1,value:1},
            {text:2,value:2},
            {text:3,value:3},
            {text:4,value:4}
          ]}
          />
          <Button 
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
              >
                Добавить вопрос
          </Button>
          <Button 
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
              >
              Создать тест  
          </Button>
        </form>
      </div>
    </div>
  )
 }
}
function mapStateToProps(state){
  return {
    quiz: state.create.quiz
      }
}
function mapDispatchToProps(dispatch){
  return{
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
      }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator)

