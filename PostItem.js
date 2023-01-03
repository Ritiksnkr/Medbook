import {View,Text,Image} from 'react-native';
export default PostItem=(props)=>{
return(
  <View style={{borderWidth:2,marginTop:2}}>
    <Text style={{fontSize:20,color:'blue'}}>
      {props.use}
    </Text>
    <Text style={{fontSize:15}}>
    {props.post}
    </Text>
    <Image source={require("./logo.png")}>
        </Image>
  </View>

)
}