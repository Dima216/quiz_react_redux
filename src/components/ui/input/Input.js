import React from 'react';
import classes from './Input.module.scss';


const Input = props => {
    //console.log(props)
    function isInvalid({valid,touched, shouldValidate}){
       // console.log(!valid , shouldValidate,  touched)
        return !valid && shouldValidate && touched

    }
    const inputType=props.type||'text'
    const cls=[classes.Input]
    if(isInvalid(props)){
        cls.push(classes.invalid)
    }
    const htmlFor=`${inputType}-${Math.random()}`
    
    return(
    <div className={cls.join(' ')}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <input
          type={inputType}
          id={htmlFor}
          value={props.value}
          onChange={props.onChange}
        />
        {
            isInvalid(props)
            ?<span>{props.errorMessage || 'Введите верное значение'}</span>
            :null
        }
        
        
    </div>
)}
export default Input;