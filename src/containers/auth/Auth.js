import React from 'react'
import classes from './Auth.module.scss'
import Button from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/action/ActionAuth'

class Auth extends React.Component {
    state={
        isFormValid:false,// это для кнопок,чтобы их блокировать,когда вводится неверный пароль или email
        formControls:{
            email:{
                value:'',
                type:'email',
                label:'Email',
                errorMessage:'Введите корректный email',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    email:true
                }

            },
            password:{
                value:'',
                type:'password',
                label:'Пароль',
                errorMessage:'Введите корректный пароль',
                valid:false,
                touched:false,
                validation:{
                    required:true,
                    minLength:6
                    
                }
            }
        }    
    }
    loginHandler =  () => {
        this.props.auth(
          this.state.formControls.email.value,
          this.state.formControls.password.value,
          true)
        }
    registerHandler =  () => {
        this.props.auth(
         this.state.formControls.email.value,
         this.state.formControls.password.value,
         false)
    }
    submitHandler=(event)=>{
        event.preventDefault()
    }
    validateControl(value,validation){
        if(!validation){
            return true
        }
        let isValid = true
        if(validation.required){
            isValid = value.trim() !=='' && isValid

        }
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid=value.length >= validation.minLength && isValid

        }
       return isValid
    }
    onChangeHandler=(event,controlName)=>{
        const formControlsCopi={...this.state.formControls}
        const control={...formControlsCopi[controlName]}
        control.value=event.target.value
        control.touched= true
        control.valid= this.validateControl(control.value,control.validation)
        formControlsCopi[controlName]=control
        let isFormValid=true
        Object.keys(formControlsCopi).forEach(name=>{
            isFormValid=formControlsCopi[name].valid && isFormValid
           
        })

        this.setState({formControls:formControlsCopi,isFormValid:isFormValid})

    }
    controlValid(){
        return Object.keys(this.state.formControls).map((controlName,index)=>{
            const control= this.state.formControls[controlName]
            return(
                <Input
                key={control+index}
                value={control.value}
                type={control.type}
                label={control.label}
                errorMessage={control.errorMessage}
                valid={control.valid}
                touched={control.touched}
                shouldValidate={!!control.validation} 
                onChange={(event)=>{this.onChangeHandler(event,controlName
                )}}
                />
            )
        })
    }
  render(){
  return (
    <div className={classes.Auth}>
       <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
             {this.controlValid()}
              <Button 
              type='success'
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
              >
                  Войти
              </Button>
              <Button 
              type='primary'
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
              >
                  Зарегистрироваться
              </Button>
          </form>
       </div>
    </div>
  )
 }
}

function mapDispatchToProps(dispatch){
    return{
      auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}
export default connect(null,mapDispatchToProps)(Auth)
