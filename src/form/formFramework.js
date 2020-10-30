export function createControl(config,validation) {
    return{
        ...config,
        validation,
        valid:!validation,
        touched:false,
        value:''
    }
    
}
export function validateControl(value,validation = null){
    if(!validation){
      return true
    }
    let isValid=true
    if(validation.required){
      isValid=value.trim()!==''&& isValid
    }
    return isValid
  }
  export function disabledHandler(formControlsCopi){
    let isFormValid = true
    Object.keys(formControlsCopi).forEach((name)=>{
      isFormValid=formControlsCopi[name].valid  && isFormValid
      })
      return isFormValid
  }