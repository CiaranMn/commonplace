import logo from '../../assets/commonplace-logo-white.png'

export default LogoTitle = ({title}) => 

    <View>
      <Image
        source={logo}
        style={{ width: 30, height: 30 }}
      />
     <Text style={{fontSize: 21}}>
      {title}
      </Text>
    </View>