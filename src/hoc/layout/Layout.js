import React from 'react'
import classes from './Layout.module.scss'
import MenuToggle from '../../components/navigation/menuToggle/MenuToggle'
import Drawer from '../../components/navigation/drawer/Drawer'
import {connect} from 'react-redux'

class Layout extends React.Component {
  state={
    isOpen:false
  }
  onToggle=()=>{
    this.setState({isOpen:!this.state.isOpen})
  }
  rollUp=()=>{
    this.setState({
      isOpen:false
    })
  }
   
  render(){
  
  return (
    <div className={classes.Layout}>
      <Drawer
      isOpen={this.state.isOpen}
      rollUp={this.rollUp}
      isAuthenticated = {this.props.isAuthenticated}
      />
      <MenuToggle
      onToggle={this.onToggle}
      isOpen={this.state.isOpen}
      />
      <main>
          {this.props.children}
      </main>
    </div>
  )
 }
}

function mapStateToProps(state){
    return {
        isAuthenticated: !! state.auth.token
        
    }
}

export default connect(mapStateToProps)(Layout)

