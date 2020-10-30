import React, { Fragment } from 'react';
import classes from './Drawer.module.scss';
import Blackdrop from '../../ui/blackdrop/Blackdrop';
import {NavLink} from 'react-router-dom';



class Drawer extends React.Component {

     clikLink=()=>{
      this.props.rollUp()
     }
     renderLinks(links){
        return  links.map((link,index)=>{
            return(
                <li key={index}>
                  <NavLink
                  to={link.to}
                  exact={link.exact}
                  activeClassName={classes.active}
                  onClick={this.clikLink}
                  >
                    {link.label}
                  </NavLink>
                </li>
                )
               })
            } 
  render(){
    const cls=[classes.Drawer]
      if(!this.props.isOpen){
          cls.push(classes.close)
      }

     const links=[
       {to:'/',label:'Список',exact:true}
     ]  

    if(this.props.isAuthenticated){
          links.push(
          {to:'/quiz-creator',label:'Создать тест',exact:false},
          {to:'/logout',label:'Выйти',exact:false}
       )
    }else{
      links.push(
          {to:'/auth',label:'Авторизация',exact:false}
      )

    }

 
  return (
      <Fragment>
         <nav className={cls.join(' ')}>
             <ul>
                 {this.renderLinks(links)}
              </ul>
         </nav>
        { this.props.isOpen? <Blackdrop rollUp={this.props.rollUp}/>:null}
    
      </Fragment>
   
  )
 }
}
export default Drawer;
