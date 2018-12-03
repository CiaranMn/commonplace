import React from 'react'
import {connect} from 'react-redux'
import {BottomTabBar} from 'react-navigation'

const TabBar = (props) => {

  const {primaryColor, secondaryColor} = props.theme

  return <BottomTabBar {...props}
      activeTintColor={secondaryColor}
      activeBackgroundColor={primaryColor}
      inactiveTintColor={primaryColor}
      inactiveBackgroundColor={secondaryColor}
      style={{backgroundColor: secondaryColor}}
  />
}

mapStateToProps = ({ theme }) => ({ theme })

export default connect(mapStateToProps)(TabBar)

