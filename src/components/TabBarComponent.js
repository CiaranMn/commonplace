import React from 'react'
import {connect} from 'react-redux'
import {BottomTabBar} from 'react-navigation'

const TabBarComponent = (props) => {

  const {primaryColor, secondaryColor} = props.theme

  return <BottomTabBar {...props}
      activeTintColor={secondaryColor}
      activeBackgroundColor={primaryColor}
      inactiveTintColor={primaryColor}
      inactiveBackgroundColor={secondaryColor}
  />
}

mapStateToProps = ({ theme }) => ({ theme })

export default connect(mapStateToProps)(TabBarComponent)

